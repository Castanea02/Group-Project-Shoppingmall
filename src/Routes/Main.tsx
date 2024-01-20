import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Box, Grid, GridItem } from "@chakra-ui/react";

const backAdd = process.env.REACT_APP_NODE_ADDRESS;

const Banner = styled.div`
  height: 600px;
  font-size: 36px;
  background-color: tomato;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px 0px gray;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ProductCard = styled(motion.div)`
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  cursor: pointer;
`;

const AddCart = styled(motion.button)`
  width: 100px;
  background-color: #0071e3;
  color: white;
  border-radius: 30px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  cursor: pointer;
  overflow: hidden;
`;

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  button {
    width: 100px;
    background-color: #0071e3;
    color: white;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 16px;
  }
`;

const CartList = styled.div<{ cart?: string }>`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 30%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
`;

//Interfaces
interface IProduct {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
}

interface AddCart {
  text: string;
}

function Main() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const history = useHistory();
  const bigProductMatch = useRouteMatch<{ productId: string }>(
    "/product/:productId"
  );

  //Cart 추가 함수
  const addCart = (data: any) => {
    setCart((prev) => [...prev, data]);
    console.log(cart);
  };

  //클릭 이벤트 함수
  const onClick = () => {
    //Node 서버로 Post 요청
    fetch(`${backAdd}/productList`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onProductClicked = (productId: string) => {
    history.push(`/product/${productId}`);
  };

  const onOverlayClicked = () => {
    history.push("/");
  };

  //Fake Product Object
  const fakeproducts: IProduct[] = [
    {
      id: 1,
      title: "너굴맨",
      price: "9,900",
      imageUrl:
        "https://i.namu.wiki/i/8ltrXoF-jxGycmwp2tTjaBGD-G07HYnOAhaVLlFZLdtpm-dxm8DpOqkHme04EUvPQ4l58TQ2csy1ceCdBcZHhptH0roBq78G2k2GI3HCCxMjCl7PLoCVAGZbSfyetHFegZkP7ObW4E1I1B9EwamtLg.webp",
    },
    {
      id: 2,
      title: "람쥐썬더",
      price: "19,900",
      imageUrl:
        "https://i.namu.wiki/i/xH5mH5zoISf_HYoLS6XN0nk7HxchX6yJPBd0tHW_2Ml1MNU-phaOi6d3VC4GacWBd5EITAtsw9zIPIymTPM9pCk3Dnji8pTCy8ud5VkzZTP-Y7ea8iJeNVERjqugfC66-lHrCd-7GhmDlHP1h1X0ZA.webp",
    },
    {
      id: 3,
      title: "Chipi Chipi Chapa Chapa",
      price: "29,900",
      imageUrl:
        "https://media1.tenor.com/m/Jc9jT66AJRwAAAAd/chipi-chipi-chapa-chapa.gif",
    },
    {
      id: 4,
      title: "원빈",
      price: "39,900",
      imageUrl:
        "https://mblogthumb-phinf.pstatic.net/20110908_43/oiktoail_1315461319710Wj8g8_JPEG/fg.JPG?type=w420",
    },
    {
      id: 5,
      title: "Polite Cat",
      price: "49,900",
      imageUrl:
        "https://uploads.dailydot.com/2018/10/olli-the-polite-cat.jpg?q=65&auto=format&w=2270&ar=2:1&fit=crop",
    },
    {
      id: 6,
      title: "Dancing Toothless",
      price: "49,900",
      imageUrl:
        "https://media.tenor.com/2l4-h42qnmcAAAAi/toothless-dancing-toothless.gif",
    },
    {
      id: 8,
      title: "Happy Cat",
      price: "49,900",
      imageUrl: "https://media1.tenor.com/m/_hUq1BSUsiMAAAAC/cat-cute.gif",
    },
    {
      id: 9,
      title: "Dancing Dog",
      price: "49,900",
      imageUrl: "https://media.tenor.com/dqH6ZBgOvMUAAAAi/dog-dance.gif",
    },
    // Add more products as needed
  ];

  return (
    <>
      <Container>
        <Banner>배너이올시다 Slider 애니메이션 넣기</Banner>
        <ProductSection>
          <AnimatePresence>
            {/**메인 제품 칸*/}
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {fakeproducts.map((product) => (
                <GridItem>
                  <ProductCard
                    layoutId={product.id + ""}
                    key={product.id}
                    onClick={() => onProductClicked(product.id + "")}>
                    <Product productInfo={product} />
                    <AddCart
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addCart(product)}>
                      Add Cart
                    </AddCart>
                  </ProductCard>
                </GridItem>
              ))}
            </Grid>
          </AnimatePresence>
        </ProductSection>

        <CartWrapper>
          <button onClick={onClick}>API 전송 테스트</button>
          {cart.map((product) => (
            <CartList key={product.id}>
              {product.title} / {product.price}
            </CartList>
          ))}
        </CartWrapper>

        {bigProductMatch ? (
          <>
            <Overlay onClick={onOverlayClicked} animate={{ opacity: 1 }} />
            <AnimatePresence>
              <motion.div
                layoutId={bigProductMatch.params.productId + ""}
                style={{
                  position: "fixed",
                  width: "500px",
                  height: "500px",
                  backgroundColor: "tomato",
                  top: 300,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}>
                <Box p="4" bg="green.400">
                  1234
                </Box>
              </motion.div>
            </AnimatePresence>
          </>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

export default Main;
