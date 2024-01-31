import { useRef, useEffect } from "react";
declare global {
  interface Window {
    naver: any;
  }
}

function WayToCome() {
  const mapRef = useRef(null);

  useEffect(() => {
    // 네이버 지도 API 스크립트 추가
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_API_KEY}`;
    script.async = true;
    script.onload = () => {
      // 스크립트 로드 완료 후 지도 초기화
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5666102, 126.9783881),
        zoom: 13,
      };
      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      // 지도에 마커 추가
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.5666102, 126.9783881),
        map: map,
      });
    };

    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }}></div>;
}

export default WayToCome;
