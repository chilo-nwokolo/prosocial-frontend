import {
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Spinner,
	Text,
} from '@chakra-ui/react';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	loadingText?: string;
};

export default function LoadingModal({ isOpen, onClose, loadingText = "Loading..." }: Props) {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose} size="xl">
			<ModalOverlay />
			<ModalContent mx="5">
				<ModalBody>
					<Flex flexDir="column" py="8" alignItems="center" gap="5">
						<Spinner size="xl" />
						<Text fontSize="xl" fontWeight="medium" textAlign="center">
							{loadingText}
						</Text>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
}
