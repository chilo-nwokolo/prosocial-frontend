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
      bg: "#15617F",
      color: "white",
      boxShadow: "1px 1px .5px 0px #876A6C",
      _hover: {
        bg: "#006999",
        color: "white",
      },
      _active: {
        bg: "15617F",
        boxShadow: "0px 0px 1px 0px #876A6C",
      },
    },
    secondary: {
      w: "small",
      border:"1px",
      color: "#15617F",
      fontWeight: "500",
      padding: ".5em",
      _hover: {
        color: "black",
        bg: "white",
      },
      _active: {
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
