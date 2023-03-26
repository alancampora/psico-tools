import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
  } catch (e) {
    console.log(e);
  }
};

export default connectMongo;
