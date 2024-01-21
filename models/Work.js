import { Schema, model, models } from "mongoose";

const WorkSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  category: { type: String },
  title: { tyepe: String },
  description: { type: String },
  price: { type: Number },
  photos: [{ type: String }],
});

const Work = models.Work || model("Work", WorkSchema);

export default Work;
