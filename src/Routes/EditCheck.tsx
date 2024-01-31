import { Container, Center, Input, Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useEditCheckMutation } from "../api";
import { ErrorLabel, Label, Title } from "../components/FormLabel";

/**개인정보 수정 하기 전 비밀번호 확인  */
function EditCheck(props: any) {
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
    <>
      {props.loggedIn ? (
        <Container border="1px" borderColor="black.200" borderRadius="5" mt={40} padding={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>{console.log(props)}</>
            <Center>
              <Title>개인정보 수정</Title>
            </Center>
            <Label>Password</Label>
            <Input {...register("pw")} type="password" placeholder="Password" />
            {errors.pw && <ErrorLabel>비밀번호를 입력해주세요</ErrorLabel>}
            <Button type="submit" mt={2} colorScheme="purple">
              pw확인
            </Button>
          </form>
          <a href="/">뒤로</a>
        </Container>
      ) : (
        history.goBack()
      )}
    </>
  );
}

export default EditCheck;
