import mongoose from "mongoose";

const detailOrderSchema = new mongoose.Schema({
  cnt: {
    type: Number,
    required: true,
    default: 1,
  },
});

const DetailOrders = mongoose.model("detailOrders", detailOrderSchema);

export default DetailOrders;
