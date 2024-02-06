import {
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import { ErrorLabel } from "../components/FormLabel";
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
      borderColor={useColorModeValue("gray.200", "gray.600")}
      boxShadow="0 0 20px rgba(0, 0, 0, 0.2)"
      borderRadius="5"
      justifyContent="center"
      mt={39}
      padding={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Center mb={4}>
            <Heading
              fontSize="4xl"
              fontFamily="Edwardian Script ITC, sans-serif">
              Art'O
            </Heading>
          </Center>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            {...register("name", { required: "이름을 입력해주세요" })}
            placeholder="name"
          />
          {errors.name && (
            <FormErrorMessage>{errors.name.message}</FormErrorMessage>
          )}

          <FormLabel htmlFor="id">ID</FormLabel>
          <Input
            id="id"
            {...register("id", { required: "아이디를 입력해주세요" })}
            placeholder="id"
          />
          {errors.id && (
            <FormErrorMessage>{errors.id.message}</FormErrorMessage>
          )}
          {duplicateId && (
            <FormErrorMessage>중복된 계정입니다.</FormErrorMessage>
          )}
          <Button
            mt={2}
            mb={4}
            colorScheme="teal"
            size="sm"
            onClick={() => setDuplicateId(true)}>
            중복 확인
          </Button>

          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            {...register("pw", { required: "비밀번호를 입력해주세요" })}
            type="password"
            placeholder="Password"
          />
          {errors.pw && (
            <FormErrorMessage>{errors.pw.message}</FormErrorMessage>
          )}

          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            {...register("confPw")}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confPw && (
            <FormErrorMessage>{errors.confPw.message}</FormErrorMessage>
          )}

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            {...register("email", { required: "이메일을 입력해주세요" })}
            placeholder="Email"
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}

          <Button type="submit" mt={4} colorScheme="purple" width="full">
            Submit
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Join;
