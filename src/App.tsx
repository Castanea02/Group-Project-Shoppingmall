// App.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 16px;
  text-align: center;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductCard = styled(motion.div)`
  width: 300px;
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 16px;
  cursor: pointer;
  overflow: hidden;
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

const AddCart = styled.button`
  width: 100px;
  height: 30px;
  color: white;
  background-color: teal;
`;

const CartList = styled.div<{ cart?: string }>`
  color: tomato;
`;

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 16px;
  text-align: center;
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

// App Component
const App: React.FC = () => {
  const [state, setState] = useState<AddCart>({ text: "" });
  const [cart, setCart] = useState<Product[]>([]);

  const addCart = (data: any) => {
    setCart((prev) => [...prev, data]);
    console.log(data);
  };

  //InputChange 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ text: e.currentTarget.value });
  };

  //클릭 이벤트 함수
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(state);
    const textbox = {
      inText: state.text,
    };

    //Node 서버로 Post 요청
    fetch("http://localhost:4000/text", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(textbox),
    });
  };

  //Fake Product Object
  const products: Product[] = [
    {
      id: 1,
      title: "Product 1",
      price: "$19.99",
      imageUrl:
        "https://i.namu.wiki/i/H1lgTKVqq5C1zCT34aj5qszjqEiI2p69xhkbWOC5XkNkUKBoNhs3FmRpe3njQH9-54PaugtBXskbQS6kY3c7v1HOouNRvmKa9AgFjhWJUdl9zzNPg7zLNgP2fUCBxhpbsJwvZX0ArnyeEzKy2HsXmA.webp",
    },
    {
      id: 2,
      title: "Product 2",
      price: "$29.99",
      imageUrl:
        "https://i.namu.wiki/i/H1lgTKVqq5C1zCT34aj5qszjqEiI2p69xhkbWOC5XkNkUKBoNhs3FmRpe3njQH9-54PaugtBXskbQS6kY3c7v1HOouNRvmKa9AgFjhWJUdl9zzNPg7zLNgP2fUCBxhpbsJwvZX0ArnyeEzKy2HsXmA.webp",
    },
    // Add more products as needed
  ];

  return (
    <Container>
      <Header>Shopping Mall</Header>
      <Main>
        <div>
          <input name="text" onChange={handleChange}></input>
          <button onClick={onClick}>전송</button>
          <h3>{state.text}</h3>
        </div>

        {/**메인 제품 칸*/}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <ProductImage src={product.imageUrl} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>{product.price}</ProductPrice>
            <AddCart onClick={() => addCart(product)}>Add Cart</AddCart>
          </ProductCard>
        ))}
      </Main>
      <div>
        <br />
        <hr />
        {cart.map((product) => (
          <CartList>
            {product.title}/{product.price}
          </CartList>
        ))}
      </div>
      <Footer>© 2024 Shopping Mall</Footer>
    </Container>
  );
};

export default App;
