import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = 4000;

const handleListening = () => console.log("Server Listening on port 4000 🔥");

app.use(express.json());
app.use(cors());

app.post("/text", (req, res) => {
  //데이터 받는 곳
  // req
  const reqText = req.body.inText;
  console.log(reqText);

  // res
  const sendText = {
    text: "전송 성공!!!",
    text2: reqText,
  };

  res.send(sendText);
});

app.listen(PORT, handleListening);
