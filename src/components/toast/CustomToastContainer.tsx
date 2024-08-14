"use client";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { toastTransition } from "@/components/transitions/ToastTransition";

export default function CustomToastContainer(props: ToastContainerProps) {
  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={false}
      autoClose={3000}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      transition={toastTransition}
      {...props}
    />
  );
}
