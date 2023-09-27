'use client';

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import TelInput from 'react-phone-number-input/input';
import { AiFillInfoCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import Link from 'next/link';
import { appRouteLinks } from '@/utils/constants';

export default function RegistrationPage() {
	const [value, setValue] = useState('');
	return (
		<Box mt="5">
			<Text mb="4" as="h1" fontSize="2xl" fontWeight="medium">
				Let&apos;s create your account
			</Text>
			<form>
				<Flex flexDir="column" gap="4">
					{/* Phone Number */}
					<FormControl>
						<FormLabel>Phone Number</FormLabel>
						<TelInput
							country="US"
							international
							className="telInput"
							withCountryCallingCode
							value={value}
							// @ts-ignore
							onChange={setValue}
						/>
						<FormHelperText fontSize="xs">
							<Tooltip
								label="We need your phone number for push notifications and account recovery purposes"
								placement="bottom"
								fontSize="xs"
							>
								<Flex alignItems="center" gap="1" fontSize="xs" cursor="default">
									<AiFillInfoCircle /> Why do you ask for my phone number?
								</Flex>
							</Tooltip>
						</FormHelperText>
					</FormControl>
					{/* Date of Birth */}
					<FormControl>
						<FormLabel>Date of birth</FormLabel>
						<Input type="date" />
						<FormHelperText>
							<Tooltip
								label="ProSocial requires your date of birth to verify you are 18 years or older. We also group our members with people at similar life stages, which often is reflected by age"
								placement="bottom"
								fontSize="xs"
							>
								<Flex alignItems="center" gap="1" fontSize="xs" cursor="default">
									<AiFillInfoCircle /> Why do you ask for my Date of birth?
								</Flex>
							</Tooltip>
						</FormHelperText>
					</FormControl>
					{/* Email */}
					<FormControl>
						<FormLabel>Email Address</FormLabel>
						<Input type="email" />
						<FormHelperText fontSize="xs">
							We&apos;ll never share your email.
						</FormHelperText>
					</FormControl>
					{/* Password */}
					<FormControl>
						<FormLabel>Password</FormLabel>
						<Input type="password" />
						<FormHelperText fontSize="xs">
							Password must contain at least 8 characters and a combination of uppercase
							letters, lowercase letters, numbers, and symbols.
						</FormHelperText>
					</FormControl>
					<FormControl>
						<Text fontWeight="medium">
							Profile Photo
						</Text>
            <FormHelperText>
							<Tooltip
								label="Your profile photo is not public. It will be seen by potential friends once an outing has been completed. The only 
                members who can see your photo are perpetually members in your ProSocial circle and friends who have linked with your account"
								placement="bottom"
								fontSize="xs"
							>
								<Flex alignItems="center" gap="1" fontSize="xs" cursor="default">
									<AiFillInfoCircle /> Why do I need a profile picture?
								</Flex>
							</Tooltip>
						</FormHelperText>
						<Flex justifyContent="center" alignItems="center" flexDir="column" w="full" mt="10">
							<FormLabel
                cursor="pointer"
								w="150px"
								h="150px"
								bg="gray.500"
                _hover={{ bg: "gray.700", shadow: "lg" }}
								border="1px solid"
								borderColor="gray.300"
								borderRadius="full"
								color="white"
                display="flex"
                justifyContent="center"
                alignItems="center"
							>
								<CgProfile style={{ fontSize: "80px" }} />
							</FormLabel>
							<Input visibility="hidden" type="file" accept=".png, .jpg, .jpeg" />
						</Flex>
					</FormControl>
          <Link href={appRouteLinks.intro}>
					  <Button w="full">Sign Up</Button>
          </Link>
				</Flex>
			</form>
		</Box>
	);
}
