"use client";

import { ME_QUERY } from "@/features/dashboard/profile/gql/queries";
import { useConfig } from "@/store";
import { ImageLinks } from "@/utils/constants";
import { useQuery } from "@apollo/client";
import { Box, Image, SkeletonCircle } from "@chakra-ui/react";

export default function ProfilePicture() {
  const [updateConfig] = useConfig((state) => [state.updateConfig]);

  const { loading, data } = useQuery(ME_QUERY, {
    onCompleted: (data) => {
      if (data?.me?.profile?.avatar) {
        updateConfig({ user_has_uploaded_profile_picture: true });
      }
    },
  });

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
          src={
            data?.me?.profile?.avatar
              ? data?.me?.profile?.avatar
              : ImageLinks.dpPlaceholder
          }
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
