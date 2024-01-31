import { Container, Center, Input, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useEditCheckMutation } from "../api";
import { ErrorLabel, Label, Title } from "../components/FormLabel";

/**개인정보 수정  */
function Edit(props: any) {
  const isLogin = useSetRecoilState(isUserAtom);
  const mutation = useMutation(useEditCheckMutation);
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
          title: `성공`,
          description: `수정할 정보를 입력하세요`,
          status: "success",
          duration: 3000,
          isClosable: false,
        });
        history.push("/edit");
      } else {
        toast({
          position: "top",
          title: "실패",
          description: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
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
    <Container border="1px" borderColor="black.200" borderRadius="5" mt={40} padding={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>개인정보수정</Title>
        </Center>
        <Label>Password</Label>
        <Input {...register("pw", { required: true })} type="password" placeholder="Password" />
        {errors.pw && <ErrorLabel>비밀번호를 입력해주세요</ErrorLabel>}
        <Label>Confirm Password</Label>
        <Input {...register("confPw", { required: true })} type="password" placeholder="Confirm Password" />
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

export default Edit;
