// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Main from "./Routes/Main";
import Products from "./Routes/Products";
import WayToCome from "./Routes/WayToCome";
import HairStyles from "./Routes/HairStyles";
import Join from "./Routes/Join";
import Login from "./Routes/Login";

// App Component
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/products">
          <NavigationBar />
          <Products />
        </Route>
        <Route path="/waytocome">
          <NavigationBar />
          <WayToCome />
        </Route>
        <Route path="/styles">
          <NavigationBar />
          <HairStyles />
        </Route>
        <Route path="/products">
          <NavigationBar />
        </Route>
        <Route path="/join">
          <NavigationBar />
          <Join />
        </Route>
        <Route path="/login">
          <NavigationBar />
          <Login />
        </Route>
        <Route path={["/", "/product/:productId"]}>
          <NavigationBar />
          <Main />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
