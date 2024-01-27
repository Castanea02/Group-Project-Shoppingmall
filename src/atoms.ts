import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
//user 로그인 상태 확인 Atom
const { persistAtom } = recoilPersist();
export const isUserAtom = atom({
  key: "user",
  default: false,
  /**Recoil 새로고침 휘발 방지 */
  effects_UNSTABLE: [persistAtom],
});
