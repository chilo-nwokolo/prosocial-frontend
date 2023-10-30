'use client';
import { Accordion, Box, Button, Flex, Text } from '@chakra-ui/react';
import ScheduleDaysBox from '@/features/intro/components/ScheduleDaysBox';
import SocialScheduleAccordion from '@/features/intro/components/SocialScheduleAccordion';
import useSocialSchedule from '@/features/dashboard/hooks/useSocialSchedule';

export default function SocialSchedule() {
	const { loading, submitSocialSchedule, toggleAccordion } = useSocialSchedule();

	return (
		<>
			<Box mt="5">
				<Text fontSize="2xl" fontWeight="bold">
					Weekly Availability
				</Text>
				<Accordion allowMultiple mt="5">
					<SocialScheduleAccordion title="Weekdays">
						<ScheduleDaysBox source="weekday" toggleAccordion={toggleAccordion} />
					</SocialScheduleAccordion>
					<SocialScheduleAccordion title="Weekend">
						<ScheduleDaysBox source="weekend" toggleAccordion={toggleAccordion} />
					</SocialScheduleAccordion>
				</Accordion>
				<Flex mt="5" w="full">
					<Button w="full" isLoading={loading} onClick={submitSocialSchedule}>
						Save
					</Button>
				</Flex>
			</Box>
		</>
	);
}
