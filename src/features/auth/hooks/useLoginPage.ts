import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { LOGIN_USER } from '../gql';
import { appRouteLinks, formFeedback } from '@/utils/constants';
import { useToast } from '@chakra-ui/react';
import { useUser } from '@/store';
import { setCookie } from '@/libs/cookies';
import { apolloErrorHandler } from '@/utils/helpers';


export default function useLoginPage() {
	const router = useRouter();
	const [login, { loading }] = useMutation(LOGIN_USER);
	const toast = useToast();
	const [updateUser] = useUser((state) => [state.updateUser])

	const validationSchema = yup.object({
		email: yup.string().email(formFeedback.invalidEmail).required(formFeedback.required),
		password: yup.string().required(formFeedback.required),
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: ({ email, password }) => {
			login({
				variables: {
					email,
					password,
				},
				onCompleted: (data) => {
					updateUser(data);
					router.push(appRouteLinks.onbording);
					setCookie("accessToken", data.login.token);
				},
				onError: (error) => {
					toast({
						status: 'error',
						title: apolloErrorHandler(error),
					});
				},
			});
		},
		validationSchema,
	});

	return { formik, loading } as const;
}
