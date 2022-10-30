import { atom } from "recoil";

const modelState = atom({
  key: "model",
  default: false,
});

export default modelState;
