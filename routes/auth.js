const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/register", async(req,res) =>{
    const {username, password} = req.body;
    const user = new User({username, password}); //create a new User document in memory
    
    await user.save();
    const token = jwt.sign(
        {id: user._id},       //MongoDB automatically gives every user a unique id 
        process.env.JWT_SECRET || "fallback-secret-swast-69"
    )
    //now token has id and iat object encrypted

    res.json({user, token});
});

module.exports = router;

//token for SwastKing1 is :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MWM4NTJkNzEzZjhhYTc3NjA1Zjg1OCIsImlhdCI6MTc2MzQ3Njc4MX0.sUZZ8DLmIJpPrW1pQ4vNVaak9TfzyFue09HEI3vDXb4