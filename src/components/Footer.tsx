import { styled } from "styled-components";

const FooterComp = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 16px;
  text-align: center;
`;

function Footer() {
  return <FooterComp>ⓒ 2024 Shopping mall</FooterComp>;
}

export default Footer;
