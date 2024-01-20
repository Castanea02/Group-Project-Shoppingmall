// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightTheme } from "./Theme";
import Main from "./Routes/Main";
import NavigationBar from "./components/NavigationBar";
import Products from "./Routes/Products";
import WayToCome from "./Routes/WayToCome";
import HairStyles from "./Routes/HairStyles";
import Join from "./Routes/Join";
import Login from "./Routes/Login";

// App Component
const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
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
          <Route path={["/", "/product/:productId"]}>
            <NavigationBar />
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
