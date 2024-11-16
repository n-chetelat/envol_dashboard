import { cssTransition } from "react-toastify";

export const toastTransition = cssTransition({
  enter: "fade-enter",
  exit: "fade-exit",
  duration: [400, 400], // [enter, exit] duration in ms
});
