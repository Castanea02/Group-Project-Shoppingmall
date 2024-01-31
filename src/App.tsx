// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Helmet } from "react-helmet";
import Products from "./Routes/Products";
import WayToCome from "./Routes/WayToCome";
import HairStyles from "./Routes/HairStyles";
import Main from "./Routes/Main";
import Join from "./Routes/Join";
import Login from "./Routes/Login";
import AuthEditCheck from "./Routes/EditCheck";
import AuthEdit from "./Routes/Edit";
import NavigationBar from "./components/NavigationBar";
import SessionChecker from "./components/SessionChecker";
import { isUserAtom } from "./atoms";

// App Component
const App = () => {
  const loggedIn = useRecoilValue(isUserAtom);

  return (
    <>
      {loggedIn ? <SessionChecker /> : null}
      <BrowserRouter>
        <NavigationBar loggedIn={loggedIn} />
        <Switch>
          <Route path={["/products", "/product/:productId"]}>
            <Products loggedIn={loggedIn} />
          </Route>
          <Route path="/waytocome">
            <WayToCome />
          </Route>
          <Route path="/styles">
            <HairStyles />
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/editCheck">
            <AuthEditCheck />
          </Route>
          <Route path="/edit">
            <AuthEdit />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
