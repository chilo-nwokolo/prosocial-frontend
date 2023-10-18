'use client';
import ScheduleDaysBox from '@/features/intro/components/ScheduleDaysBox';
import SocialScheduleAccordion from '@/features/intro/components/SocialScheduleAccordion';
import { Accordion, Box, Button, Flex, Text } from '@chakra-ui/react';

export default function SocialSchedule() {
	return (
		<>
			<Box mt="5">
				<Text fontSize="2xl" fontWeight="bold">
					Weekly Availability
				</Text>
				<Accordion allowMultiple mt="5">
					<SocialScheduleAccordion title="Weekdays">
						<ScheduleDaysBox source="weekday" />
					</SocialScheduleAccordion>
					<SocialScheduleAccordion title="Weekend">
						<ScheduleDaysBox source="weekend" />
					</SocialScheduleAccordion>
				</Accordion>
				<Flex mt="5" w="full">
					<Button w="full">Save</Button>
				</Flex>
			</Box>
		</>
	);
}
