import mongoose from "mongoose";

mongoose.Schema.Types.ObjectId.get((v) => v?.toString());

export const subjectSchema = new mongoose.Schema({
  name: String,
  code: String, 
  department: String,
  link: String,
});

export default mongoose?.models?.Subject ||
  mongoose.model("Subject", subjectSchema);
