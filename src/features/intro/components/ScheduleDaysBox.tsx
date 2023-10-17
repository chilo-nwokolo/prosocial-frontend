import { Accordion, Box, Flex, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import SocialScheduleAccordion from "./SocialScheduleAccordion";

const weekdays = [
	{ id: 1, day: 'Monday' },
	{ id: 2, day: 'Tuesday' },
	{ id: 3, day: 'Wednesday' },
	{ id: 4, day: 'Thursday' },
	{ id: 5, day: 'Friday' },
];

const weekend = [
	{ id: 1, day: 'Saturday' },
	{ id: 2, day: 'Sunday' },
];

function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label' w="full">
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
  )
}


export default function ScheduleDaysBox({ source }: { source: string }) {

  const days = source === "weekday" ? weekdays : weekend;

  const options = [
		{ id: 1, title: 'Morning \n(7am - 12pm)' },
		{ id: 2, title: 'Afternoon \n(12 - 5pm)' },
		{ id: 3, title: 'Evening \n(5 - 9pm)' },
	];

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: "days",
		onChange: console.log,
	});

	const group = getRootProps();
  
	return (
		<Accordion allowMultiple>
			{days.map((week) => (
				<SocialScheduleAccordion title={week.day} key={week.id}>
					<HStack {...group} gap="0">
						{options?.map((value, i) => {
							const radio = getRadioProps({ value });
							return (
								<RadioCard key={i} {...radio}>
									{value.title}
								</RadioCard>
							);
						})}
					</HStack>
				</SocialScheduleAccordion>
			))}
		</Accordion>
	);
}
