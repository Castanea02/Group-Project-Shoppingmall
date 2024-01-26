import { Container, Center, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { response } from "express";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Title = styled.div`
  color: black;
  font-size: 64px;
  font-weight: bold;
`;

const Label = styled.div`
  color: black;
  font-size: 14px;
  font-weight: bold;
  padding-top: 5px;
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 14px;
  font-weight: bold;
  padding-top: 5px;
`;

function Login() {
  const setterFn = useSetRecoilState(isUserAtom);
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/login`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === 200) {
          setterFn(true);
          toast({
            position: "top",
            title: "로그인 성공",
            description: "We've created your account for you.",
            status: "success",
            duration: 5000,
            isClosable: false,
          });
          history.push("/");
        }
      });
  };

  return (
    <Container
      border="1px"
      borderColor="black.200"
      borderRadius="5"
      mt={40}
      padding={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>Art'O</Title>
        </Center>
        <Label>ID</Label>
        <Input {...register("id", { required: true })} placeholder="id" />
        {errors.id && <ErrorLabel>아이디를 입력해주세요</ErrorLabel>}

        <Label>Password</Label>
        <Input
          {...register("pw", { required: true })}
          type="password"
          placeholder="Password"
        />
        {errors.pw && <ErrorLabel>비밀번호를 입력해주세요</ErrorLabel>}
        <Button type="submit" mt={2} colorScheme="purple">
          Submit
        </Button>
      </form>
      <a href="/">뒤로</a>
    </Container>
  );
}

export default Login;
