const express = require("express");
const router = express.Router();
const {uploadImage, transformImage} = require("../controllers/images");
const auth = require("../middlewares/auth");

router.post("/", auth, uploadImage);
routers.post("/:id/transform", auth, transformImage);
module.exports = router;
