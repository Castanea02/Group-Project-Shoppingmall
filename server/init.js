import "dotenv/config"; //dotenv 사용 - env 파일 Import
import "./db";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT}`);

app.listen(PORT, "0.0.0.0", handleListening);
