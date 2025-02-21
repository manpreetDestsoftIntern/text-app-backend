import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // const token = req.cookies.jwt;
        const authHeader = req.headers['authorization'];
        // Check if header is present and starts with 'Bearer'
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]; // Extract the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({message: "Unauthorized - Invalid token"});
        }
        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(404).json({message: "user not found"});
        }
        req.user = user;
        next();
        } 
        else {
          res.status(401).send({ error: 'Authorization header missing or malformed' });
        }
    } catch (error) {
        console.log("error in protect Route middleware: ",  error.message);
        return res.status(500).json({message: "Internal Server Error"});
    }
}
