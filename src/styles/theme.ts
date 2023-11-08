import { extendTheme } from "@chakra-ui/react"
import { Button } from "./components/Button";

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#f95c47',
    },
    bg: '#fdf5e9',
  },
  components: {
    Button,
  }
});
