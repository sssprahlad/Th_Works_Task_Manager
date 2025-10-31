const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/database");


router.post("/register", async(req,res) => {
    const {username,password, email} = req.body;
    console.log(req.body);

    if(!username || !password || !email){
        return res.status(400).json({message:"All Fields are Required"})
    }

    const query = "SELECT * FROM users WHERE email = ?";

    db.get(query, [email], async(err, existingUser) => {
        if(err) return res.status(500).json({message:"Faild to check existing user"});

        if(existingUser) return res.status(400).json({message:"User already exists"});

        try{
            const hashedPassword = await bcrypt.hash(password, 10);
            db.run("INSERT INTO users (username, password, email) VALUES(?, ?, ?)",
                [username,hashedPassword,email],
                function(err){
                    if (err) {
                        console.error(err);
                        return res.status(500).json({message:"Failed to register user"});
                    }
                    res.status(200).json({message:"Register Successful"});
                }

            )
        }catch(error){
            console.error("error :", error);
            res.status(500).json({message:"Failed to register user"});
        }
    })



})


router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    console.log(req.body);

    if(!email || !password){
        return res.status(400).json({message:"All fields are required"});  
    }

    try{
        const checkUser = "SELECT * FROM users WHERE email = ?";
        db.get(checkUser,[email], async(err, existingUser) => {
            if(err){
                console.error(err);
                return res.status(500).json({message:"Database Error"});
            }
            if(!existingUser){
                return res.status(401).json({message:"Invalid email or password"});
            }

            const validPassword = await bcrypt.compare(password,existingUser.password);

            if(!validPassword){
                return res.status(401).json({message:"Invalid email.or password"});
            }

            const token = jwt.sign({id:existingUser.id}, process.env.JWT_SECRET,{expiresIn:"1h"});

            res.json({token,message:"Login Successful", status:200});

        })

    }catch(err){
        console.error(err);
        res.status(500).json({message:"Faild to login user", status:500});
    }



})

module.exports = router;