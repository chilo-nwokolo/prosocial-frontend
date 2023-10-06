'use client';

import AppModal from '@/components/AppModal';
import { appRouteLinks } from '@/utils/constants';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
	const {
		isOpen: isDeclineModal,
		onClose: closeDeclineModal,
		onOpen: openDeclineModal,
	} = useDisclosure();
	return (
		<>
			<Box>
				<Text as="h1" fontSize="2xl" fontWeight="medium">
					Terms & conditions
				</Text>
				<Box mt="4">
					{[1, 2, 3, 4, 5].map((i) => (
						<Text key={i}>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae doloribus
							soluta expedita eius? Similique placeat eveniet facilis ipsum iusto sit quo
							perferendis omnis, rem exercitationem in ipsa voluptas excepturi et!
						</Text>
					))}
				</Box>
				<Flex justifyContent="center" gap="4" mt="8">
					<Button onClick={openDeclineModal}>Decline</Button>
          <Link href={appRouteLinks.register}>
						<Button>Accept</Button>
          </Link>
				</Flex>
			</Box>
			<AppModal
				title="Are you sure you want to decline?"
				description="We won't be able to match you with other ProSocial users if you do not accept our terms and conditions"
				onClose={closeDeclineModal}
				isOpen={isDeclineModal}
        actionButtons={<Button onClick={closeDeclineModal}>Close App</Button>}
			/>
		</>
	);
}
