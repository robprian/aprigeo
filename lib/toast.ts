"use client"

import { toast as sonnerToast } from "sonner"

export const toast = {
  success: (message: string, options?: any) => {
    return sonnerToast.success(message, {
      duration: 3000,
      position: "top-right",
      ...options,
    })
  },
  error: (message: string, options?: any) => {
    return sonnerToast.error(message, {
      duration: 4000,
      position: "top-right",
      ...options,
    })
  },
  info: (message: string, options?: any) => {
    return sonnerToast.info(message, {
      duration: 3000,
      position: "top-right",
      ...options,
    })
  },
  warning: (message: string, options?: any) => {
    return sonnerToast.warning(message, {
      duration: 3500,
      position: "top-right",
      ...options,
    })
  },
  loading: (message: string, options?: any) => {
    return sonnerToast.loading(message, {
      position: "top-right",
      ...options,
    })
  },
  promise: (promise: Promise<any>, messages: { loading: string; success: string; error: string }) => {
    return sonnerToast.promise(promise, messages)
  },
}
