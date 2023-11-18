'use client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { appRouteLinks, formFeedback } from '@/utils/constants';
import { REGISTER_USER } from '../gql';
import { useRouter } from 'next/navigation';
import { apolloErrorHandler } from '@/utils/helpers';
import { useConfig } from '@/store';

export default function UseRegistrationPage() {
	const [phone, setPhone] = useState('');
	const toast = useToast();
	const router = useRouter();

	const [updateConfig] = useConfig((state) => [state.updateConfig]);

	useEffect(() => {
		updateConfig({ user_visited_intro_page: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [register, { loading }] = useMutation(REGISTER_USER);

	const validationSchema = yup.object({
		dob: yup.date().required(formFeedback.required),
		email: yup.string().email(formFeedback.invalidEmail).required(formFeedback.required),
		password: yup
			.string()
			.required(formFeedback.required)
			.matches(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
				formFeedback.passwordRequirement,
			),
		firstName: yup.string().required(formFeedback.required),
		lastName: yup.string().required(formFeedback.required),
	});

	const formik = useFormik({
		initialValues: {
			dob: '',
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		},
		onSubmit: (values) => {
			const { dob, email, password, firstName, lastName } = values;
			if (!phone) {
				toast({
					description: 'Phone number invalid',
					status: 'error',
				});
				return;
			}
			register({
				variables: {
					input: {
						phone,
						dob,
						email,
						name: `${firstName} ${lastName}`,
						password,
					},
				},
				onCompleted: () => {
					router.push(appRouteLinks.confirmEmail);
				},
				onError: (error) => {
					toast({
						title: 'Registration failed',
						description: apolloErrorHandler(error),
					});
				},
			});
		},
		validationSchema,
	});

	return { formik, setPhone, phone, loading } as const;
}
