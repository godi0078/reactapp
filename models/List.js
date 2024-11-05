import mongoose from "mongoose";

const ListSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    acronym: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("List", ListSchema);
