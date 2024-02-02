import { motion } from "framer-motion";
import { styled } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "@chakra-ui/react";

// 이미지 데이터
const images = [
  "./img/banner.jfif",
  "./img/banner2.png",
  "./img/banner3.png",
  "./img/banner4.png",
  "./img/banner5.png",
  // 추가 이미지 URL 추가
];

const SliderContent = styled(motion.div)`
  text-align: center;
  margin: 0;
  margin-bottom: 1000px;
  padding: 0;
`;

/**메인 페이지 슬라이더 컴포넌트 */
function ImageSlider() {
  // Slick 슬라이더 설정
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1000,
    slidesToShow: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((imageUrl, index) => (
        <SliderContent key={index}>
          <Image
            fit="contain"
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
