import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "이미지 준비중",
  },
  content: {
    type: String,
    default: "설명 없음",
  },
  price: {
    type: Number,
    required: true,
  },
  sale: {
    type: Number,
    required: true,
  },
  cnt: {
    type: Number,
    required: true,
    default: 1,
  },
  deleted: {
    type: Boolean,
    required: false,
  },
});

const Items = mongoose.model("items", itemSchema);

export default Items;
