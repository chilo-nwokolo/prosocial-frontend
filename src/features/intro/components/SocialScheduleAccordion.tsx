import {
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Box,
	Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { LiaToggleOnSolid, LiaToggleOffSolid } from 'react-icons/lia';

type SocialScheduleAccordionProps = {
  title: string;
  children: ReactNode;
}

function SocialScheduleAccordion({ title, children }: SocialScheduleAccordionProps) {
	return (
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
									<LiaToggleOnSolid style={{ fontSize: '24px' }} />
								</Text>
							) : (
								<Text color="gray.600">
									<LiaToggleOffSolid style={{ fontSize: '24px' }} />
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
	);
}

export default SocialScheduleAccordion;
