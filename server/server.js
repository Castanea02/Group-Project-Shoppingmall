import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import "./db";
import apiRouter from "./routers/apiRouter";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // 클라이언트 도메인
  credentials: true, // 쿠키 허용
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      maxAge: 5000, // 세션 쿠키의 만료 시간 (밀리초 기준, 여기서는 1시간)
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
});

/**요청 URL이 "/api/~~~~~~"일때 */
app.use("/api", apiRouter);

export default app;
