import { styled } from "styled-components";
import { Button, Center, Container, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

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

function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/join`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
        <Input {...register("id")} placeholder="id" name="id" />
        <Button mt={2}>중복 확인</Button>
        <br />

        <Label>Password</Label>
        <Input
          {...register("pw")}
          type="password"
          placeholder="Password"
          name="pw"
        />
        <Label>Confirm Password</Label>
        <Input
          {...register("confPw")}
          type="password"
          placeholder="Password"
          name="confPw"></Input>

        <Label>Email</Label>
        <Input {...register("email")} placeholder="Email" name="email" />
        <Button type="submit" mt={2} colorScheme="purple">
          Submit
        </Button>
      </form>
      <a href="/">뒤로</a>
    </Container>
  );
}

export default Join;
