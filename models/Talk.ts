import { Schema, model, models } from "mongoose";

const talkSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    content: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Talk = models.Talk || model("Talk", talkSchema);

export default Talk;
