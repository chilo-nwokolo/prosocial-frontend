'use client';
import { ME_QUERY } from '@/features/dashboard/profile/gql/queries';
import { useQuery } from '@apollo/client';
import { Text } from '@chakra-ui/react';

export default function ProfilePage() {
	// eslint-disable-next-line no-unused-vars
	const { data } = useQuery(ME_QUERY);
	// console.log(data);
	return <Text>Profile Page</Text>;
}
