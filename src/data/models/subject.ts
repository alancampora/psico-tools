import mongoose from "mongoose";

mongoose.Schema.Types.ObjectId.get((v) => v?.toString());

const subjectSchema = new mongoose.Schema({
  name: String,
  code: String, 
  department: String
});

export default mongoose?.models?.Subject ||
  mongoose.model("Subject", subjectSchema);
