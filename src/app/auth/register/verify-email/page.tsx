'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button, Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { VERIFY_EMAIL } from '@/features/auth/gql';
import { appRouteLinks } from '@/utils/constants';

export default function EmailVerificationPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const accessToken = searchParams.get('access_token');
	const toast = useToast();

	const [verify, { loading, error }] = useMutation(VERIFY_EMAIL, {
		onCompleted: () => {
			toast({
				title: 'Email verified successfully',
				status: 'success',
			});
			router.push(appRouteLinks.login);
		},
	});

	if (error) {
		toast({
			id: 'failedToast',
			status: 'error',
			description: 'Invalid token',
			title: 'Unable to verify your email address',
		});
	}

	useEffect(() => {
		toast.close('errorToast');
		if (accessToken) {
			verify({ variables: { access_token: accessToken } });
		} else {
			toast({
				id: 'errorToast',
				status: 'error',
				description: 'Invalid URL',
				title:
					'Invalid token or the token is missing. Kindly try clicking on the link again.',
			});
			router.push(appRouteLinks.login);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return (
			<Center h="100vh">
				<Spinner size="xl" />
			</Center>
		);
	}

	return (
		<Center h="100vh">
			{error ? (
				<Flex flexDir="column" my="auto" gap="10">
					<Text as="h1" fontSize="2xl" fontWeight="medium">
						Sorry, Verification Failed.
					</Text>
					<Text>
						Send us an email, <a href="mailto:">info@prosocialapp.com</a> for assistance.
					</Text>
					<Link href={appRouteLinks.login}>
						<Button w="full">Go to Login</Button>
					</Link>
				</Flex>
			) : null}
		</Center>
	);
}
