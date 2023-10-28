'use client';
import ProfilePicture from '@/components/General/ProfilePicture';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react';
import { RiMenu2Fill } from 'react-icons/ri';

export default function NavBar() {
	const { isOpen, onOpen, onClose } = useDisclosure()
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
				<Button size="lg" px="3" variant="outline" onClick={onOpen}>
					<RiMenu2Fill style={{ fontSize: '24px' }} />
				</Button>
				<ProfilePicture />
			</Flex>
			<Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
				<DrawerCloseButton />
          <DrawerBody>
            <p>Home</p>
            <p>Profile</p>
            <p>Contact</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
		</>
	);
}
