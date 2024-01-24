import express from "express";
import cors from "cors";
import "./controllers/apiController";
import apiRouter from "./routers/apiRouter";

const app = express();
app.use(express.json());
app.use(cors());

/**요청 URL이 "/api/~~~~~~"일때 */
app.use("/api", apiRouter);

export default app;
