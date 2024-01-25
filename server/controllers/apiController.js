import Customers from "../models/Customers";
import bcrypt from "bcrypt";

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
    /** id가 존재하는지 확인 */
    const idCheck = await Customers.findOne({ userid: data.id });
    if (idCheck) {
      res.status(400).send({ response: "⚠️ 중복된 계정 입니다.", idCheck });
    } else {
      /** 존재하지 않으면 DB에 저장 */
      await Customers.create({
        username: data.name,
        email: data.email,
        userid: data.id,
        userpwd: data.pw,
      });
      res.status(201).send({ response: 201, data });
    }
  } catch (error) {
    res.send(error);
  }
};

/** 로그인 폼 데이터*/
export const postLogin = async (req, res) => {
  console.log("✅ Login API");
  //데이터 받는 곳
  // req
  const data = req.body;
  try {
    /** 아이디가 존재하는지 확인 */
    const idCheck = await Customers.findOne({ userid: data.id });
    if (!idCheck) {
      res.status(400).send({ response: "⚠️ ID가 존재하지 않습니다.", idCheck });
    } else {
      /** 비번이 맞는지 확인 */
      const ok = await bcrypt.compare(data.pw, idCheck.userpwd);
      if (ok) {
        res.status(201).send({ response: 201, data });
      } else {
        res.status(400).send({ response: "⚠️ pw가 틀립니다.", idCheck });
      }
    }
  } catch (error) {
    res.send(error);
  }
};
