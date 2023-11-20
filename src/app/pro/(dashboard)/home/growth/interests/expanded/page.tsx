'use client';
import BackButton from '@/components/General/BackButton';
import { SUBMIT_USER_INTERESTS } from '@/features/dashboard/home/growth/queries';
import { useAppQuestions } from '@/store';
import { appRouteLinks } from '@/utils/constants';
import { useMutation } from '@apollo/client';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GrClose } from 'react-icons/gr';

export default function InterestedExtendedPage() {
  const router = useRouter();
	const [interestsAnswer] = useAppQuestions((state) => [state.interestsAnswer]);
	const toast = useToast();
	const [proceed, setProceed] = useState(false);

	const ref = useRef(true);

	const [mutate] = useMutation(SUBMIT_USER_INTERESTS, {
		variables: {
			input: {
				inputs: interestsAnswer,
			}
		},
		onError: () => {
			toast({
				status: "error",
				title: "Unable to save interests. Please click the close button above to try again",
			})
		},
		onCompleted: () => {
			setProceed(true);
		}
	});

	useEffect(() => {
		if (ref.current) {
			mutate();
		}
		return () => {
			ref.current = false;
		}
	}, [mutate])

	return (
		<Flex flexDir="column">
			<Flex justifyContent="flex-end">
				<BackButton icon={<GrClose />} destination={appRouteLinks.growthInterests} />
			</Flex>
			<Flex h="80vh" gap="5" flexDir="column" justifyContent="center">
				<Text fontWeight="lg" fontSize="2xl">Expanded interests</Text>
				<Text>
					Now we want to learn more about your specific interests. Select all the
					interests that you enjoy and we&apos;ll use this information to refine your social
					matches.
				</Text>
        <Button isDisabled={!proceed} onClick={() => {router.push(appRouteLinks.interestsExpanedMore)}}>Begin</Button>
			</Flex>
		</Flex>
	);
}
