const multer = require("multer");
const sharp = require("sharp");  //photoshop of nodejs
const path = require("path");

//const upload = multer({dest: "uploads/"});  //a multer instance autosaves to uploads folder

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 *1024 * 1024},
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if(allowed.includes(file.mimetype)){
      cb(null, true);
    }else{
      cb(new Error("Only images allowed ."))
    }
  }

})






exports.uploadImage= [upload.single("image"), async(req, res) => {  // accept one file with field name image //express middleware array runs in order
    try{
          const image = new Image({                                       //1st it runs the Multer middleware and then the final route handler 
          userId: req.user.id, //from jwt middleware
          url:  req.file.path , //local path where file is saved
          metadata:{
            originalName: req.file.originalName,
            size: req.file.size,
            mimetype: req.file.mimetype
          }
      
        });                                   
      await image.save();   //store in DB but not the actual image
      res.status(201).json({
        message: "image uploaded",
        image: newImage
      })
    }
    catch(err){
      console.error("upload err", err);
      res.status(500).json({
        error: "Upload failed"
      })
    }
}];
/*
This is what req.file looks like if i upload a catmeme image

{
  fieldname: 'image',
  originalname: 'cat-meme.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '1731862784912',        // random name (no extension)
  path: 'uploads/1731862784912',    //this is what i save right now
  size: 156789
}*/

//DB operations are asynchronous i.e takes time to complete
//if code didn't wait prog would have moved to next line before knowing if it was saved
//It tells the JavaScript runtime to pause execution of the async function at this specific line until the image.save() operation resolves

exports.transformImage = async (req, res) => {  
  const {id} = req.params;  // image id from the url 
  const transformations = req.body;

  try {
    const Image = require("../models/Image");
    const original = await Image.findById(id); //goin to MongoDB and find the original pic

    if (!original || original.userId.toString() !== req.user.id) {
      return res.status(404).json({ error: "Image not found or not yours" });
    }

    let pipeline = sharp(original.url); //original.url is the path to the original image file which sharp now opens 

    if (transformations.resize) {
      pipeline = pipeline.resize(
        transformations.resize.width || null,
        transformations.resize.height || null
      );
    }
    if (transformations.rotate) pipeline = pipeline.rotate(transformations.rotate);
    if (transformations.grayscale) pipeline = pipeline.grayscale();
    if (transformations.flip) pipeline = pipeline.flip();
    if (transformations.flop) pipeline = pipeline.flop();

    const ext = transformations.format || "jpg";
    const outputPath = `uploads/transformed-${Date.now()}-${id}.${ext}`; // making a new file naem so i am not overwritting the file 

    await pipeline.toFile(outputPath); //saving the edited pic on upload folder

    const transformedImage = new Image({
      userId: req.user.id,
      url: outputPath,
      metadata: {
        ...original.metadata,
        transformed: true,
        applied: transformations,
      },
    });

    await transformedImage.save();  //saving the transformed image in MOngoDb

    res.json({
      message: "Transformation completed",
      original: original.url,
      transformed: transformedImage.url,
      image: transformedImage,
    });
  } catch (err) {
    console.error("Transform error:", err);
    res.status(500).json({ error: "Transformation failed" });
  }
}

