import { useState } from 'react';
import { useFormik } from 'formik';
import { useQuery, useMutation } from '@apollo/client';
import { useUser } from '@/store';
import { UPDATE_USER_INFO, ME_QUERY } from '@/features/dashboard/profile/gql/queries';

export default function useProfilePage() {
	const [setUserProfile] = useUser((state) => [state.setUserProfile]);
	const { loading, error } = useQuery(ME_QUERY, {
		onCompleted: (data) => {
			setUserProfile(data);
		},
	});

	const [userProfile] = useUser((state) => [state.userProfile]);
	const [profileImage, setProfileImage] = useState<File | null | string>(
		userProfile?.me?.profile?.avatar || null,
	);

	const [submit, { loading: updating }] = useMutation(UPDATE_USER_INFO, {
		onCompleted: (data) => {
			console.log(data);
		},
		refetchQueries: ["ME"],
	});

	const password = 'password';

	const formik = useFormik({
		initialValues: {
			phone: userProfile?.me?.phone || '+123223233',
			email: userProfile?.me?.email || 'sample@mail.com',
			password,
		},
		onSubmit: (values) => {
			const formData: Partial<typeof values> = {};
			if (values.email !== userProfile?.me?.email) {
				formData.email = values.email;
			}
			if (values.phone !== userProfile?.me?.phone) {
				formData.phone = values.phone;
			}
			if (values.password !== password) {
				formData.password = values.password;
			}
      if (!Object.values(formData).length) return;
			submit({
        variables: {
          input: formData,
        }
      })
		},
	});

	return {
		formik,
		loading,
		error,
		submit,
		updating,
		profileImage,
		setProfileImage,
	} as const;
}
