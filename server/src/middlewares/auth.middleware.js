import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({message: "Unverified - Token not found"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({message: "Unverified - User not found"});
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protected route middleware", error);
    return res.status(500).json({message: "Internal Server Error"});
  }
};
