import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function TranscriptComponent({ children }: Props) {
  return (
    <Accordion allowToggle mt="5" borderColor="#6B4848" borderY="0px solid">
      <AccordionItem>
        <h2>
          <AccordionButton
            borderY="0px solid"
            borderColor="#6B4848"
            /*_hover={{ backgroundColor: "rgba(149, 205, 229, 0.3)" }}*/
          >
            <Box as="span" flex="1" textAlign="left" fontWeight="800">
              Transcript
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel
          pb={4}
          maxH="52"
          overflowY="auto"
          backgroundColor="white"
          borderTop="1px solid"
        >
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
