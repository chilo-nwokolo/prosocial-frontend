import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components/Button";

const breakpoints = {
  base: "0em",
  xxs: "15em",
  xs: "20em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
  "3xl": "106em",
};

export const theme = extendTheme({
  colors: {
    primary: {
      100: "#f95c47",
      200: "#3a3738",
      300: "#876A6C",
      400: "#6B4848",
    },
    critical: {
      100: "#f95c47",
    },
    info: {
      /*link color*/ 100: "#226db4",
      /*tooltip text color option*/ 200: "#15617F",
      300: "#15617F",
    },
    bg: "#fdf5e9",
  },
  components: {
    Button,
  },
  breakpoints,
});
