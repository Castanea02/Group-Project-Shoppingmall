import express from "express";
import { postLogin, postJoin, postProductList, postEditCheck, logout, fakeProduct, checkSession } from "../controllers/apiController";

const apiRouter = express.Router();

/**productList Post 요청*/
apiRouter.post("/productList", postProductList);
apiRouter.post("/join", postJoin);
apiRouter.post("/login", postLogin);
apiRouter.post("/logout", logout);
apiRouter.post("/editcheck", postEditCheck);
apiRouter.get("/fakeProducts", fakeProduct);
apiRouter.get("/check-session", checkSession);

export default apiRouter;
