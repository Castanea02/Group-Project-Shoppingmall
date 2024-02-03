import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

/**
 * DB 스키마 모두 구현 [✅]
 * 회원 개인정보 수정 만들기 [✅]
 * 네이버 맵 API [✅]
 * FakeProduct를 DB로 대체하기 []
 * 회원 마이페이지 그림 그리기 []
 * 회원 개인정보 수정 주소 폼 만들기 []
 * 마이페이지 -> 주문 상태, 배송조회 []
 * 장바구니 화면 그리기 []
 * 최근 본 상품 []
 * 결제 화면 그리기 []
 * 제품 클릭시 보이는 제품 상세 화면 그리기 []
 * 결제 구현 []
 *  - 결제시 주문정보 업데이트
 * 카카오 OAuth 구현 []
 * 네이버 OAuth 구현 []
 */

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ReactQueryDevtools initialIsOpen={true} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
