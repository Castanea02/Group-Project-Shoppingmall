import mongoose from "mongoose";

const totalOrderSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  rdate: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
    maxlength: 6,
  },
  addr: {
    type: String,
    require: true,
  },
  addrDetail: {
    type: String,
    require: true,
  },
  tel: {
    type: String,
  },
});

const TotalOrders = mongoose.model("totalOrders", totalOrderSchema);

export default TotalOrders;
