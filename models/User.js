const mogoose = require("mongoose");

const userSchema = new Schema({
    username : {type: String, require: true, unique: true},
    password : {type: String, require: true} //will hash it baadme...
});

module.exports = mongoose.model("User", userSchema);  //model represents the table in mongoDB database .
                         //( modelname , Schema )       //  model is a constructor compiled from Schema
// i gave it User but mogoose will convert it to plural and lowercase and make the table