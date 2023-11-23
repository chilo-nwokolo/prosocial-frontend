import { UPDATE_PROFILE_PICTURE } from '@/features/dashboard/profile/gql/queries';
import { client } from '@/service';
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
	useToast,
} from '@chakra-ui/react';
import { ChangeEvent, LegacyRef, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiEdit2 } from 'react-icons/fi';

type Props = {
	currentImage?: File | string | null;
};

export default function ProfilePictureUploader({ currentImage }: Props) {
	const imageUploadRef = useRef<LegacyRef<HTMLInputElement> | null>(null);
	const uploadedImage = useRef<File | null>(null);
	const [key, setKey] = useState(1);
	const toast = useToast();
	const [profileImage, setProfileImage] = useState<File | string | null | undefined>(
		currentImage,
	);

	const [upload, { loading }] = useMutation(UPDATE_PROFILE_PICTURE, {
		onCompleted: () => {
			setKey(key + 1);
			setProfileImage(uploadedImage.current);
			client.refetchQueries({
				include: ['ME'],
				updateCache(cache) {
					cache.evict({ fieldName: 'ME' });
				},
			});
		},
		onError: () => {
			toast({
				title: 'Picture upload failed. Please try again',
				status: 'error',
			});
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
		if (e.target.files && e.target.files?.[0]?.size > 2000000) {
			toast({
				title: 'The image you uploaded is too large.',
				status: 'error',
			});
			return;
		}
		if (e.target.files?.length) {
			const uploadedFile = e.target.files[0];
			uploadedImage.current = uploadedFile;
			upload({
				variables: {
					input: {
						profile: {
							avatar: uploadedFile,
						},
					},
				},
			});
		}
	};

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
							key={key}
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
						key={key}
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
