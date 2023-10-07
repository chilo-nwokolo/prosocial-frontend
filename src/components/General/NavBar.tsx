import ProfilePicture from '@/components/General/ProfilePicture';
import { Button, Flex } from '@chakra-ui/react';
import { RiMenu2Fill } from 'react-icons/ri';

export default function NavBar() {
  return (
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
				<Button size="lg" px="3" variant="outline">
					<RiMenu2Fill style={{ fontSize: "24px" }} />
				</Button>
				<ProfilePicture />
			</Flex>
  )
}