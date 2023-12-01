import { youtubeLinks } from "@/utils/constants";
import { Box } from "@chakra-ui/react";
import React from "react";

type Props = { embedId: string };

export default function YoutubeEmbed({
  embedId = youtubeLinks.welcomePageMobile,
}: Props) {
  return (
    <Box border="1px solid" color="primary.200">
      <iframe
        className="youtube-iframe"
        width="100%"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allowFullScreen
        title="Embedded youtube"
      />
    </Box>
  );
}

{
  /* <iframe
	width="1023"
	height="575"
	src="https://www.youtube.com/embed/nt4VRSr0JNs"
	title="Introduction"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>; */
}
