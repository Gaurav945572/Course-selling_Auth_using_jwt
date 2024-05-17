const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin,Course} = require("../db")
const jwt = require("jsonwebtoken");
const {jwtPassword} = require("../config")

// Admin Routes
router.post('/signup',  async (req, res) => {
    // Implement admin signup logic
        let username = req.body.username;
        let password = req.body.password;
        await Admin.create({
            username,
            password
        });
        res.json({
            "message":"admin created successfully",
        })   
});

router.post('/signin',async(req, res) => {
    // Implement admin signup logic
    let username = req.body.username;
    let password = req.body.password;
    //first check the user exist or not
    let existingUser = await Admin.find({username,password});
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

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
        let title = req.body.title;
        let description = req.body.description;
        let imageLink = req.body.imageLink;
        let price = req.body.price;

        let newCourse = await Course.create({
            title,
            description,
            imageLink,
            price,
        })
        res.json({
            "message":"Course created successfully",
            "courseId":newCourse._id,
        })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    let response =await Course.find({});
    res.json({
        "response":response,
    })

});

module.exports = router;
