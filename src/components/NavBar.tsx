import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  background-color: #333;
  color: #fff;
  padding: 16px;
  text-align: center;
  a {
    padding-right: 10px;
  }
`;

function NavBar() {
  return (
    <Header>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </Header>
  );
}
export default NavBar;
