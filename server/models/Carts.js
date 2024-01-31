import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  cnt: {
    type: Number,
    default: 1,
  },
  rdate: {
    type: Date,
    default: Date.now,
  },
});

const Carts = mongoose.model("carts", cartSchema);

export default Carts;
