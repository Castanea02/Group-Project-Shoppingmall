import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categories = mongoose.model("categories", CategorySchema);

export default Categories;
