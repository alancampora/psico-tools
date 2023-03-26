import mongoose from "mongoose";
import { subjectSchema } from "./subject";
import { userSchema } from "./user";

mongoose.Schema.Types.ObjectId.get((v) => v?.toString());

const recommendationSchema = new mongoose.Schema({
  rating: String,
  text: String,
  year: String,
  period: String,
  state: String,
  subject: { type: subjectSchema },
  user: { type: userSchema },
});

export default mongoose?.models?.Recommendation ||
  mongoose.model("Recommendation", recommendationSchema);
