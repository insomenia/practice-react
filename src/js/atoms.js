import { atom } from "recoil";

const cartState = atom({
  key: "cartState",
  default: null,
});

const myInfoState = atom({
  key: "myInfo",
  default: null,
});

export { cartState, myInfoState };
