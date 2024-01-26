/**API fetch들을 정의 */

/** 로그인 폼 정보 서버로 post로 전송*/
export async function useLoginMutation(loginFormData: any) {
  return fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/login`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loginFormData),
  }).then((response) => response.json());
}
/** 회원가입 폼 정보 post로 전송*/
export async function useJoinMutation(joinFormData: any) {
  return fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/join`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(joinFormData),
  }).then((response) => response.json());
}

/**메인화면 진입 시 제품 GET 해오기 */
export async function fetchProduct() {
  return fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/fakeProducts`).then(
    (response) => response.json()
  );
}
/** 카트 내용 서버로 전송*/
export async function fetchSendAddcart(cart: any) {
  fetch(`${process.env.REACT_APP_NODE_ADDRESS}/api/productList`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(cart),
  })
    .then((response) => response.json())
    .then((data) => console.log(data, "useQuery 성공"));
}
