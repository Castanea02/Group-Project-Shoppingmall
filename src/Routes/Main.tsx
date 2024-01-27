import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import ImageSlider from "../components/BannerSlider";
import { useQuery } from "react-query";
import { fetchProduct, fetchSendAddcart } from "../api";

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
/**메인 첫 화면 */
function Main() {
  const [cart, setCart] = useState<IProduct[]>([]);
  const history = useHistory();

  const bigProductMatch = useRouteMatch<{ productId: string }>(
    "/product/:productId"
  );

  const { isLoading: productLoading, data: product } = useQuery(
    ["product"],
    fetchProduct
  );

  const {
    isLoading: sendCartLoading,
    data: sendCart,
    refetch,
  } = useQuery(
    ["sendCart"],
    () => {
      fetchSendAddcart(cart);
    },
    {
      enabled: false,
    }
  );

  //Cart 추가 함수
  const addCart = (data: IProduct, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setCart((prev) => [...prev, data]);
  };

  /**API 전송 테스트 cart내용 모두를 body에 담아서 node로 전송 */
  const onClick = () => {
    refetch();
  };

  //**제품 클릭시 /product/${productId}로 URL 변경 */
  const onProductClicked = (productId: string) => {
    history.push(`/product/${productId}`);
  };

  //**오버레이 클릭시 Home으로 URL 변경 */
  const onOverlayClicked = () => {
    history.push("/");
  };

  return (
    <>
      <Container>
        <Banner>
          <ImageSlider />
        </Banner>
        {productLoading ? null : (
          <ProductSection>
            <AnimatePresence>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {product?.map((product: any) => (
                  <GridItem key={product.id}>
                    <ProductCard
                      layoutId={product.id + ""}
                      onClick={() => onProductClicked(product.id + "")}>
                      <Product productInfo={product} />
                      <Button
                        mt={5}
                        colorScheme="purple"
                        onClick={(e) => addCart(product, e)}>
                        Add Cart
                      </Button>
                    </ProductCard>
                  </GridItem>
                ))}
              </Grid>
            </AnimatePresence>
          </ProductSection>
        )}

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
                <h1>
                  {
                    product[Number(bigProductMatch.params.productId) - 1]
                      .description
                  }
                </h1>
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
