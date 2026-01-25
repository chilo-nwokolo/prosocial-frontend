"use client";

import { useConfig } from "@/store";
import { ImageLinks } from "@/utils/constants";
import { Box, Image, SkeletonCircle } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import localStorageService from "@/service/localStorage";

export default function ProfilePicture() {
  const [updateConfig] = useConfig((state) => [state.updateConfig]);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorageService.getCurrentUser();
    if (user?.profile?.avatar) {
      setAvatar(user.profile.avatar);
      updateConfig({ user_has_uploaded_profile_picture: true });
    }
    setLoading(false);
  }, [updateConfig]);

  return (
    <Box
      border="1px solid"
      borderColor="primary.100"
      borderRadius="full"
      p="1"
      shadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
      cursor="pointer"
    >
      {loading ? (
        <SkeletonCircle size="10" />
      ) : (
        <Image
          src={avatar ? avatar : ImageLinks.dpPlaceholder}
          width="10"
          height="10"
          alt="profile picture"
          objectFit="cover"
          borderRadius="full"
        />
      )}
    </Box>
  );
}
