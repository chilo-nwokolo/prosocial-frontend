import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  ThemingProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  description: string | ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ThemingProps<"Modal">["size"];
  actionButtons?: ReactNode;
};

export default function AppModal({
  description,
  title,
  isOpen,
  onClose,
  actionButtons,
  size,
}: Props) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pb="10">
          <Flex my="5" alignItems="center">
            <Text fontSize="lg" fontWeight="semibold">
              {title}
            </Text>
            <ModalCloseButton />
          </Flex>
          {typeof description === "string" ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
          <Flex mt="5" justifyContent="center" gap="5">
            {actionButtons}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
