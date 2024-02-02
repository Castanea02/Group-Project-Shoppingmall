import {
  Button,
  ButtonGroup,
  Input,
  Text,
  Flex,
  Box,
  Heading,
  Spacer,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "./Header";
import { isUserAtom } from "../atoms";

const Section = styled.div`
  color: black;
  background-color: whitesmoke;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 99;
`;

/**네비게이션 컴포넌트 */
const NavigationBar = (props: any) => {
  const isLogin = useSetRecoilState(isUserAtom);
  const location = useLocation();
  const toast = useToast();
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
  /**네비게이션 바 인디케이터 고정용 location.pathname 정규표현식으로 URL가져와서 고정하기 */
  function getIndexFromPathname(pathname: string) {
    const pattern = /^(\/|\/styles|\/products|\/waytocome|\/product\/\d+)$/;
    if (pattern.test(pathname)) {
      if (pathname === "/") {
        return 0; // 홈 페이지
      } else if (pathname === "/styles") {
        return 1; // 스타일 페이지
      } else if (pathname === "/products" || pathname.startsWith("/product/")) {
        return 2; // 제품 페이지
      } else if (pathname === "/waytocome") {
        return 3; // 오시는 길 페이지
      } else {
        return 0; // 기본값은 홈 페이지
      }
    }
  }

  return (
    <>
      <Section>
        <Flex justify="center" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="xl" fontFamily="Edwardian Script ITC, sans-serif">
              Art'O
            </Heading>
          </Box>
          <Tabs
            position="relative"
            variant="unstyled"
            index={getIndexFromPathname(location.pathname)}>
            <TabList>
              <Link to="/">
                <Tab fontSize={14} fontFamily="Arial, sans-serif">
                  Home
                </Tab>
              </Link>
              <Link to="/styles">
                <Tab fontSize={14} fontFamily="Arial, sans-serif">
                  Styles
                </Tab>
              </Link>
              <Link to="/products">
                <Tab fontSize={14} fontFamily="Arial, sans-serif">
                  Products
                </Tab>
              </Link>
              <Link to="/waytocome">
                <Tab fontSize={14} fontFamily="Arial, sans-serif">
                  Way To Come
                </Tab>
              </Link>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
          </Tabs>
          <Spacer boxSize={500} />
          {/* <SearchIcon boxSize={6} />
          <Input placeholder="Search?" htmlSize={20} width="auto"></Input> */}
          <ButtonGroup gap="2">
            {props.loggedIn ? (
              <Link to="/">
                <Button onClick={logout} colorScheme="purple">
                  로그아웃
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button fontSize={14} fontFamily="Arial, sans-serif">
                    Login
                  </Button>
                </Link>
                {/* <Link to="/join">
                  <Button colorScheme="purple">회원가입</Button>
                </Link> */}
                <Link to="/Join">
                  <Button
                    colorScheme="purple"
                    fontSize={14}
                    fontFamily="Arial, sans-serif">
                    Join
                  </Button>
                </Link>
              </>
            )}
          </ButtonGroup>
        </Flex>
      </Section>
      <Header />
    </>
  );
};

export default NavigationBar;
