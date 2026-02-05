"use client";

import AppModal from "@/components/AppModal";
import TermsAndConditionsContent from "@/components/General/TermsAndConditionsContent";
import { externalLinks } from "@/utils/constants";
import { Box, Button, useDisclosure } from "@chakra-ui/react";

export default function TermsAndConditionsPage() {
  const { isOpen: isDeclineModal, onClose: closeDeclineModal } =
    useDisclosure();

  const onClose = () => {
    closeDeclineModal();
    window.location.href = externalLinks.website;
  };

  return (
    <Box position="relative">
      <Box
        border="1px solid"
        bg="white"
        borderColor="primary.200"
        p="5"
        mt="-5"
        mx="-6"
      >
        <TermsAndConditionsContent />
      </Box>
      <AppModal
        title="Are you sure you want to decline?"
        description="We won't be able to match you with other ProSocial users if you do not accept our terms and conditions"
        onClose={closeDeclineModal}
        isOpen={isDeclineModal}
        actionButtons={<Button onClick={onClose}>Exit to home</Button>}
      />
    </Box>
  );
}
