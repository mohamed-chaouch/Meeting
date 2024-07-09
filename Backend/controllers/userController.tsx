const User : object = require("../models/User");

exports.createUser = async (req : any, res: any) => {
    try {
        const data = req.body;

        const usr = new User(data);
        if(!usr.username){
            return res.status(400).json({ message: "Username is required" });
        }

        if(!usr.email){
            return res.status(400).json({ message: "Email is required" });
        }

        if(!usr.password){
            return res.status(400).json({ message: "Password is required" });
        }

        if(!usr.imageUrl){
            return res.status(400).json({ message: "Image is required" });
        }

        const user = await usr.save();

        if(!user){
            return res.status(400).json({ message: "User not created" });
        }
        
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}