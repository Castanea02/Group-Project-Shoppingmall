/**API 테스트*/
export const postProductList = (req, res) => {
  //데이터 받는 곳
  // req
  const sendObj = req.body;
  console.log(sendObj);

  // res
  res.send(sendObj);
};

/** 회원가입 폼 데이터*/
export const postJoin = (req, res) => {
  //데이터 받는 곳
  // req
  const sendObj = req.body;
  console.log(sendObj);

  // res
  res.send(sendObj);
};

/** 로그인 폼 데이터*/
export const postLogin = (req, res) => {
  //데이터 받는 곳
  // req
  const sendObj = req.body;
  console.log(sendObj);

  // res
  res.send(sendObj);
};
