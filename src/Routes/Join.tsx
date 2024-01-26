import { styled } from "styled-components";
import { Button, Center, Container, Input } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";

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

interface IJoinForm {
  name: string;
  id: string;
  pw: string;
  confPw: string;
  email: string;
}

function Join() {
  const history = useHistory();
  const [idCheck, setIdCheck] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>();

  const onSubmit: SubmitHandler<IJoinForm> = (data) => {
    setIdCheck(false);
    fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/join`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === 201) {
          history.push("/login");
        }
        if (data.response === "중복") {
          setIdCheck(true);
        }
      });
    // if (data.pw != data.confPw) {
    //   console.log("⚠️ 비밀번호가 일치하지 않습니다.");
    // } else {

    // }
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
        <Label>name</Label>
        <Input {...register("name", { required: true })} placeholder="name" />
        {errors.name && <ErrorLabel>이름을 입력해주세요</ErrorLabel>}
        <Label>ID</Label>
        <Input {...register("id", { required: true })} placeholder="id" />
        {errors.id && <ErrorLabel>아이디를 입력해주세요</ErrorLabel>}
        {idCheck ? <ErrorLabel>중복된 계정입니다.</ErrorLabel> : ""}
        <Button mt={2}>중복 확인</Button>
        <br />

        <Label>Password</Label>
        <Input
          {...register("pw", { required: true })}
          type="password"
          placeholder="Password"
        />
        {errors.pw && <ErrorLabel>비밀번호를 입력해주세요</ErrorLabel>}
        <Label>Confirm Password</Label>
        <Input
          {...register("confPw", { required: true })}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.pw && <ErrorLabel>확인 비밀번호를 입력해주세요</ErrorLabel>}
        <Label>Email</Label>
        <Input {...register("email", { required: true })} placeholder="Email" />
        {errors.email && <ErrorLabel>이메일을 입력해주세요</ErrorLabel>}
        <Button type="submit" mt={2} colorScheme="purple">
          Submit
        </Button>
      </form>
      <a href="/">뒤로</a>
    </Container>
  );
}

export default Join;
