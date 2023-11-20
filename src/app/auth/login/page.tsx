'use client';

import { Box, Button, Center, Flex, Text } from '@chakra-ui/react';
import { ImageLinks, appRouteLinks } from '@/utils/constants';
import Image from 'next/image';
import FormInput from '@/components/General/FormInput';
import useLoginPage from '@/features/auth/hooks/useLoginPage';
import Link from 'next/link';

export default function LoginPage() {
	const { formik, loading } = useLoginPage();

	return (
		<Center h="90vh">
			<Box my="auto">
				<Image src={ImageLinks.logo} width={75} height={75} alt="app logo" />
				<Text my="4" as="h1" color="primary.200" fontSize="2xl" fontWeight="medium">
					Welcome to ProSocial
				</Text>
				<Text fontSize="lg" mb="10">
					Enter your details to start interacting with your friends
				</Text>
				<form onSubmit={formik.handleSubmit}>
					<Flex flexDir="column" gap="4">
						{/* Email */}
						<FormInput
							inputType="email"
							labelTitle="Email Address"
							name="email"
							onBlur={formik.handleBlur}
							onChange={formik.handleChange}
							value={formik.values.email}
							error={formik.errors.email}
						/>
						{/* Password */}
						<Flex flexDir="column" mb="2">
							<FormInput
								inputType="password"
								labelTitle="Password"
								name="password"
								autoComplete="current-password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.password}
								error={formik.errors.password}
							/>
							<Link href={appRouteLinks.changePassword}>
								<Text
									fontSize="sm"
									color="blue.400"
									textAlign="right"
									cursor="pointer"
									_hover={{ textDecor: 'none' }}
									textDecor="underline"
								>
									I forgot my password
								</Text>
							</Link>
						</Flex>
						<Button
							w="full"
							type="submit"
							isLoading={loading}
							loadingText="Logging you in"
						>
							Login
						</Button>
					</Flex>
				</form>
				<Flex mt="5" fontSize="sm" alignItems="center">
					Don&apos;t have an account? &nbsp;{' '}
					<Link href={appRouteLinks.register}>
						<Text
							fontSize="sm"
							color="blue.400"
							cursor="pointer"
							_hover={{ textDecor: 'none' }}
							textDecor="underline"
						>
							Create your account
						</Text>
					</Link>
				</Flex>
			</Box>
		</Center>
	);
}
