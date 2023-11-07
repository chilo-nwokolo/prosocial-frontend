'use client';
import ProfilePicture from '@/components/General/ProfilePicture';
import { appRouteLinks } from '@/utils/constants';
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const links = [
	{ id: 1, destination: appRouteLinks.home, name: 'Home' },
	{ id: 2, destination: appRouteLinks.profile, name: 'Profile' },
	{ id: 3, destination: appRouteLinks.about, name: 'About' },
	{ id: 4, destination: appRouteLinks.contact, name: 'Contact' },
	{ id: 5, destination: appRouteLinks.logout, name: 'Log Out' },
];

export default function NavBar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const router = useRouter();

	return (
		<>
			<Flex
				border="1px solid"
				borderColor="gray.300"
				justifyContent="space-between"
				py="2"
				px="6"
				top="0"
				position="fixed"
				width="full"
				maxW="lg"
				minWidth="xs"
				bg="white"
				zIndex="modal"
				alignItems="center"
			>
				<Text fontWeight="semibold" fontSize="2xl">ProSocial</Text>
				<Box onClick={onOpen}>
					<ProfilePicture />
				</Box>
			</Flex>
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerBody>
						<Flex flexDir="column" gap="4" mt="10">
							{links.map((link) => (
								<Box
									cursor="pointer"
									_hover={{ textDecor: 'underline' }}
									onClick={() => {
										router.push(link.destination);
										onClose();
									}}
									key={link.id}
								>
									<Flex>{link.name}</Flex>
								</Box>
							))}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
