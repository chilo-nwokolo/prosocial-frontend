'use client';

import { Box, Image } from "@chakra-ui/react";


export default function ProfilePicture() {
	return (
    <Box border="1px solid" borderColor="gray.300" borderRadius="full" p="1" shadow="sm" cursor="pointer">
      <Image src="/profileImage.jpg" width="12" height="12" alt="profile picture" style={{ borderRadius: "50%", objectFit: "cover" }} />
    </Box>
	);
}
