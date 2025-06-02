import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Smooth scroll to element
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

// Smooth scroll to top
export function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Transition utilities
export const transitions = {
  default: {
    type: "spring",
    stiffness: 260,
    damping: 20
  },
  smooth: {
    type: "spring",
    stiffness: 100,
    damping: 30
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10
  },
  fade: {
    type: "tween",
    duration: 0.3
  }
}
