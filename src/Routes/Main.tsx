import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const backAdd = process.env.REACT_APP_NODE_ADDRESS;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
  margin-top: 10px;
`;

const ProductCard = styled.div`
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductTitle = styled.h3`
  margin-top: 8px;
  font-size: 18px;
  color: #333;
`;

const ProductPrice = styled.p`
  margin-top: 8px;
  font-size: 16px;
  color: #555;
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

//Interfaces
interface Product {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
}

interface AddCart {
  text: string;
}

function Products() {
  const [sendText, setSendText] = useState<AddCart>({ text: "" });
  const [cart, setCart] = useState<Product[]>([]);

  //Cart 추가 함수
  const addCart = (data: any) => {
    setCart((prev) => [...prev, data]);
    console.log(cart);
  };

  //InputChange 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSendText({ text: e.currentTarget.value });
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

  //Fake Product Object
  const products: Product[] = [
    {
      id: 1,
      title: "너굴맨",
      price: "9,900",
      imageUrl:
        "https://i.namu.wiki/i/H1lgTKVqq5C1zCT34aj5qszjqEiI2p69xhkbWOC5XkNkUKBoNhs3FmRpe3njQH9-54PaugtBXskbQS6kY3c7v1HOouNRvmKa9AgFjhWJUdl9zzNPg7zLNgP2fUCBxhpbsJwvZX0ArnyeEzKy2HsXmA.webp",
    },
    {
      id: 2,
      title: "람쥐썬더",
      price: "19,900",
      imageUrl:
        "https://i.namu.wiki/i/dTDo-x4u_aOz43xSyPlsJcslnicsWEyomSGcb3QGJwG2jee6PpWvQV1F1GenhoUomBeNFZMe4CKtPUwlJY3eE5oGmGeyYGFmvewlCMNwjFi8f2jC7Rjn6rKoX-1mgLY7AQgHdJIkBuoAR1zfEX3rVg.webp",
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
    // Add more products as needed
  ];

  return (
    <Container>
      <Main>
        {/**메인 제품 칸*/}
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.imageUrl} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>
            <AddCart
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addCart(product)}>
              Add Cart
            </AddCart>
          </ProductCard>
        ))}
      </Main>
      <CartWrapper>
        <button onClick={onClick}>전송</button>
        {cart.map((product) => (
          <CartList>
            {product.title} / {product.price}
          </CartList>
        ))}
      </CartWrapper>
      <Footer />
    </Container>
  );
}

export default Products;
