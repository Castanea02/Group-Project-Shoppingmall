import {
  Container,
  Center,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  Heading,
  Text,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useEditCheckMutation } from "../api";
import { isUserAtom } from "../atoms";
import Auth from "../components/Auth";
import NotFound from "../components/NotFound";

interface IEditCheckForm {
  pw: string;
}
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
  } = useForm<IEditCheckForm>();

  const onSubmit: SubmitHandler<IEditCheckForm> = async (formData: any) => {
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
          description:
            "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
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
        <Container
          border="1px"
          borderColor="gray.600"
          borderRadius="5"
          mt={40}
          padding={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Center mb="4">
              <Heading size="md">개인정보 수정</Heading>
            </Center>

            <FormControl mb="4">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("pw", { required: "비밀번호를 입력해주세요" })}
                type="password"
                placeholder="Password"
              />
              {errors.pw && <Text color="red">비밀번호를 입력해주세요</Text>}
            </FormControl>

            <Button type="submit" mt={2} colorScheme="purple" width="full">
              pw확인
            </Button>
          </form>
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
}
const AuthEditCheck = Auth(EditCheck);
export default AuthEditCheck;
