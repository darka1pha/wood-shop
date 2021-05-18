import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    primary: "#AE4600",
    rust: "#A44200",
    bloodRed: "#69140E",
    dark: "#3C1518",
    bgColor: "#F2F2F2",
    itemsBg: "#ECECEC",
    itemsBorder: "#C6C6C6"
  },
});

export const TextVariants = {
  heading1: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 48,
    color: "black",
  },
  heading2: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 40,
    color: "black",
  },
  heading3: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 32,
    color: "black",
  },
  heading4: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 24,
    color: "black",
  },
  heading5: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  heading6: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  heading7: {
    fontFamily: "iranSans",
    fontWeight: "bold",
    fontSize: 12,
    color: "black",
  },
  normal: {
    fontFamily: "iranSans",
    fontWeight: "400",
    fontSize: 12,
    color: "white",
  },
  normalExt: {
    fontFamily: "iranSans",
    fontWeight: "400",
    fontSize: 14,
    color: "white",
  },
  normalMedium: {
    fontFamily: "iranSans",
    fontWeight: "500",
    fontSize: 12,
    color: "white"
  },
  normalThin: {
    fontFamily: "iranSans",
    fontWeight: "100",
    fontSize: 12,
    color: "white"
  },
  normalLight: {
    fontFamily: "iranSans",
    fontWeight: "300",
    fontSize: 12,
    color: "white"
  },
};
