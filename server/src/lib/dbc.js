import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const conne = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to mongo db : ${conne.connection.host}`);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};
