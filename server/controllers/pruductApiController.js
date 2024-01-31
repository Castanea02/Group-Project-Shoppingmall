/**Product 전송 API 테스트*/
export const postProductList = (req, res) => {
  console.log("✅ Product Data API");
  //데이터 받는 곳
  // req
  const sendObj = req.body;

  // res
  return res.send({ response: "응답 성공", sendObj });
};

/**더미 데이터 GET API */
export const fakeProduct = (req, res) => {
  //Fake Product Object

  const fakeProducts = [
    {
      id: 1,
      title: "오렌지 주스",
      price: "9,900",
      imageUrl:
        "https://velog.velcdn.com/images/okko8522/post/e61317bc-9f7b-4aaf-a781-fcdf07a60bb1/image.jpeg",
      description: "예나 선정이 딸이에요",
    },
    {
      id: 2,
      title: "Infinite Dragon",
      price: "39,900",
      imageUrl:
        "https://media1.tenor.com/m/LMM5T3PPodsAAAAC/ultra-drugon-dance-normalclassic.gif",
      description: "Infinite Dragon",
    },
    {
      id: 3,
      title: "Chipi Chipi Chapa Chapa",
      price: "29,900",
      imageUrl:
        "https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif",
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
      imageUrl:
        "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
      description: "고양이",
    },
    {
      id: 6,
      title: "Dancing Toothless",
      price: "49,900",
      imageUrl:
        "https://media.tenor.com/2l4-h42qnmcAAAAi/toothless-dancing-toothless.gif",
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
