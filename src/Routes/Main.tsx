import React from "react";
import {
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

const Main = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 64px)" // 네비게이션 바의 높이를 뺀 만큼의 높이
      px={4} // 좌우 패딩
    >
      <Stack
        spacing={6}
        justifyContent="center"
        alignItems="center"
        textAlign="center">
        <Heading
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          lineHeight="shorter"
          color={useColorModeValue("purple.600", "purple.300")}>
          Lorem Ipsum "Neque porro quisquam est qui dolorem ipsum quia dolor sit
          amet, consectetur, adipisci velit..."
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={useColorModeValue("gray.600", "gray.200")}>
          "There is no one who loves pain itself, who seeks after it and wants
          to have it, simply because it is pain..."
        </Text>
        <Stack direction="row" spacing={4} justify="center">
          <Button
            size="lg"
            colorScheme="purple"
            bg="purple.400"
            color="white"
            _hover={{
              bg: "purple.500",
            }}>
            Get started today
          </Button>
          <Button size="lg" variant="outline" colorScheme="purple">
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Main;
