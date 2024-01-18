import express from "express";
import cors from "cors";
import "./db";

const app = express();
const PORT = 4000;

const handleListening = () => console.log("Server Listening on port 4000 ✅");

app.use(express.json());
app.use(cors());

/**API 테스트*/
app.post("/productList", (req, res) => {
  //데이터 받는 곳
  // req
  const sendObj = req.body;
  console.log(sendObj);

  // res
  res.send(sendObj);
});

app.listen(PORT, handleListening);
