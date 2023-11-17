'use client';
import BackButton from '@/components/General/BackButton';
import InterestsAccordion from '@/features/dashboard/home/growth/components/InterestsAccordion';
import { INTERESTS_BY_NONE_TRAITS } from '@/features/dashboard/home/growth/queries';
import { client } from '@/service';
import { appRouteLinks } from '@/utils/constants';
import {
	Flex,
	FormControl,
	FormLabel,
	RadioGroup,
	Stack,
	Switch,
	Text,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';

export default function InterestedExtendedPage() {
	const result = client.readQuery({
		query: INTERESTS_BY_NONE_TRAITS,
	});
	return (
		<Flex flexDir="column">
			<Flex justifyContent="flex-end">
				<BackButton icon={<GrClose />} destination={appRouteLinks.interestsExpaned} />
			</Flex>
			<Text fontWeight="lg" fontSize="2xl">
				What are your interests
			</Text>
			<Flex flexDir="column">
				{result?.interestsByNoneTrait?.map((trait) => (
					<InterestsAccordion key={trait.id} title={trait.title || ''}>
						<Flex flexDir="column">
							<RadioGroup>
								<Stack>
									{trait?.interests?.map((interest, i) => (
										<Flex key={interest.id} p="3" bg={i % 2 === 0 ? "#f4ede2" : "transparent"}>
											<FormControl display="flex" alignItems="center" gap="3">
												<Switch id={interest.id as string} />
												<FormLabel htmlFor={interest.id as string} mb="0">
													{interest.title}
												</FormLabel>
											</FormControl>
										</Flex>
									))}
								</Stack>
							</RadioGroup>
						</Flex>
					</InterestsAccordion>
				))}
			</Flex>
		</Flex>
	);
}
