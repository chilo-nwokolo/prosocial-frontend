import { ImageLinks } from "@/utils/constants";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

type SwitchAccordionProps = {
  title: string;
  children: ReactNode;
  id: string;
  defaultIndex?: number[];
  imageUrl: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (info: string, id: string) => void;
};

function InterestsAccordion({
  title,
  children,
  onChange,
  id,
  defaultIndex,
  imageUrl,
}: SwitchAccordionProps) {
  return (
    <Accordion
      allowMultiple
      defaultIndex={defaultIndex}
      onChange={() => onChange && onChange(title, id)}
    >
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box as="span" ml="3" textAlign="left">
                  {title}
                </Box>
                {isExpanded ? (
                  <Text color="gray.600" flex={1}>
                    <RiArrowDropUpLine style={{ fontSize: "30px" }} />
                  </Text>
                ) : (
                  <Text color="gray.600" flex={1}>
                    <RiArrowDropDownLine style={{ fontSize: "30px" }} />
                  </Text>
                )}
                <Image
                  src={imageUrl}
                  width={75}
                  height={75}
                  alt="image"
                  objectFit="contain"
                  fallbackSrc={ImageLinks.logo}
                />
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

export default InterestsAccordion;
