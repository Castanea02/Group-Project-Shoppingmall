import { Container, Center, Input, Button, useToast } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useEditMutation } from "../api";
import { isUserAtom } from "../atoms";
import { useEditCheckMutation } from "../api";
import { ErrorLabel, Label, Title } from "../components/FormLabel";
import NotFound from "../components/NotFound";
import Auth from "../components/Auth";

interface IEditForm {
  pw: string;
  confPw: string;
  email: string;
}
/**개인정보 수정  */
function Edit(props: any) {
  const isLogin = useSetRecoilState(isUserAtom);
  const mutation = useMutation(useEditMutation);
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditForm>();

  const logout = () => {
    fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/logout`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        isLogin(false);
      });
  };

  const onSubmit: SubmitHandler<IEditForm> = async (formData: any) => {
    try {
      if (!(formData.pw || formData.confPw || formData.email)) {
        toast({
          position: "top",
          title: "실패",
          description: "수정할 정보를 입력하세요",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
        return;
        //비번이 들어왔지만 비번이 일치하지 않을 경우
      } else if (
        (formData.pw || formData.confPw) &&
        formData.pw != formData.confPw
      ) {
        toast({
          position: "top",
          title: "실패",
          description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
        return;
      }
      // useMutation 훅을 호출하여 로그인 비동기 작업 실행
      const data = await mutation.mutateAsync(formData);
      console.log(data);
      if (data.success) {
        isLogin(true);
        toast({
          position: "top",
          title: `성공`,
          description: `정보가 수정되었습니다 로그아웃 되었습니다 다시 로그인 해주시길 바랍니다.`,
          status: "success",
          duration: 3000,
          isClosable: false,
        });
        logout();
        history.push("/");
      } else {
        toast({
          position: "top",
          title: "실패",
          description: "변경하실 정보가 이전 정보와 같습니다.",
          status: "error",
          duration: 3000,
          isClosable: false,
        });
      }
    } catch (error) {
      console.error("정보 변경 실패:", error);
    }
  };
  return (
    <Container
      border="1px"
      borderColor="black.200"
      borderRadius="5"
      mt={40}
      padding={10}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <Title>개인정보수정</Title>
        </Center>
        <Label>Password</Label>
        <Input {...register("pw")} type="password" placeholder="Password" />
        <Label>Confirm Password</Label>
        <Input
          {...register("confPw")}
          type="password"
          placeholder="Confirm Password"
        />
        <Label>Email</Label>
        <Input {...register("email")} placeholder="Email" />
        <Button type="submit" mt={2} colorScheme="purple">
          Submit
        </Button>
      </form>
      <a href="/">뒤로</a>
    </Container>
  );
}

export default Edit;
