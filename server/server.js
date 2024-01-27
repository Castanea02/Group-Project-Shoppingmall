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
      maxAge: 60 * 60 * 1000, // 세션 쿠키의 만료 시간 (밀리초 기준, 여기서는 1시간)
      httpOnly: true,
    },
  })
);

// app.use((req, res, next) => {
//   req.sessionStore.all((error, sessions) => {
//     console.log(sessions);
//     next();
//   });
// });

// 모든 세션 삭제 라우트
app.get("/logoutAllSessions", (req, res) => {
  // 세션 저장소에서 모든 세션 삭제
  req.sessionStore.clear((error) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    return res.status(200).send("All sessions have been logged out");
  });
});

/**요청 URL이 "/api/~~~~~~"일때 */
app.use("/api", apiRouter);

export default app;
