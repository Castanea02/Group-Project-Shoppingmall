import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  ButtonGroup,
  Input,
  Flex,
  Box,
  Heading,
  Spacer,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Header from "./Header";

const Section = styled.div`
  color: black;
  background-color: whitesmoke;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 99;
`;

const NavigationBar = () => {
  return (
    <>
      <Section>
        <Flex justify="center" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="md">Art'O</Heading>
          </Box>
          <Tabs position="relative" variant="unstyled">
            <TabList>
              <Link to="/">
                <Tab>홈</Tab>
              </Link>
              <Link to="/styles">
                <Tab>스타일</Tab>
              </Link>
              <Link to="/products">
                <Tab>제품</Tab>
              </Link>
              <Link to="/waytocome">
                <Tab>오시는 길</Tab>
              </Link>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="blue.500"
              borderRadius="1px"
            />
          </Tabs>
          <Spacer boxSize={50} />
          <SearchIcon boxSize={6} />
          <Input placeholder="Search?" htmlSize={20} width="auto"></Input>
          <ButtonGroup gap="2">
            <Link to="/join">
              <Button colorScheme="purple">회원가입</Button>
            </Link>
            <Link to="/login">
              <Button colorScheme="purple">로그인</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Section>
      <Header />
    </>
  );
};

export default NavigationBar;
