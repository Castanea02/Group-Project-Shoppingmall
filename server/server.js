import express from "express";
import cors from "cors";
<<<<<<< HEAD
import "./db";
=======
import apiRouter from "./routers/apiRouter";
>>>>>>> 9a4e5f43965c2c91a08c9f817ce810f30ded5894

const app = express();
app.use(express.json());
app.use(cors());

/**요청 URL이 "/api/~~~~~~"일때 */
app.use("/api", apiRouter);

export default app;
