import express from "express";

const app = express();

const PORT = 4000;

const handleListening = () => console.log("Server Listening on port 4000 🔥");

app.get("/", (req, res) => {
  res.send("Hello NodeJS Express!");
});

app.listen(PORT, handleListening);
