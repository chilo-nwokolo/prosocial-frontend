import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "0", // <-- border radius is same for all variants and sizes
    fontSize: "14px",
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    solid: {
      bg: "#f95c47",
      color: "white",
      boxShadow: "2px 2px 1px 0px #000",
      _hover: {
        bg: "#F93A20",
        color: "white",
      },
      _active: {
        bg: "#f95c47",
        boxShadow: "0px 0px 1px 0px #000",
      },
    },
    secondary: {
      bg: "#fff",
      color: "#3A3738",
      boxShadow: "2px 2px 1px 0px #876a6c94",
      _hover: {
        bg: "#D8EBF3",
        color: "#3A3738",
      },
      _active: {
        bg: "#D8EBF3",
        boxShadow: "0px 0px 1px 0px #876a6c94",
      },
    },
    outline: {
      background: "transparent",
      borderColor: "#f95c47",
      color: "black",
      fontWeight: "normal",
      borderRadius: "lg",
      _hover: {
        bg: "#f95c47",
        color: "white",
      },
    },
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solid",
  },
});
