import Cookies from "js-cookie"
import React from "react"
import { toast, ToastIcon } from "react-toastify"
import SUCCESSICON from "../assets/toast_check.svg"
import WARNINGICON from "../assets/toast_warning.svg"

// Function to handle session logout
export function sessionLogout(hasToast = true) {
  Cookies.remove("access_token")
  Cookies.remove("refresh_token")
  localStorage.removeItem("user")
  if (hasToast) showToast("Session Expired! Please log in again.", "warning")
  window.location.href = "/auth/sign-in"
}

// Function to handle Toast Notifications
type ToastType = "success" | "warning" | "error" | "info"
export const showToast = (message: string, type: ToastType) => {
  const icons: Record<ToastType, React.ReactElement> = {
    success: React.createElement("img", {
      src: SUCCESSICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    warning: React.createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
    error: React.createElement("img", {
      src: WARNINGICON,
      alt: "success",
      width: 20,
      height: 20,
    }),
    info: React.createElement("img", {
      src: WARNINGICON,
      alt: "warning",
      width: 20,
      height: 20,
    }),
  }

  toast[type]!(message, {
    icon: icons[type] as ToastIcon,
    className: "text-white",
  })
}
