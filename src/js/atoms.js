import { atom } from "recoil";

const cartState = atom({
  key: "cartState",
  default: null,
});

const myInfoState = atom({
  key: "myInfo",
  default: null,
});

const likesState = atom({
  key: "likes",
  default: []
});

const cartReadyState = atom({
  key: "cartReady",
  default:[]
});

const itemState = atom({
  key: "item",
  default:null
})
export { cartState, myInfoState, likesState, cartReadyState, itemState };