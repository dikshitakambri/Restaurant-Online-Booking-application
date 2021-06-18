const User = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

function Users (req, res, next) {
    res.send('Users');
}

async function Signup (req, res, next) {

    const { password, confirm_password : confirmPassword , email , name} = req.body;
    console.log(req.body);

    if(password !== confirmPassword){
        console.log("Password should match");
    }

    if(!name || !email){
        console.log("Name and email compulsory");
    }

    const user = await User.findOne({email : email});

    if(user) {
        console.log("User already exist");
    } else {
        const newUser = new User({
            name,
            email, 
            password
        });

        bcrypt.hash(newUser.password, 10, (err , hash) => {
            newUser.password = hash;
            newUser.save((err) => {
                if(err){
                    console.log(err);
                }else {
                    console.log("successfully registered now you can login");
                    res.redirect("/");
                }
            })
        });
    }


    // try {
    //     if(!user) {
    //         const createUser = await User.create({
    //             name,
    //             email, 
    //             password
    //         });

    //         if(createUser){
    //             console.log("Successfully registered User");
    //             res.redirect("/");
    //         }

    //         console.log("something went wrong");
    //     }
    //     else {
    //         console.log("User already exist");
    //     }
        
    // } catch (error) {
    //     console.log(err);
    // }
}

async function Login (req, res) {
    const {password, email} = req.body;

    try {
        const user = await User.findOne({email : email});

        if (user || user.password !== password){
            console.log("Invalis email or passowrd")
        }

        const payloadForjwt = {
            id : user.id,
            name : user.name,
            email : user.email
        }

        const JWT_SECRET = "secret";

        const jsonData = {
            token : jwt.sign(payloadForjwt, JWT_SECRET, {expiresIn : '2 days'}),
            message : "Signed in successfully",
            success : true
        }

        console.log(jsonData);
        res.redirect("/");

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    Users,
    Signup,
    Login
}