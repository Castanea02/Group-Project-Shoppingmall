// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Main from "./Routes/Main";
import Products from "./Routes/Products";
import WayToCome from "./Routes/WayToCome";
import HairStyles from "./Routes/HairStyles";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import SessionChecker from "./components/SessionChecker";
import { useRecoilValue } from "recoil";
import { isUserAtom } from "./atoms";

// App Component
const App = () => {
  const loggedIn = useRecoilValue(isUserAtom);

  return (
    <>
      {loggedIn ? <SessionChecker /> : null}
      <BrowserRouter>
        <Switch>
          <Route path={["/products", "/product/:productId"]}>
            <NavigationBar loggedIn={loggedIn} />
            <Products loggedIn={loggedIn} />
          </Route>
          <Route path="/waytocome">
            <NavigationBar loggedIn={loggedIn} />
            <WayToCome />
          </Route>
          <Route path="/styles">
            <NavigationBar loggedIn={loggedIn} />
            <HairStyles />
          </Route>
          <Route path="/join">
            <NavigationBar loggedIn={loggedIn} />
            <Join />
          </Route>
          <Route path="/login">
            <NavigationBar loggedIn={loggedIn} />
            <Login />
          </Route>
          <Route path="/">
            <NavigationBar loggedIn={loggedIn} />
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
