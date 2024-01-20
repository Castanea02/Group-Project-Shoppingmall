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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Section = styled.div`
  color: whitesmoke;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  box-shadow: 0px 2px gray;
`;

const NavigationBar = () => {
  return (
    <>
      <Section>
        <Flex justify="center" alignItems="center" gap="2">
          <Box p="2">
            <Heading size="md">Art'O</Heading>
          </Box>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/styles">스타일</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">제품</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="/waytocome">오시는 길</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Spacer boxSize={50} />
          <SearchIcon boxSize={6} />
          <Input placeholder="Search?" htmlSize={20} width="auto"></Input>
          <ButtonGroup gap="2">
            <Link to="/join">
              <Button colorScheme="teal">회원가입</Button>
            </Link>

            <Link to="/login">
              <Button colorScheme="teal">로그인</Button>
            </Link>
          </ButtonGroup>
        </Flex>
      </Section>
    </>
  );
};

export default NavigationBar;
