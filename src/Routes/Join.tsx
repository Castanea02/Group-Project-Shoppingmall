import { Button, Center, Container, Input, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { ErrorLabel, Label, Title } from "../components/FormLabel";
import { useJoinMutation } from "../api";

interface IJoinForm {
  name: string;
  id: string;
  pw: string;
  confPw: string;
  email: string;
}
/**회원가입  */
function Join() {
  const [duplicateId, setDuplicateId] = useState(false);
  const mutation = useMutation(useJoinMutation);
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoinForm>();

  const onSubmit: SubmitHandler<IJoinForm> = async (formData) => {
    try {
      // useMutation 훅을 호출하여 회원가입 비동기 작업 실행
      const data = await mutation.mutateAsync(formData);
      if (data.success) {
        toast({
          position: "top",
          title: `회원가입 성공`,
          description: ``,
          status: "success",
          duration: 3000,
          isClosable: false,
        });
        history.push("/");
      } else {
        setDuplicateId(true);
        toast({
          position: "top",
          title: "회원가입 실패",
          description: "입력하신 내용을 다시 확인해주세요.",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      }
    } catch (error) {
      console.error("로그인 실패:", error);
    }
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
        {duplicateId ? <ErrorLabel>중복된 계정입니다.</ErrorLabel> : ""}
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
