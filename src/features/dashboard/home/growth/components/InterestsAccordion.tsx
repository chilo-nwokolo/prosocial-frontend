import { ImageLinks } from '@/utils/constants';
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Image,
	Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia';

type SwitchAccordionProps = {
	title: string;
	children: ReactNode;
	// eslint-disable-next-line no-unused-vars
	onChange?: (info: string) => void;
};

function InterestsAccordion({ title, children, onChange }: SwitchAccordionProps) {
	return (
		<Accordion allowMultiple onChange={() => onChange && onChange(title)}>
			<AccordionItem>
				{({ isExpanded }) => (
					<>
						<h2>
							<AccordionButton py="5">
								{isExpanded ? (
									<Text color="gray.600">
										<LiaToggleOnSolid style={{ fontSize: '24px' }} />
									</Text>
								) : (
									<Text color="gray.600">
										<LiaToggleOffSolid style={{ fontSize: '24px' }} />
									</Text>
								)}
								<Box as="span" flex="1" ml="3" textAlign="left">
									{title}
								</Box>
                <Image src={ImageLinks.logo} width={50} height={50} alt='image' />
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
