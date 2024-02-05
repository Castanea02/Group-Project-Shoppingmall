import express from "express";
import {
  postProductList,
  fakeProduct,
} from "../controllers/pruductApiController";
import {
  postLogin,
  postJoin,
  postEditCheck,
  postEdit,
  logout,
  checkSession,
} from "../controllers/userApiController";
const apiRouter = express.Router();

/**productList Post 요청*/
apiRouter.post("/productList", postProductList);
apiRouter.post("/join", postJoin);
apiRouter.post("/login", postLogin);
apiRouter.post("/logout", logout);
apiRouter.post("/editcheck", postEditCheck);
apiRouter.post("/edit", postEdit);
apiRouter.get("/fakeProducts", fakeProduct);
apiRouter.get("/check-session", checkSession);

export default apiRouter;
