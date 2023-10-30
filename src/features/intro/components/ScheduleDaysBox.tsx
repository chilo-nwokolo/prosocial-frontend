import { Accordion, Box, Flex, HStack, useRadio, useRadioGroup } from '@chakra-ui/react';
import SocialScheduleAccordion from './SocialScheduleAccordion';
import { useGlobalStore } from '@/store';

const options = [
	{ id: 1, title: 'Morning \n(7am - 12pm)' },
	{ id: 2, title: 'Afternoon \n(12 - 5pm)' },
	{ id: 3, title: 'Evening \n(5 - 9pm)' },
];

const weekdays = [
	{ id: 1, day: 'Monday', options },
	{ id: 2, day: 'Tuesday', options },
	{ id: 3, day: 'Wednesday', options },
	{ id: 4, day: 'Thursday', options },
	{ id: 5, day: 'Friday', options },
];

const weekend = [
	{ id: 1, day: 'Saturday', options },
	{ id: 2, day: 'Sunday', options },
];

function RadioCard(props: any) {
	const { getInputProps, getRadioProps } = useRadio(props);

	const input = getInputProps();
	const checkbox = getRadioProps();

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
}: {
	day: string;
	options: (typeof weekdays)[0]['options'];
}) {
	const [selectedSchedules, updateSelectedSchedules] = useGlobalStore((state) => [state.selectedSchedules, state.updateSelectedSchedules]);

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: day,
		onChange: (range) => {
			const result = { day, time_range: range.replace('\n', ''), status: true };
			const found = selectedSchedules.findIndex((value) => value.day === day);

			if (found < 0) {
				updateSelectedSchedules([...selectedSchedules, result]);
			} 
			if (found >= 0) {
				const newList = [...selectedSchedules];
				newList.splice(found, 1);
				updateSelectedSchedules([...newList, result]);
			}
		},
	});
	const group = getRootProps();
	return (
		<HStack {...group} gap="0">
			{options.map((value) => {
				const radio = getRadioProps({ value: `${value.title}` });
				return (
					<RadioCard key={value.id} {...radio}>
						{value.title}
					</RadioCard>
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

	return (
		<Accordion allowMultiple>
			{category.map((days) => (
				<SocialScheduleAccordion
					title={days.day}
					key={days.id}
					onChange={toggleAccordion}
				>
					<ScheduleDays options={days.options} day={days.day} />
				</SocialScheduleAccordion>
			))}
		</Accordion>
	);
}
