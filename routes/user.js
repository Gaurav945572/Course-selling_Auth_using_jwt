const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../config")
const {Admin,Course,User} = require("../db")
const mongoose = require("mongoose");


// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username, 
        password
    })
    res.json({
        message: "User created successfully"
    })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    //first check the user exist or not
    let existingUser = await User.find({username,password});
    if(existingUser){
        const token = jwt.sign({username},jwtPassword);
        res.json({
            "token":token,
        })
    }
    else{
        res.status(404).json({
            "message":"wrong email and password",
        })
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    let courses= await Course.find({})
    res.json({courses:courses})
    
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    let username = req.username //passed ny userMiddleware
    await User.updateOne({
        username:username
    },{
        "$push":{
            purchasedCourses:(courseId)}
    })
    //console.log(username);
    res.json({
        "message":"course purchased successfully",
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    let username = req.username ;//from usermiddlware
    const user = await User.findOne({username:username});
    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses,
        }
    });
    res.json({
        course:courses
        })
});

module.exports = router