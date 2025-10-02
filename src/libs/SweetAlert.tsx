"use client"

import Swal from "sweetalert2"

export const showToast = (
  title: string,
  icon: "success" | "error" | "warning" | "info" | "question",
  theme?: "light" | "dark",
) => {
  const currentTheme = theme || document.documentElement.classList.contains("dark") ? "dark" : "light"

  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    icon,
    title,
    customClass: {
      popup: `colored-toast colored-toast-${currentTheme}`,
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    },
  })
}
