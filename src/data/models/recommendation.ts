import mongoose from "mongoose";

mongoose.Schema.Types.ObjectId.get((v) => v?.toString());

const recommendationSchema = new mongoose.Schema({
  subjecId: String,
  userId: String,
  subjectName: String,
  points: String,
  text: String,
  year: String,
  period: String,
  teacher: String,
  state: String,
});

export default mongoose?.models?.Recommendation ||
  mongoose.model("Recommendation", recommendationSchema);
