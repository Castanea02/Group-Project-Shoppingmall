import Customers from "../models/Customers";
import bcrypt from "bcrypt";

/**Product 전송 API 테스트*/
export const postProductList = (req, res) => {
  console.log("✅ Product Data API");
  //데이터 받는 곳
  // req
  const sendObj = req.body;

  // res
  return res.send({ response: "응답 성공", sendObj });
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
      return res.status(400).send({ success: false });
    } else {
      /** 존재하지 않으면 DB에 저장 */
      await Customers.create({
        username: data.name,
        email: data.email,
        userid: data.id,
        userpwd: data.pw,
      });
      return res.status(200).send({
        success: true,
        user: {
          id: data.id,
          name: data.name,
        },
      });
    }
  } catch (error) {
    return res.send(error);
  }
};

/** 로그인 폼 데이터*/
export const postLogin = async (req, res) => {
  console.log("✅ Login API");
  //데이터 받는 곳
  // req

  try {
    const data = req.body;
    const user = await Customers.findOne({ userid: data.id });
    /** 아이디가 존재하는지 확인 */
    if (!user) {
      return res.status(400).send({ success: false });
    }
    /** 비번이 맞는지 확인 */
    const ok = await bcrypt.compare(data.pw, user.userpwd);
    if (!ok) {
      return res.status(400).send({ success: false });
    }

    //로그인 성공
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(200).send({
      success: true,
      user: {
        id: data.id,
        name: user.username,
      },
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: "서버 오류" });
  }
};

/**로그아웃 */
export const logout = (req, res) => {
  console.log("✅ Logout API");
  req.session.destroy(); //서버 세션 삭제
  res.clearCookie("connect.sid"); // 클라이언트 세션 쿠키 삭제
  return res.send({ response: "200" });
};
/** 회원정보 수정전 비밀반호 확인*/
export const postEditCheck = async (req, res) => {
  console.log("✅ Edit API");
  //데이터 받는 곳
  // req

  try {
    const data = req.body;
    const user = req.session.user;
    const ok = await bcrypt.compare(data.pw, user.userpwd);
    /** 아이디가 존재하는지 확인 */
    if (ok) {
      console.log("비번이 맞습니다!");
      return res.status(200).send({
        success: true,
      });
    } else {
      console.log("비번이 틀립니다!");
      return res.status(400).send({
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: "서버 오류" });
  }
};
/**더미 데이터 GET API */
export const fakeProduct = (req, res) => {
  //Fake Product Object

  const fakeProducts = [
    {
      id: 1,
      title: "오렌지 주스",
      price: "9,900",
      imageUrl: "https://velog.velcdn.com/images/okko8522/post/e61317bc-9f7b-4aaf-a781-fcdf07a60bb1/image.jpeg",
      description: "예나 선정이 딸이에요",
    },
    {
      id: 2,
      title: "Infinite Dragon",
      price: "39,900",
      imageUrl: "https://media1.tenor.com/m/LMM5T3PPodsAAAAC/ultra-drugon-dance-normalclassic.gif",
      description: "Infinite Dragon",
    },
    {
      id: 3,
      title: "Chipi Chipi Chapa Chapa",
      price: "29,900",
      imageUrl: "https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif",
      description: "Chipi Chipi Chapa Chapa Des",
    },

    {
      id: 4,
      title: "페페",
      price: "19,900",
      imageUrl: "https://media.tenor.com/alc-7tEZNt4AAAAi/dancing-code.gif",
      description: "페페짤",
    },
    {
      id: 5,
      title: "Polite Cat",
      price: "49,900",
      imageUrl: "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
      description: "고양이",
    },
    {
      id: 6,
      title: "Dancing Toothless",
      price: "49,900",
      imageUrl: "https://media.tenor.com/2l4-h42qnmcAAAAi/toothless-dancing-toothless.gif",
      description: "댄싱 투슬리스",
    },
    {
      id: 7,
      title: "Happy Cat",
      price: "49,900",
      imageUrl: "https://media1.tenor.com/m/_hUq1BSUsiMAAAAC/cat-cute.gif",
      description: "햅삐햅삐햅삐",
    },
    {
      id: 8,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
      description: "Dancing Dog Desc",
    },
    {
      id: 9,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
      description: "Dancing Dog Desc",
    },
    {
      id: 10,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
      description: "Dancing Dog Desc",
    },
    {
      id: 11,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
      description: "Dancing Dog Desc",
    },
    {
      id: 12,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
      description: "Dancing Dog Desc",
    },
    // Add more products as needed
  ];

  return res.json(fakeProducts);
};

/**사용자 로그인 시 주기적 세션 체크 */
export const checkSession = (req, res) => {
  console.log("✅ Check Session API");
  console.log(req.session.user, "req!");
  try {
    // 세션 상태를 확인하고 클라이언트에게 응답
    if (req.session.user) {
      // 세션이 유효한 경우
      return res.json({ success: true });
    } else {
      // 세션이 만료된 경우
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("세션 확인 실패:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
