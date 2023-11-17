'use client';
import YoutubeEmbed from '@/components/General/YoutubeEmbed';
import { appRouteLinks, youtubeLinks } from '@/utils/constants';
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
import { useState } from 'react';

export default function WelcomePage() {
	const [inView, setInView] = useState(true)

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
			<YoutubeEmbed embedId={inView ? youtubeLinks.welcomePageDesktop : youtubeLinks.welcomePageMobile} />
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
      <Flex justifyContent="center" flexDir="column" gap="4" my="8">
        <Link href={appRouteLinks.serviceTerms}>
          <Button w="full">Next</Button>
        </Link>
				<Button onClick={() => setInView(!inView)}>Switch to { inView ? 'Mobile' : 'Widescreen' }</Button>
      </Flex>
		</Box>
	);
}
