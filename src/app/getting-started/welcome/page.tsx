import { appRouteLinks } from '@/utils/constants';
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';

export default function WelcomePage() {
	return (
		<Box mt="20">
			<Text as="h1" fontSize="2xl" fontWeight="medium">
				Welcome to ProSocial
			</Text>
			<Flex flexDir="column" gap="5" my="5">
				<Text>
					We offer the opportunity to discover new friendships with amazing people!
				</Text>
				<Text>Here&apos;s what to expect as you start your journey:</Text>
			</Flex>
			<Flex justifyContent="center" alignItems="center" bg="black" h="56" w="full" color="white" borderRadius="md">
        <FaPlay style={{ fontSize: "50px" }} />
      </Flex>
			<Accordion allowToggle mt="5">
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box as="span" flex="1" textAlign="left">
								Transcript
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4} maxH="52" overflowY="auto">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
						nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
      <Flex justifyContent="center" mt="8">
        <Link href={appRouteLinks.serviceTerms}>
          <Button>Next</Button>
        </Link>
      </Flex>
		</Box>
	);
}
