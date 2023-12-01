import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

type Props = {
  children: string;
};

export default function TranscriptComponent({ children }: Props) {
  return (
    <Accordion allowToggle mt="5">
      <AccordionItem>
        <h2>
          <AccordionButton borderY="1px solid" borderColor="#876a6c">
            <Box as="span" flex="1" textAlign="left">
              Transcript
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} maxH="52" overflowY="auto">
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
