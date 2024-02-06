import {
  Container,
  Center,
  Input,
  Text,
  Button,
  useToast,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
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
import { watch } from "fs";

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
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="5"
      mt={40}
      padding={10}>
      {props.loggedIn ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Center mb={4}>
              <Heading size="lg">개인정보수정</Heading>
            </Center>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("pw", { required: "비밀번호를 입력해주세요" })}
                type="password"
                placeholder="Password"
              />
              <FormErrorMessage>{errors.pw?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                {...register("confPw")}
                type="password"
                placeholder="Confirm Password"
              />
              <FormErrorMessage>{errors.confPw?.message}</FormErrorMessage>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", { required: "이메일을 입력해주세요" })}
                placeholder="Email"
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" mt={4} colorScheme="purple" width="full">
              Submit
            </Button>
          </form>
        </>
      ) : (
        <Box textAlign="center" py={10}>
          <Text>정보를 찾을 수 없습니다.</Text>
        </Box>
      )}
    </Container>
  );
}

export default Edit;
