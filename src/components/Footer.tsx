import { styled } from "styled-components";

const FooterComp = styled.footer`
  background-color: #fff;
  color: #333;
  padding: 16px;
  text-align: center;
  box-shadow: 2px 2px 2px 2px gray;
`;

function Footer() {
  return <FooterComp>ⓒ 2024 Shopping mall</FooterComp>;
}

export default Footer;
