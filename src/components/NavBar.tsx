import React from "react";
import {
  Flex,
  Box,
  Button,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Container,
  useToast,
  ButtonGroup,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { isUserAtom } from "../atoms";

const Section = styled.div`
  position: fixed;
`;

const NavBar = () => {
  const isLogin = useSetRecoilState(isUserAtom);
  const isUser = useRecoilValue(isUserAtom);
  const toast = useToast();
  const linkColor = useColorModeValue("gray.600", "white");
  const buttonBackground = useColorModeValue("purple.500", "purple.200");
  const logout = () => {
    fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/logout`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        isLogin(false);
        toast({
          position: "top",
          title: "로그아웃 성공",
          description: "Expired Session",
          status: "success",
          duration: 5000,
          isClosable: false,
        });
      });
  };
  return (
    <>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        bg={useColorModeValue("white", "gray.800")}
        color={linkColor}
        pos="sticky"
        top="0"
        zIndex="10"
        boxShadow="sm"
        height="64px">
        <Container
          maxW="container.xl"
          display="flex"
          justifyContent="space-between"
          alignItems="center">
          <Box flexShrink={0}>
            <ChakraLink as={Link} to="/" _hover={{ textDecoration: "none" }}>
              {/* Here you would typically use an image. For placeholder: */}
              <Button bg="transparent" _hover={{ bg: "transparent" }}>
                <Heading
                  fontSize={32}
                  fontFamily="Edwardian Script ITC, sans-serif">
                  Art'O
                </Heading>
              </Button>
            </ChakraLink>
          </Box>

          <HStack spacing={8} justify="center" flex={1}>
            <Tabs position="relative" variant="unstyled">
              <TabList>
                <Link to="/">
                  <Tab>Home</Tab>
                </Link>
                <Link to="/styles">
                  <Tab>Styles</Tab>
                </Link>
                <Link to="/products">
                  <Tab>products</Tab>
                </Link>
                <Link to="/waytocome">
                  <Tab>waytocome</Tab>
                </Link>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
            </Tabs>
          </HStack>
          <ButtonGroup gap="2">
            {isUser ? (
              <Link to="/">
                <Button
                  as={Link}
                  to="/logout"
                  bg={buttonBackground}
                  color="white"
                  size="sm"
                  mr={4}
                  onClick={logout}>
                  Logout
                </Button>
                <Button
                  as={Link}
                  to="/editCheck"
                  bg={buttonBackground}
                  color="white"
                  size="sm"
                  mr={4}>
                  Edit Profile
                </Button>
              </Link>
            ) : (
              <Box flexShrink={0}>
                <Button
                  as={Link}
                  to="/login"
                  bg={buttonBackground}
                  color="white"
                  size="sm"
                  mr={4}>
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/join"
                  bg={buttonBackground}
                  color="white"
                  size="sm">
                  Sign Up
                </Button>
              </Box>
            )}
          </ButtonGroup>
        </Container>
      </Flex>
    </>
  );
};

export default NavBar;
