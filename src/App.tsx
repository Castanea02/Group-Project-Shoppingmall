// App.tsx
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { lightTheme } from "./Theme";
import Main from "./Routes/Main";
import NavBar from "./components/NavBar";
import Products from "./components/Products";
import Footer from "./components/Footer";

// Styled Components
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  a{
    text-decoration:none;
    color:white;
  }
`;

// App Component
const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
