const express = require("express");
const router = express.Router();
const {uploadImage, transformImage} = require("../controllers/images");
const auth = require("../middlewares/auth");

// uploadImage is an array: [upload.single("image"), async handler]
// We need to pass auth first, then spread the uploadImage array
router.post("/", [auth, ...uploadImage]);
router.post("/:id/transform", auth, transformImage);

module.exports = router;
