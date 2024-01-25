import Customers from "../models/Customers";

/**API 테스트*/
export const postProductList = (req, res) => {
  console.log("✅ Product Data API");
  //데이터 받는 곳
  // req
  const sendObj = req.body;

  // res
  res.send({ response: "응답 성공", sendObj });
};

/** 회원가입 폼 데이터*/
export const postJoin = async (req, res) => {
  //데이터 받는 곳
  // req
  console.log("✅ Join API");
  const data = req.body;

  try {
    const idCheck = await Customers.findOne({ userid: data.id });
    if (idCheck) {
      res.status(400).send({ response: "⚠️ 중복된 계정 입니다.", idCheck });
    } else {
      await Customers.create({
        username: data.name,
        email: data.email,
        userid: data.id,
        userpwd: data.pw,
      });
      res.status(201).send({ response: "✅ 계정 생성 성공", data });
    }
  } catch (error) {
    res.send(error);
  }
};

/** 로그인 폼 데이터*/
export const postLogin = (req, res) => {
  console.log("✅ Login API");
  //데이터 받는 곳
  // req
  const sendObj = req.body;

  // res
  res.send({ response: "✅ 응답 성공" });
};
