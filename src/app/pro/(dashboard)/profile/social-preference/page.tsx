'use client';
import {
	Accordion,
	Box,
	Button,
	Flex,
	Text,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import ScheduleDaysBox from '@/features/intro/components/ScheduleDaysBox';
import SocialScheduleAccordion from '@/features/intro/components/SocialScheduleAccordion';
import useSocialSchedule from '@/features/dashboard/hooks/useSocialSchedule';
import BackButton from '@/components/General/BackButton';
import { AiFillInfoCircle } from 'react-icons/ai';
import ProfilePictureUploader from '@/components/General/ProfilePictureUploader';
import { useSearchParams } from 'next/navigation';
import AppModal from '@/components/AppModal';
import QueryContainer from '@/components/General/QueryContainer';

export default function SocialPreferencePage() {
	const { loading, submitSocialSchedule, toggleAccordion, loadingSchedules, error } =
		useSocialSchedule();
	const searchParams = useSearchParams();
	const newUser = searchParams.get('newUser');

	const {
		isOpen: isDpInfo,
		onClose: onCloseDpInfo,
		onOpen: onOpenDpInfo,
	} = useDisclosure();

	return (
		<QueryContainer loading={loadingSchedules} error={error}>
			<Box>
				<BackButton />
				<Text fontSize="2xl" fontWeight="bold" mt="3">
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
				{newUser ? (
					<>
						{/* Profile Photo */}
						<Flex flexDirection="column" mt="10">
							<Text fontWeight="medium">Upload your profile photo</Text>
							<Box my="3">
								<Tooltip
									label="Your profile photo is not public. It will be seen by potential friends once an outing has been completed. The only 
								members who can see your photo are perpetually members in your ProSocial circle and friends who have linked with your account"
									placement="bottom"
									fontSize="xs"
								>
									<Flex
										alignItems="center"
										gap="1"
										fontSize="xs"
										cursor="default"
										onClick={onOpenDpInfo}
									>
										<AiFillInfoCircle /> Why do I need a profile picture?
									</Flex>
								</Tooltip>
							</Box>
							<ProfilePictureUploader />
						</Flex>
					</>
				) : null}

				<Flex mt="5" w="full">
					<Button w="full" isLoading={loading} onClick={submitSocialSchedule}>
						Save
					</Button>
				</Flex>
			</Box>
			<AppModal
				title=""
				description="Your profile photo is not public. It will be seen by potential friends once an outing has been completed. The only 
				members who can see your photo are perpetually members in your ProSocial circle and friends who have linked with your account"
				isOpen={isDpInfo}
				onClose={onCloseDpInfo}
			/>
		</QueryContainer>
	);
}
