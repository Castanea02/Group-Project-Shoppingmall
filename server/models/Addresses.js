import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
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

const Addresses = mongoose.model("addresses", AddressSchema);

export default Addresses;
