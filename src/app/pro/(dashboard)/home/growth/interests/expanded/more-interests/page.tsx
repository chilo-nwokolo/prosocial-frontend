'use client';
import BackButton from '@/components/General/BackButton';
import InterestsAccordion from '@/features/dashboard/home/growth/components/InterestsAccordion';
import InterestsSwitch from '@/features/dashboard/home/growth/components/InterestsSwitch';
import { INTERESTS_BY_NONE_TRAITS } from '@/features/dashboard/home/growth/queries';
import { client } from '@/service';
import { appRouteLinks } from '@/utils/constants';
import {
	Flex,
	RadioGroup,
	Stack,
	Text,
} from '@chakra-ui/react';
import { GrClose } from 'react-icons/gr';

export default function InterestedExtendedPage() {
	const result = client.readQuery({
		query: INTERESTS_BY_NONE_TRAITS,
	});

	const onChange = (value: string, checked: boolean) => {
		console.log(value, checked);
	}

	return (
		<Flex flexDir="column">
			<Flex justifyContent="flex-end">
				<BackButton icon={<GrClose />} destination={appRouteLinks.interestsExpaned} />
			</Flex>
			<Text fontWeight="lg" fontSize="2xl">
				What are your interests
			</Text>
			<Flex flexDir="column" mt="4">
				{result?.interestsByNoneTrait?.length ? (
					result?.interestsByNoneTrait?.map((trait) => (
						<InterestsAccordion key={trait.id} title={trait.title || ''}>
							<Flex flexDir="column">
								<RadioGroup>
									<Stack>
										{trait?.interests?.map((interest, i) => (
											<Flex
												key={interest.id}
												p="3"
												bg={i % 2 === 0 ? '#f4ede2' : 'transparent'}
											>
												<InterestsSwitch interest={interest} onChange={onChange} />
											</Flex>
										))}
									</Stack>
								</RadioGroup>
							</Flex>
						</InterestsAccordion>
					))
				) : (
					<Flex flexDir="column" alignItems="center" gap="4" mt="4">
						<Text>Sorry we were unable to fetch this data. Kindly click on the Go Back button and click on Begin to try again.</Text>
						<BackButton text="Go Back" />
					</Flex>
				)}
			</Flex>
		</Flex>
	);
}
