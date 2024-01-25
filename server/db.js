import mongoose from "mongoose";

<<<<<<< HEAD
mongoose.connect("mongodb://172.30.1.71:27017/shoppingmall");

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB ✅");
=======
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
>>>>>>> 9a4e5f43965c2c91a08c9f817ce810f30ded5894
const handleError = () => console.log("DB Error", error);

db.on("Error", handleError);
db.once("open", handleOpen);
