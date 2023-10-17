'use client';

import { Box, Button, Center, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { ImageLinks, appRouteLinks, formFeedback } from '@/utils/constants';
import Image from 'next/image';
import FormInput from '@/components/General/FormInput';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD } from '@/features/auth/gql';
import { apolloErrorHandler } from '@/utils/helpers';
import AppModal from '@/components/AppModal';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const toast = useToast();
  const validationSchema = yup.object({
		newPassword: yup.string().required(formFeedback.required),
		confirmPassword: yup.string().required(formFeedback.required),
	});
	const { onOpen, onClose, isOpen } = useDisclosure();

  const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const router = useRouter();

  const [submit, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
			onOpen();
		},
		onError: (error) => {
			toast({
				status: 'error',
				title: apolloErrorHandler(error),
			});
		},
  })

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: ""
    },
    onSubmit: (values) => {
      if (values.confirmPassword !== values.newPassword) {
        toast({
          status: 'error',
          title: "Passwords don't match"
        })
        return;
      }
      if (!token) {
        toast({
          status: 'error',
          title: "Invalid password reset URL."
        })
        return;
      }
      submit({
        variables: {
          token,
          new_password: values.newPassword,
        }
      })
    },
    validationSchema,
  })

	return (
    <>
      <Center h="90vh">
        <Box my="auto">
          <Image src={ImageLinks.logo} width={75} height={75} alt="app logo" />
          <Text my="4" as="h1" fontSize="2xl" fontWeight="medium">
            Reset Password
          </Text>
          <Text fontSize="lg" mb="10">
            Enter your new password. Make sure it&apos;s secure
          </Text>
          <form onSubmit={formik.handleSubmit}>
            <Flex flexDir="column" gap="4">
              {/* New Password */}
              <Flex flexDir="column" mb="2">
                <FormInput
                  inputType="password"
                  labelTitle="Enter new password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  error={formik.errors.newPassword}
                />
              </Flex>
              {/* New Password */}
              <Flex flexDir="column" mb="2">
                <FormInput
                  inputType="password"
                  labelTitle="Confirm your new password"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={formik.errors.confirmPassword}
                />
              </Flex>
              <Button
                w="full"
                type="submit"
                isLoading={loading}
                loadingText="Resetting"
              >
                Reset
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
      <AppModal
				title="Password Reset Successful"
				description="You can now log into your account using your new password"
				onClose={onClose}
				isOpen={isOpen}
				actionButtons={
					<Button
						onClick={() => {
							onClose();
							router.push(appRouteLinks.login);
						}}
					>
						Close
					</Button>
				}
			/>
    </>
	);
}
