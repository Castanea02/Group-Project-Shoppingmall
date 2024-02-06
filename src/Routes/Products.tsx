import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { fetchProduct, fetchSendAddcart } from "../api";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "../atoms";
import { useHistory } from "react-router-dom";

const MotionGridItem = motion(GridItem);

interface IProduct {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  description: string;
}

interface ProductModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{product.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={{ base: "column", md: "row" }}>
            <Image
              src={product.imageUrl}
              borderRadius="md"
              boxSize="300px"
              objectFit="cover"
              alt={product.title}
            />
            <VStack align="start" ml={{ md: 4 }} mt={{ base: 4, md: 0 }}>
              <Text fontWeight="bold" fontSize="2xl">
                {product.price}원
              </Text>
              <Text>{product.description}</Text>
            </VStack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="purple">Add to bag</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

function Products() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart, setCart] = useState<IProduct[]>([]);
  const history = useHistory();
  const isLoggedIn = useRecoilValue(isUserAtom);
  const toast = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: products, isLoading } = useQuery("products", fetchProduct);

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

  /**API 전송 테스트 cart내용 모두를 body에 담아서 node로 전송 */
  const sendProduct = () => {
    refetch();
  };

  //Cart 추가 함수
  const addCart = (data: IProduct, e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (isLoggedIn) {
      console.log(isLoggedIn);
      setCart((prev) => [...prev, data]);
    } else {
      toast({
        position: "top",
        title: "Info",
        description: "제품 구입은 로그인 먼저 해주세요",
        status: "info",
        duration: 3000,
        isClosable: false,
      });
      history.push("/login");
    }
  };

  const onProductClick = (product: any) => {
    setSelectedProduct(product);
    onOpen();
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6} p={5}>
        {products.map((product: any) => (
          <MotionGridItem key={product.id} layout whileHover={{ scale: 1.05 }}>
            <Box
              p={5}
              shadow="md"
              borderWidth="1px"
              rounded="md"
              bg="white"
              cursor="pointer"
              onClick={() => onProductClick(product)}>
              <VStack>
                <Image
                  src={product.imageUrl}
                  borderRadius="md"
                  boxSize="160px"
                  objectFit="cover"
                />
                <Text mt={2} noOfLines={2}>
                  {product.title}
                </Text>
                <Button
                  mt={5}
                  colorScheme="purple"
                  onClick={(e) => addCart(product, e)}>
                  Add Cart
                </Button>
              </VStack>
            </Box>
          </MotionGridItem>
        ))}
      </Grid>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <Container>
        <Button w={300} h={20} p={2} colorScheme="red" onClick={sendProduct}>
          제품 API 전송
        </Button>
        {cart.map((product) => (
          <Text>
            {product.title} / {product.price}
          </Text>
        ))}
      </Container>
    </>
  );
}

export default Products;
