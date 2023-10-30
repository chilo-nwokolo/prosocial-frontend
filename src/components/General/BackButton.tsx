'use client';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { BiArrowBack } from 'react-icons/bi';

type Props = {
	text?: string;
};

export default function BackButton({ text }: Props) {
	const router = useRouter();
	return (
		<Box>
			<Button variant="ghost" onClick={() => router.back()}>
				<Flex alignItems="center" gap="2">
					<BiArrowBack className="fs-2" />
					{text ? <Text>{text}</Text> : null}
				</Flex>
			</Button>
		</Box>
	);
}
