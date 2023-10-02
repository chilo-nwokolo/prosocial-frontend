import { useFormik } from 'formik';
import { calculateMinDateOfBirth } from '@/utils/helpers';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { appRouteLinks, formFeedback } from '@/utils/constants';
import { REGISTER_USER } from '../gql';
import { useRouter } from 'next/navigation';

export default function UseRegistrationPage() {
	const [profileImage, setProfileImage] = useState<File | null>(null);
	const [phone, setPhone] = useState('');
	const toast = useToast();
  const router = useRouter();

	const [register, { loading }] = useMutation(REGISTER_USER);

	const validationSchema = yup.object({
		dob: yup.date().min(calculateMinDateOfBirth()).required(formFeedback.required),
		email: yup.string().email(formFeedback.invalidEmail).required(formFeedback.required),
		password: yup.string().min(8, formFeedback.minPassword).required(formFeedback.required),
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
            title: "Registration failed",
            description: error.message,
          })
        }
			});
		},
		validationSchema,
	});

	return { formik, profileImage, setProfileImage, setPhone, phone, loading } as const;
}
