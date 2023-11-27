import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "base", // <-- border radius is same for all variants and sizes
    fontSize: "16px",
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
      textTransform: "uppercase",
      _hover: {
        bg: "#f95c47",
        color: "white",
      },
      _active: {
        bg: "#f95c47",
        boxShadow: "0px 0px 1px 0px #000",
      },
    },
    secondary: {
      bg: "#e3d5d6",
      color: "#3a3738",
      boxShadow: "2px 2px 1px 0px #876a6c",
      textTransform: "uppercase",
      _hover: {
        bg: "#f95c47",
        color: "white",
      },
      _active: {
        bg: "#e3d5d6",
        boxShadow: "0px 0px 1px 0px #000",
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
