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
        process.env.JWT_SECRET
    )
    //now token has id and iat object encrypted

    res.json({user, token});
});