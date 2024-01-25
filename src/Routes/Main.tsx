import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import ImageSlider from "../components/BannerSlider";

const backAdd = process.env.REACT_APP_NODE_ADDRESS;

/**전체 구역 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

/**배너 컴포넌트 */
const Banner = styled(motion.div)`
  height: 720px;
  width: 100vw;
  font-size: 36px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

/**제품 모여있는 구역 지정 */
const ProductSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

/**제품 요소 */
const ProductCard = styled(motion.div)`
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  cursor: pointer;
`;

/**제품 클릭시 모달 */
const BigProductCard = styled(motion.div)`
  width: 700px;
  height: 700px;
  position: fixed;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 16px;
`;

/** 제품 클릭시 배경 오버레이*/
const Overlay = styled(motion.div)`
  position: absolute;
  padding-top: 40px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
`;

/** (임시) 카트 내용 구역*/
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

/** 담긴 카트 내용 리스트*/
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

//Interfaces
interface IProduct {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  description: string;
}

function Main() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const history = useHistory();

  const bigProductMatch = useRouteMatch<{ productId: string }>("/product/:productId");

  //Cart 추가 함수
  const addCart = (data: IProduct, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCart((prev) => [...prev, data]);
    console.log(cart);
  };

  /**API 전송 테스트 cart내용 모두를 body에 담아서 node로 전송 */
  const onClick = () => {
    //Node 서버로 Post 요청
    fetch(`${backAdd}/api/productList`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(cart),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  //**제품 클릭시 /product/${productId}로 URL 변경 */
  const onProductClicked = (productId: string) => {
    history.push(`/product/${productId}`);
  };

  //**오버레이 클릭시 Home으로 URL 변경 */
  const onOverlayClicked = () => {
    history.push("/");
  };

  //Fake Product Object

  const fakeproducts: IProduct[] = [
    {
      id: 1,
      title: "너굴맨",
      price: "9,900",
      imageUrl: "https://i.namu.wiki/i/8ltrXoF-jxGycmwp2tTjaBGD-G07HYnOAhaVLlFZLdtpm-dxm8DpOqkHme04EUvPQ4l58TQ2csy1ceCdBcZHhptH0roBq78G2k2GI3HCCxMjCl7PLoCVAGZbSfyetHFegZkP7ObW4E1I1B9EwamtLg.webp",
      description: "이 너굴맨은 행운을 가져다 줍니다.",
    },
    {
      id: 2,
      title: "람쥐썬더",
      price: "19,900",
      imageUrl: "https://i.namu.wiki/i/xH5mH5zoISf_HYoLS6XN0nk7HxchX6yJPBd0tHW_2Ml1MNU-phaOi6d3VC4GacWBd5EITAtsw9zIPIymTPM9pCk3Dnji8pTCy8ud5VkzZTP-Y7ea8iJeNVERjqugfC66-lHrCd-7GhmDlHP1h1X0ZA.webp",
      description: "이 람쥐썬더는 행운을 가져다 줍니다.",
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
      title: "원빈",
      price: "39,900",
      imageUrl: "https://mblogthumb-phinf.pstatic.net/20110908_43/oiktoail_1315461319710Wj8g8_JPEG/fg.JPG?type=w420",
      description: "원빈개",
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
    // Add more products as needed
  ];

  return (
    <>
      <Container>
        <Banner>
          <ImageSlider />
        </Banner>
        <ProductSection>
          <AnimatePresence>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {fakeproducts.map((product) => (
                <GridItem key={product.id}>
                  <ProductCard layoutId={product.id + ""} onClick={() => onProductClicked(product.id + "")}>
                    <Product productInfo={product} />
                    <Button mt={5} colorScheme="purple" onClick={(e) => addCart(product, e)}>
                      Add Cart
                    </Button>
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
              <BigProductCard layoutId={bigProductMatch.params.productId + ""}>
                <h1>{fakeproducts[Number(bigProductMatch.params.productId) - 1].description}</h1>
              </BigProductCard>
            </AnimatePresence>
          </>
        ) : null}
      </Container>
      <Footer />
    </>
  );
}

export default Main;
