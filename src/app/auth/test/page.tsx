"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Box, Flex } from "@chakra-ui/react";

export default function page() {
  return (
    <Carousel
      showIndicators={false}
      showArrows={false}
      swipeable={false}
      autoPlay={false}
      showThumbs={false}
      showStatus={false}
      onClickItem={(e) => console.log(e)}
    >
      <Flex flexDir="column" gap="10">
        <Box bg="yellow" p="10">
          Box 1
        </Box>
        <Box bg="yellow" p="10">
          Box 2
        </Box>
      </Flex>
      <Flex flexDir="column" gap="10">
        <Box bg="yellow" p="10">
          Box 1
        </Box>
        <Box bg="yellow" p="10">
          Box 2
        </Box>
      </Flex>
      <Flex flexDir="column" gap="10">
        <Box bg="yellow" p="10">
          Box 1
        </Box>
        <Box bg="yellow" p="10">
          Box 2
        </Box>
      </Flex>
    </Carousel>
  );
}
