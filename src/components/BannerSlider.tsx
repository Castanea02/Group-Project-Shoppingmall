import { motion } from "framer-motion";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 이미지 데이터
const images = [
  "./img/banner.jfif",
  "./img/banner2.jpg",
  "./img/banner3.jpg",
  // 추가 이미지 URL 추가
];

const SliderContent = styled(motion.div)`
  text-align: center;
  margin: 0;
  padding: 0;
`;

/**메인 페이지 슬라이더 컴포넌트 */
function ImageSlider() {
  // Slick 슬라이더 설정
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <SliderContent key={index}>
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "1280px",
              height: "720px",
            }}
            src={imageUrl}
            alt={`Slide ${index}`}
          />
        </SliderContent>
      ))}
    </Slider>
  );
}

export default ImageSlider;
