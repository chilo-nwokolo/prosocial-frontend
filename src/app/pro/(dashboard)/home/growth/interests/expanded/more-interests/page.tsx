'use client';
import BackButton from '@/components/General/BackButton';
import { INTERESTS_BY_NONE_TRAITS } from '@/features/dashboard/home/growth/queries';
import { client } from '@/service';
import { appRouteLinks } from '@/utils/constants';
import { Flex, Text } from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';

export default function InterestedExtendedPage() {
	const result = client.readQuery({
		query: INTERESTS_BY_NONE_TRAITS,
	});
	console.log({result});
	return (
		<Flex flexDir="column">
			<Flex justifyContent="flex-end">
				<BackButton icon={<GrClose />} destination={appRouteLinks.growthInterests} />
			</Flex>
			<Flex flexDir="column">
				<Text fontWeight="lg" fontSize="2xl">What are your interests</Text>
			</Flex>
		</Flex>
	);
}
