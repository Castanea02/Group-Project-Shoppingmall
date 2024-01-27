import { styled } from "styled-components";

const FooterComp = styled.footer`
  background-color: #fff;
  color: #333;
  padding: 16px;
  text-align: center;
  box-shadow: 2px 2px 2px 2px gray;
`;
/**페이지 Footer */
function Footer() {
  return <FooterComp>ⓒ {new Date().getFullYear()} Shopping mall</FooterComp>;
}

export default Footer;
