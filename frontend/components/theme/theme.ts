import { createSystem, defaultConfig } from "@chakra-ui/react";
export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      cursor: {
        button: { value: "pointer" },
        checkbox: { value: "pointer" },
      },
      fonts: {
        body: { value: "Roboto, sans-serif" },
      },
      fontSizes: {
        "text-base": { value: "1rem" },
        "text-lg": { value: "1.25rem" },
        "text-xl": { value: "1.5rem" },
        "text-2xl": { value: "2rem" },
      },
      colors: {
        "text-primary": { value: "#394050" },
        "text-secondary": { value: "#22c55e" },
        "text-third": { value: "#9EA2AE" },
        "bg-primary": { value: "#F8F8FA" },
        "bg-secondary": { value: "#28439D" },
        "border-third": { value: "#E5E7EA" },
        "btn-bg-primary": { value: "#22c55e" },
        warning: { value: "#FBBC05" },
        error: { value: "#EB4335" },
        success: { value: "#34A853" },
        info: { value: "#4285F4" },
      },
    },
    breakpoints: {
      base: "0",
      sm: "375px",
      md: "47.5rem",
      lg: "62rem",
      xl: "80rem",
    },
  },
  globalCss: {
    body: {
      background: "#e7e8ed",
      color: "#3855B3",
      // color:#0073ff
    },
  },
});
