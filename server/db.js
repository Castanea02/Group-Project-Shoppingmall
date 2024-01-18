import mongoose from "mongoose";

mongoose.connect("mongodb://172.30.1.71:27017/shoppingmall");

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB ✅");
const handleError = () => console.log("DB Error", error);

db.on("Error", handleError);
db.once("open", handleOpen);
