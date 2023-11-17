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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineHome } from 'react-icons/ai';
import { BiExit, BiUserCircle } from 'react-icons/bi';
import { CgNotes } from 'react-icons/cg';
import { MdOutlineContactEmergency } from 'react-icons/md';
import { RiMenu2Fill } from 'react-icons/ri';

const links = [
	{ id: 1, destination: appRouteLinks.home, name: 'Home', icon: <AiOutlineHome /> },
	{ id: 2, destination: appRouteLinks.profile, name: 'Profile', icon: <BiUserCircle /> },
	{ id: 3, destination: appRouteLinks.about, name: 'About', icon: <CgNotes /> },
	{ id: 4, destination: appRouteLinks.contact, name: 'Contact', icon: <MdOutlineContactEmergency /> },
	{ id: 5, destination: appRouteLinks.logout, name: 'Log Out', icon: <BiExit /> },
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
				bg="bg"
				minWidth="xs"
				zIndex="modal"
				alignItems="center"
			>
				<Link href={appRouteLinks.profile}>
					<ProfilePicture />
				</Link>
				<Text fontWeight="semibold" fontSize="2xl">
					ProSocial
				</Text>
				<Box onClick={onOpen} cursor="pointer" p="2">
					<RiMenu2Fill style={{ fontSize: '24px' }} />
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
									<Flex alignItems="center" gap="3"><Text>{link.icon}</Text><Text>{link.name}</Text></Flex>
								</Box>
							))}
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
}
