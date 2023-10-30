import { UPDATE_USER_INFO } from '@/features/dashboard/profile/gql/queries';
import { useMutation } from '@apollo/client';
import {
	Box,
	Button,
	Flex,
	FormLabel,
	Image,
	Input,
	Spinner,
	Tooltip,
} from '@chakra-ui/react';
import { ChangeEvent, Dispatch, LegacyRef, SetStateAction, useRef } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';

type Props = {
	profileImage: File | string | null;
	setProfileImage: Dispatch<SetStateAction<File | string | null>>;
};

export default function ProfilePictureUploader({ profileImage, setProfileImage }: Props) {
	const imageUploadRef = useRef<LegacyRef<HTMLInputElement> | null>(null);
	const [upload, { loading }] = useMutation(UPDATE_USER_INFO, {
		onCompleted: (data) => {
			console.log(data);
		},
	});

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

	const onFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length && e.target.size < 5000) {
			const uploadedFile = e.target.files[0];
			setProfileImage(uploadedFile);
			upload({
				variables: {
					input: {
						profile: {
							avatar: uploadedFile,
						}
					}
				}
			})
		}
	}

	return (
		<Flex justifyContent="center" alignItems="center" flexDir="column" w="full" mt="10">
			{profileImage ? (
				<>
					{loading ? (
						<Flex
							alignItems="center"
							justifyContent="center"
							position="absolute"
							h="150px"
							w="150px"
							bg="gray"
							opacity="0.4"
							rounded="full"
							zIndex="banner"
							mt="-10"
						>
							<Spinner
								thickness="4px"
								speed="0.65s"
								emptyColor="white"
								color="blue.900"
								size="xl"
							/>
						</Flex>
					) : (
						<></>
					)}
					<Box position="relative">
						<Image
							src={
								typeof profileImage === 'string'
									? profileImage
									: URL.createObjectURL(profileImage)
							}
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
				onChange={onFileUpload}
			/>
		</Flex>
	);
}
