import User from "../models/User.js";
import jwt from "jsonwebtoken";
import {upsertStreamUser} from "../lib/stream.js";

export const signup = async (req, res) => {
  const {email, fullName, password} = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({message: "All the fields are required"});
    }
    if (password.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    //check is email is valid or not
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({message: "Email is not valid, Invalid Format"});
    }

    //checkif email already exist or not
    if (await User.findOne({email})) {
      return res.status(400).json({message: "Email already exist"});
    }
    const uriName = encodeURIComponent(fullName);
    const randomAvatar = `https://api.dicebear.com/9.x/adventurer/svg?seed=${uriName}&flip=true&backgroundType=gradientLinear,solid&featuresProbability=10&hairProbability=95`;

    //creating the user
    const newUser = await User.create({email, fullName, password, profilePic: randomAvatar});
    //the user is created

    //now to create user in stream
    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || ""
      });
      console.log("Successfully creatted user in Stream");
    } catch (error) {
      console.log("error in creating stream user", error);
    }

    // now to generate JWT
    const token = jwt.sign({
      userId: newUser._id
    }, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.status(201).json({success: true, user: newUser});
  } catch (error) {
    console.log("Error in signup Controller", error);
    res.status(500).json({success: false, message: "Internal Server Error"});
  }
};

export async function login(req, res) {
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({message: "All the firlds are required"});
    }
    const user = await User.findOne({email});
    if (!user) 
      return res.status(401).json({message: "Invalid email or password"});
    
    const isCorrectPassword = await user.comparePasswords(password);
    if (!isCorrectPassword) 
      return res.status(401).json({message: "Invalid email or password"});
    
    //successful login
    //generate token
    const token = jwt.sign({
      userId: user._id
    }, process.env.JWT_SECRET, {expiresIn: "7d"});
    //generate cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });

    return res.status(201).json({success: true, user: user});
  } catch (error) {
    console.log(error);
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

export function logout(req, res) {
  res.clearCookie("jwt");
  res.status(200).json({success: true, message: "Logged out successfully ", user: null});
}

export async function onboarding(req, res) {
  const userId = req.user._id;

  try {
    const {fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All the fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location"
        ].filter(Boolean)
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body,
      isOnboard: true
    }, {new: true});

    // stream update
    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || ""
      });
      console.log("Successfully updated user in Stream after onboarding");
    } catch (error) {
      console.error("Error in updating stream user", error);
    }

    return res.status(200).json({success: true, user: updatedUser});
  } catch (error) {
    console.error("Error in onboarding controller", error);
    return res.status(500).json({success: false, message: "Internal Server Error"});
  }
}
