import mongoose from "mongoose";

mongoose.Schema.Types.ObjectId.get((v) => v?.toString());

export const userSchema = new mongoose.Schema({
  email: String,
  email_verified: Boolean,
  family_name: String,
  given_name: String,
  locale: String,
  name: String,
  nickname: String,
  picture: String,
  sid: String,
  sub: String,
  updated_at: String,
});

export default mongoose?.models?.User || mongoose.model("User", userSchema);
