import { useEffect, useState } from 'react';
import { useGlobalStore } from '@/store';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_SCHEDULE } from '@/features/dashboard/profile/gql/queries';
import { DayName, TimeRange } from '@/__generated__/graphql';
import { apolloErrorHandler } from '@/utils/helpers';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { appRouteLinks } from '@/utils/constants';

export type NewScheduleDateType = {
	day_name: DayName;
	time_range: TimeRange;
	status: boolean;
};

const times = {
	'Morning (7am - 12pm)': 'MORNING',
	'Afternoon (12 - 5pm)': 'AFTERNOON',
	'Evening (5 - 9pm)': 'EVENING',
};


export default function useSocialSchedule() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [selectedSchedules, updateSelectedSchedules] = useGlobalStore((state) => [
		state.selectedSchedules,
		state.updateSelectedSchedules,
	]);
	const router = useRouter();
	const toast = useToast();

	const [submit, { loading }] = useMutation(UPDATE_USER_SCHEDULE, {
		onCompleted: () => {
			toast({
				title: "Updated Successfully",
			});
			router.push(appRouteLinks.socialScheduleSuccess);
		},
		onError: (e) => {
			apolloErrorHandler(e);
		}
	});

	useEffect(() => {
		updateSelectedSchedules([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const toggleAccordion = (day: string) => {
		const index = selectedDays.indexOf(day);

		if (index < 0) {
			setSelectedDays([...selectedDays, day]);
		}

		if (index >= 0) {
			const newSelectedDays = [...selectedDays];
			newSelectedDays.splice(index, 1);
			setSelectedDays(newSelectedDays);
		}
	};

	const submitSocialSchedule = () => {
		const result: NewScheduleDateType[] = [];

		selectedSchedules.forEach((schedule) => {
			if (selectedDays.includes(schedule.day)) {
				result.push({
					day_name: schedule.day.toUpperCase() as DayName,
					time_range: times[schedule.time_range as keyof typeof times] as TimeRange,
					status: schedule.status,
				});
			}
		});

		submit({
			variables: { input: { schedules: result } },
		});
	};
  return { loading, submitSocialSchedule, toggleAccordion } as const;
}