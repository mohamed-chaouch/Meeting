import User from '../models/User.js';
import { hashPassword } from '../utils/hashPassword.js';
export const createUser = async (req, res) => {
    try {
        const { username, email, password, imageUrl } = req.body;
        const newUser = new User({ username, email, password, imageUrl });
        console.log(req.body);
        if (!username) {
            res.status(400).json({ message: "Username is required" });
            return;
        }
        if (!email) {
            res.status(400).json({ message: "Email is required" });
            return;
        }
        // if (!password) {
        //     res.status(400).json({ message: "Password is required" });
        //     return;
        // }
        console.log(req.file, ": req.files");
        if (!req.file) {
            res.status(400).json({ message: "Image is required" });
            return;
        }
        else {
            newUser.imageUrl = req.file.filename;
        }
        ;
        newUser.password = await hashPassword(password);
        const user = await newUser.save();
        if (!user) {
            res.status(400).json({ message: "User not created" });
            return;
        }
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
};
