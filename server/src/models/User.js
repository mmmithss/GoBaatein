import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: ""
  },
  profilePic: {
    type: String,
    default: ""
  },
  nativeLanguage: {
    type: String,
    default: ""
  },
  learningLanguage: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  isOnboard: {
    type: Boolean,
    default: false
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, {timestamps: true});

//adding a pre hook
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) 
    return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePasswords = async function (enteredPassword) {
  const isCorrectPassword = await bcrypt.compare(enteredPassword, this.password);
  return isCorrectPassword;
};

const User = mongoose.model("User", userSchema);

export default User;