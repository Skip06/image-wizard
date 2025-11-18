const multer = require("multer");
const upload = multer({dest: "uploads/"});  //a multer instance autosaves to uploads folder

exports.uploadImage= [upload.single("image"), async(req, res) => {  // accept one file with field name image //express middleware array runs in order
    const image = new Image({
        userId: req.user.id, //from jwt middleware
        url:  req.file.path  //local path where file is saved
    });
    await image.save();
    res.json(image);
}];
/*
This is what req.file looks like if i upload a catmeme image

{
  fieldname: 'image',
  originalname: 'cat-meme.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: 'uploads/',
  filename: '1731862784912',        // ← random name (no extension!)
  path: 'uploads/1731862784912',    // ← this is what we save right now
  size: 156789
}*/