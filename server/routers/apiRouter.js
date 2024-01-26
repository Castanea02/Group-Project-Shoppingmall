import express from "express";
import {
  postLogin,
  postJoin,
  postProductList,
  logout,
} from "../controllers/apiController";

const apiRouter = express.Router();

/**productList Post 요청*/
apiRouter.post("/productList", postProductList);
apiRouter.post("/join", postJoin);
apiRouter.post("/login", postLogin);
apiRouter.post("/logout", logout);

export default apiRouter;
