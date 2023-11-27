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
    },
    bg: "#fdf5e9",
  },
  components: {
    Button,
  },
  breakpoints,
});
