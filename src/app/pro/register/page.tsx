'use client';

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Image,
	Input,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import TelInput from 'react-phone-number-input/input';
import { AiFillInfoCircle } from 'react-icons/ai';
import Link from 'next/link';
import { appRouteLinks } from '@/utils/constants';
import ProfilePictureUploader from '@/Components/General/ProfilePictureUploader';

export default function RegistrationPage() {
	const [value, setValue] = useState('');
	const [profileImage, setProfileImage] = useState<File | null>(null);

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
					{/* Profile Photo */}
					<FormControl>
						<Text fontWeight="medium">Upload your profile photo</Text>
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
						<ProfilePictureUploader setProfileImage={setProfileImage} profileImage={profileImage} />
					</FormControl>
					<Link href={appRouteLinks.confirmEmail}>
						<Button w="full">Sign Up</Button>
					</Link>
				</Flex>
			</form>
		</Box>
	);
}
