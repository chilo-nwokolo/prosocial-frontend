import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  inView: string;
};

export default function IFrameModal({ onClose, isOpen, inView }: Props) {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent h="100vh">
        <iframe src={inView} height="100%" width="100%" />
      </ModalContent>
    </Modal>
  );
}
