import { Container, Center, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

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

function Login() {
<<<<<<< HEAD
  return <div>54321</div>;
=======
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
        <br />
        <Label>Password</Label>
        <Input
          {...register("pw")}
          type="password"
          placeholder="Password"
          name="pw"
        />
        <Button type="submit" mt={2} colorScheme="purple">
          Submit
        </Button>
      </form>
      <a href="/">뒤로</a>
    </Container>
  );
>>>>>>> 9a4e5f43965c2c91a08c9f817ce810f30ded5894
}

export default Login;
