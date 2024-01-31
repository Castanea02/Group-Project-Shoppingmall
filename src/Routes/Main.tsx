import styled from "styled-components";
import ImageSlider from "../components/BannerSlider";

/**전체 구역 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

/**배너 컴포넌트 */
const Banner = styled.div`
  height: 720px;
  width: 100vw;
  font-size: 36px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

/**메인 첫 화면 */
function Main() {
  return (
    <>
      <Container>
        <Banner>
          <ImageSlider />
        </Banner>
      </Container>
    </>
  );
}

export default Main;
