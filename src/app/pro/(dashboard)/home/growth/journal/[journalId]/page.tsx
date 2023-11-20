'use client';
import {
	Box,
	Button,
	Flex,
	SimpleGrid,
	Text,
	Textarea,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import BackButton from '@/components/General/BackButton';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useMutation } from '@apollo/client';
import { CREATE_JOURNAL_ENTRY } from '@/features/dashboard/home/growth/queries';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { appRouteLinks } from '@/utils/constants';
import AppModal from '@/components/AppModal';

const titles = [
	'',
	'What is your happiest memory from childhood?',
	'What is your greatest personal achievement',
	'What is the hardest lesson you have learned in life',
	'Can you describe your most valued relationship',
];

export default function ViewJournalPage({
	params: { journalId },
}: {
	params: { journalId: number };
}) {
	const toast = useToast();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [mutate, { loading }] = useMutation(CREATE_JOURNAL_ENTRY, {
		onCompleted: () => {
			toast({
				status: 'success',
				title: 'Your entry was saved successfully.',
			});
			router.push(appRouteLinks.growthJournal);
		},
	});

	const formik = useFormik({
		initialValues: {
			input: '',
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					input: values.input,
					journal_category_id: journalId.toString(),
				},
			});
		},
		validationSchema: Yup.object({
			input: Yup.string().required(),
		}),
	});

	return (
		<Flex flexDir="column">
			<Flex justifyContent="space-between" alignItems="center">
				<BackButton destination={appRouteLinks.growthJournal} />
				<Button
					variant="outline"
					leftIcon={<RiDeleteBin6Line />}
					textTransform="capitalize"
					onClick={onOpen}
					isDisabled={!formik.values.input}
				>
					Clear Entry
				</Button>
			</Flex>
			<Text fontSize="lg" mt="4" fontWeight="medium">
				Journal {journalId}
			</Text>
			<form onSubmit={formik.handleSubmit}>
				<Text mt="2">{titles[journalId]}</Text>
				<Textarea
					name="input"
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.input}
					mt="4"
					size="lg"
					rows={25}
				></Textarea>
				<Box mt="6" w="full">
					<Button isLoading={loading} w="full" type="submit">
						Save
					</Button>
				</Box>
			</form>
			<AppModal
				title="Are you sure?"
				description="This action cannot be reversed."
				isOpen={isOpen}
				onClose={onClose}
				actionButtons={
					<SimpleGrid columns={2} gap="3">
						<Button onClick={onClose} variant="secondary">
							No
						</Button>
						<Button
							onClick={() => {
								formik.handleReset;
								onClose();
							}}
						>
							Yes
						</Button>
					</SimpleGrid>
				}
			/>
		</Flex>
	);
}
