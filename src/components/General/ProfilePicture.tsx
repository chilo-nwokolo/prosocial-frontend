'use client';

import { ME_QUERY } from '@/features/dashboard/profile/gql/queries';
import { ImageLinks } from '@/utils/constants';
import { useQuery } from '@apollo/client';
import { Box, Image, SkeletonCircle } from '@chakra-ui/react';

export default function ProfilePicture() {
	const { loading, data } = useQuery(ME_QUERY);

	return (
		<Box
			border="1px solid"
			borderColor="gray.300"
			borderRadius="full"
			p="1"
			shadow="sm"
			cursor="pointer"
		>
			{loading ? (
				<SkeletonCircle size="10" />
			) : (
				<Image
					src={data?.me?.profile?.avatar ? data?.me?.profile?.avatar : ImageLinks.logo}
					width="12"
					height="12"
					alt="profile picture"
          objectFit="cover"
          borderRadius="full"
				/>
			)}
		</Box>
	);
}
