import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";  

export const signup =async (req,res) => {
    const {email,fullName,password} = req.body;
    try{
        if (!email || !fullName || !password){
            return res.status(400).json({message: "Please fill in all fields"});
        }
        if (password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters long"});
        }
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePicture: newUser.profilePicture,

            });
        }
        else{
            res.status(400).json({message: "User could not be created"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}

export const login = async (req,res) => {
    const {email,password} = req.body;
    if (!email || !password){
        return res.status(400).json({message: "Please fill in all fields"});
    }
    try{
        const user = await User.findOne({
            email
        });
        if (!user){
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        generateToken(user._id,res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}

export const logout =async (req,res) => {
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"});
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}

export const updateProfile = async (req,res) => {
    try{
        const { profilePicture } = req.body;
        const userId = req.user._id;
        if (!profilePicture){
            return res.status(400).json({message: "Please select a profile picture"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePicture);
        const updatedUser = await User.findByIdAndUpdate(userId,{ profilePicture: uploadResponse.secure_url },{new: true});
        res.status(200).json(updatedUser);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}

export const checkAuth = async (req,res) => {
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error: error.message,
            message: "Internal Server Error"
        });
    }
}