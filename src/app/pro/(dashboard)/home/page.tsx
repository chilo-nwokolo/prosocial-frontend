import { Box, Flex, Text } from '@chakra-ui/react';
import { GrGrow } from 'react-icons/gr';
import { FaPeopleArrows } from 'react-icons/fa';
import { BiSolidChevronRight } from 'react-icons/bi';

const homeSections = [
	{
		id: 1,
		icon: <GrGrow style={{ fontSize: '30px' }} />,
		title: 'Growth',
		desc: 'Discover your strengths and growth areas',
		subText: 'Tell us about your talents and interests',
	},
	{
		id: 2,
		title: 'Social',
		icon: <FaPeopleArrows style={{ fontSize: '30px' }} />,
		desc: '',
		subText: 'Update your weekly availability',
	},
];

export default function HomePage() {
	return (
		<Flex flexDir="column" w="full" gap="5">
			{homeSections.map((section) => (
				<Flex
          cursor='pointer'
					flexDir="column"
					w="full"
          _hover={{ shadow: 'md' }}
					key={section.id}
					gap="4"
					border="1px solid"
					borderColor="gray.400"
					borderRadius="xl"
					py="10"
					px="5"
				>
          <Text>{section.icon}</Text>
          <Flex alignItems="center" gap='4'>
            <Text fontWeight='medium' fontSize="2xl">{section.title}</Text>
            <Box as='span'><BiSolidChevronRight style={{ fontSize: '20px' }} /></Box>
          </Flex>
					<Text>{section.desc}</Text>
					<Text>{section.subText}</Text>
				</Flex>
			))}
		</Flex>
	);
}
