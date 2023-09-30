import { Box, Button, Flex, FormLabel, Image, Input, Tooltip } from '@chakra-ui/react';
import { Dispatch, LegacyRef, SetStateAction, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';

type Props = {
	profileImage: File | null;
	setProfileImage: Dispatch<SetStateAction<File | null>>;
};

export default function ProfilePictureUploader({ profileImage, setProfileImage }: Props) {
	const imageUploadRef = useRef<LegacyRef<HTMLInputElement> | null>(null);

	const UploadProfilePictureButton = () => (
		<Tooltip label="Upload profile picture" aria-label="A tooltip">
			<Button
				position="absolute"
				top="0"
				right="5"
				borderRadius="full"
				p="0"
				color="blue.900"
				// @ts-ignore
				onClick={() => imageUploadRef.current.click()}
			>
				<FiEdit2 />
			</Button>
		</Tooltip>
	);

	return (
		<Flex justifyContent="center" alignItems="center" flexDir="column" w="full" mt="10">
			{profileImage ? (
				<>
					<Box position="relative">
						<Image
							src={URL.createObjectURL(profileImage)}
							alt="profile image"
							h="150px"
							w="150px"
							objectFit="cover"
							borderRadius="full"
						/>
						<UploadProfilePictureButton />
					</Box>
				</>
			) : (
				<>
					<FormLabel
						htmlFor="profilePhoto"
						cursor="pointer"
						w="150px"
						h="150px"
						bg="gray.500"
						_hover={{
							bg: 'gray.700',
							shadow: 'lg',
							outline: '2px solid red',
							outlineOffset: '10px',
							outlineStyle: 'dashed',
						}}
						border="1px solid"
						borderColor="gray.300"
						borderRadius="full"
						color="white"
						display="flex"
						justifyContent="center"
						alignItems="center"
						flexDir="column"
						position="relative"
					>
						<CgProfile style={{ fontSize: '80px' }} />
						<UploadProfilePictureButton />
					</FormLabel>
				</>
			)}
			<Input
				// @ts-ignore
				ref={imageUploadRef}
				id="profilePhoto"
				visibility="hidden"
				type="file"
				accept=".png, .jpg, .jpeg"
				onChange={(e) => {
					if (e.target.files?.length) {
						setProfileImage(e.target.files[0]);
					}
				}}
			/>
		</Flex>
	);
}
