"use client";

import { ToastContainer, toast } from "react-toastify";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const notify = (message) => toast(message);
  return (
    <ToastContext.Provider value={notify}>
      {children}
      <ToastContainer autoClose={3000} />
    </ToastContext.Provider>
  );
}
