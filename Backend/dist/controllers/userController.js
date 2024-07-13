import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../utils/hashPassword.js';
import bcrypt from 'bcrypt';
export const createUser = async (req, res) => {
    try {
        const { username, email, password, imageUrl } = req.body;
        const newUser = new User({ username, email, password, imageUrl });
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        // if (!password) {
        //     res.status(400).json({ message: "Password is required" });
        //     return;
        // }
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        else {
            newUser.imageUrl = req.file.filename;
        }
        ;
        newUser.password = await hashPassword(password);
        const user = await newUser.save();
        if (!user) {
            return res.status(400).json({ message: "User not created" });
        }
        const token = jwt.sign({ _id: newUser._id, username: newUser.username, password: newUser.password, imageUrl: newUser.imageUrl }, "Mohamed@123");
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Email or Password' });
        }
        // Generate JWT token
        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email, imageUrl: user.imageUrl }, 'Mohamed@123'
        // { expiresIn: '1h' }
        );
        // Send token in response
        res.status(200).json({ token });
    }
    catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const udpateUser = async (req, res) => {
    try {
        let { username, email, password, imageUrl } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username is required" });
        }
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password) {
            res.status(400).json({ message: "Password is required" });
            return;
        }
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }
        else {
            imageUrl = req.file.filename;
        }
        ;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email, password, imageUrl }, { new: true });
        if (!updatedUser) {
            return res.status(400).json({ message: "User not updated" });
        }
        res.status(200).json({ message: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        res.status(200).json({ user: user });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
};
