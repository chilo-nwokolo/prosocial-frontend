import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";

type SwitchAccordionProps = {
  title: string;
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onChange?: (info: string) => void;
  defaultIndex?: number[];
};

function SwitchAccordion({
  title,
  children,
  onChange,
  defaultIndex,
}: SwitchAccordionProps) {
  return (
    <Accordion
      allowMultiple
      defaultIndex={defaultIndex}
      onChange={() => onChange && onChange(title)}
    >
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {title}
                </Box>
                {isExpanded ? (
                  <Text color="gray.600">
                    <LiaToggleOnSolid style={{ fontSize: "24px" }} />
                  </Text>
                ) : (
                  <Text color="gray.600">
                    <LiaToggleOffSolid style={{ fontSize: "24px" }} />
                  </Text>
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel mr="0" pr="0" pb={4}>
              {children}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}

export default SwitchAccordion;
