"use client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import TermsAndConditionsContent from "./TermsAndConditionsContent";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TermsAndConditionsModal({ isOpen, onClose }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader borderBottom="1px solid" borderColor="gray.200">
          Terms of Use Agreement
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody py={4}>
          <Box>
            <TermsAndConditionsContent />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
