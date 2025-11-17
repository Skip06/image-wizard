const mongoose = require("mongoose");
const imageSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    url: String ,     //S3 link or local path
    metadata: Object  //size, format, etc
});

module.exports = mongoose.model("Image", imageSchema);