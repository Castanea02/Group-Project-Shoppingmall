import { Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "../atoms";

const Auth = (Component: any) => {
  const AuthenticatedComponent = (props: any) => {
    const isLoggedIn = useRecoilValue(isUserAtom); // Recoil 상태를 가져오기

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default Auth;
