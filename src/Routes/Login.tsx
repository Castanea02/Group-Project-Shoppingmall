import { Container, Center, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { useHistory } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useLoginMutation } from "../api";
import { ErrorLabel, Label, Title } from "../components/FormLabel";

/** 로그인 */
function Login() {
  const isLogin = useSetRecoilState(isUserAtom);
  const mutation = useMutation(useLoginMutation);
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      // useMutation 훅을 호출하여 로그인 비동기 작업 실행
      const data = await mutation.mutateAsync(formData);
      if (data.success) {
        isLogin(true);
        toast({
          position: "top",
          title: `로그인 성공`,
          description: `안녕하세요 ${data.user.name}님`,
          status: "success",
          duration: 3000,
          isClosable: false,
        });
        history.goBack();
      } else {
        toast({
          position: "top",
          title: "로그인 실패",
          description:
            "아이디또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
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
