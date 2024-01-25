import mongoose from "mongoose";
import bcrypt from "bcrypt";

const customerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  userpwd: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  signout: {
    type: Boolean,
    required: true,
    default: true,
  },
});

customerSchema.pre("save", async function () {
  if (this.isModified("userpwd")) {
    //비밀번호를 수정하는 경우에만 해싱
    this.userpwd = await bcrypt.hash(this.userpwd, 5); //Hashing
  }
});

const Customers = mongoose.model("customers", customerSchema);

export default Customers;
