import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../atoms";

function SessionChecker() {
  const isLogin = useSetRecoilState(isUserAtom);
  const toast = useToast();
  useEffect(() => {
    const checkSession = async () => {
      try {
        // 세션 확인을 위한 서버 요청을 보내고 세션 상태를 받아옴
        const response = await fetch(
          `${process.env.REACT_APP_NODE_ADDRESS}/api/check-session`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();

        // 세션이 만료되면 Recoil State를 갱신
        if (!data.success) {
          isLogin(false);
          console.log("세션이 만료 되었습니다.");
          toast({
            position: "top",
            title: "세션 만료",
            description: "세션이 만료 되었습니다. 다시 로그인 해주세요.",
            status: "info",
            duration: 3000,
            isClosable: false,
          });
        }
      } catch (error) {
        console.error("세션 확인 실패:", error);
      }
    };
    // 5분마다 세션 확인
    const intervalId = setInterval(checkSession, 5000);
    // 컴포넌트 언마운트 시에 인터벌 제거

    return () => clearInterval(intervalId);
  }, [isLogin]);

  return null; // null을 반환하여 렌더링 결과에 영향을 주지 않도록 함
}

export default SessionChecker;
