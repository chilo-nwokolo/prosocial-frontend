import {
	Accordion,
	Box,
	Flex,
	HStack,
	useCheckbox,
	useCheckboxGroup,
} from '@chakra-ui/react';
import SocialScheduleAccordion from '@/components/General/SwitchAccordion';
import { useEffect, useState } from 'react';
import { ScheduleDateType, useUserStore } from '@/store';

const options = [
	{ id: 1, title: 'Morning \n(7am - 12pm)', value: 'MORNING' },
	{ id: 2, title: 'Afternoon \n(12 - 5pm)', value: 'AFTERNOON' },
	{ id: 3, title: 'Evening \n(5 - 9pm)', value: 'EVENING' },
];

const weekdays = [
	{ id: 1, day: 'Monday', value: 'MONDAY', options },
	{ id: 2, day: 'Tuesday', value: 'TUESDAY', options },
	{ id: 3, day: 'Wednesday', value: 'WEDNESDAY', options },
	{ id: 4, day: 'Thursday', value: 'THURSDAY', options },
	{ id: 5, day: 'Friday', value: 'FRIDAY', options },
];

const weekend = [
	{ id: 1, day: 'Saturday', value: 'SATURDAY', options },
	{ id: 2, day: 'Sunday', value: 'SUNDAY', options },
];

function CheckboxCard(props: any) {
	const { getInputProps, getCheckboxProps } = useCheckbox(props);

	const input = getInputProps();
	const checkbox = getCheckboxProps();

	return (
		<Box as="label" w="full">
			<input {...input} />
			<Flex
				{...checkbox}
				cursor="pointer"
				borderWidth="2px"
				_checked={{
					bg: 'teal.600',
					color: 'white',
					borderColor: 'teal.600',
				}}
				w="full"
				textAlign="center"
				alignItems="center"
				justifyContent="center"
				py="3"
				whiteSpace="pre-wrap"
			>
				{props.children}
			</Flex>
		</Box>
	);
}

function ScheduleDays({
	day,
	options,
	onChecked,
	selectedSchedules,
}: {
	day: string;
	options: (typeof weekdays)[0]['options'];
	// eslint-disable-next-line no-unused-vars
	onChecked: (day: string, timeRange: string[]) => void;
	selectedSchedules: ScheduleDateType[];
}) {
	const [state, setState] = useState<string[]>([]);
	const { value, getCheckboxProps } = useCheckboxGroup({
		defaultValue: state,
		onChange: () => {
			onChecked(day, value as string[]);
		},
	});

	useEffect(() => {
		setState(selectedSchedules.find((sch) => sch.day === day)?.timeRange || []);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [day, value]);

	return (
		<HStack gap="0">
			{options.map((value) => {
				return (
					<CheckboxCard key={value.id} {...getCheckboxProps({ value: value.value })}>
						{value.title}
					</CheckboxCard>
				);
			})}
		</HStack>
	);
}

export default function ScheduleDaysBox({
	source,
	toggleAccordion,
}: {
	source: string;
	// eslint-disable-next-line no-unused-vars
	toggleAccordion: (info: string) => void;
}) {
	const category = source === 'weekday' ? weekdays : weekend;
	const [selectedSchedules, updateSelectedSchedules] = useUserStore((state) => [
		state.selectedSchedules,
		state.updateSelectedSchedules,
	]);

	const onChecked = (day: string, timeRange: string[]) => {
		const scheduleIndex = selectedSchedules.findIndex((schedule) => schedule.day === day);
		if (scheduleIndex >= 0) {
			const newSchedule = { day, timeRange: timeRange, status: true };
			const scheduleDup = [...selectedSchedules];
			scheduleDup.splice(scheduleIndex, 1, newSchedule);
			updateSelectedSchedules(scheduleDup);
			return;
		}
		updateSelectedSchedules([...selectedSchedules, { day, timeRange, status: true }]);
	};

	return (
		<Accordion allowMultiple>
			{category.map((days) => (
				<SocialScheduleAccordion
					title={days.day}
					key={days.id}
					onChange={() => toggleAccordion(days.value)}
				>
					<ScheduleDays
						selectedSchedules={selectedSchedules}
						options={days.options}
						day={days.value}
						onChecked={onChecked}
					/>
				</SocialScheduleAccordion>
			))}
		</Accordion>
	);
}
