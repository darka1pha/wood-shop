import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#AE4600",
    rust: "#A44200",
    bloodRed: "#69140E",
    dark: "#3C1518",
  },
});

export const TextVariants = {
  heading1: {
    fontFamily: "VazirBold",
    fontSize: 48,
    color: "black",
  },
  heading2: {
    fontFamily: "VazirBold",
    fontSize: 40,
    color: "black",
  },
  heading3: {
    fontFamily: "VazirBold",
    fontSize: 32,
    color: "black",
  },
  heading4: {
    fontFamily: "VazirBold",
    fontSize: 24,
    color: "black",
  },
  heading5: {
    fontFamily: "VazirBold",
    fontSize: 16,
    color: "black",
  },
  heading6: {
    fontFamily: "VazirBold",
    fontSize: 8,
    color: "black",
  },
  normal: {
    fontFamily: "Vazir",
    fontSize: 12,
    color: "white",
  },
  normalMedium: { fontFamily: "VazirMedium", fontSize: 12, color: "white" },
  normalThin: { fontFamily: "VazirThin", fontSize: 12, color: "white" },
  normalLight: { fontFamily: "VazirLight", fontSize: 12, color: "white" },
};
