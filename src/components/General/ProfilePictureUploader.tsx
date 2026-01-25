import useAppConfig from "@/hooks/useAppConfig";
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
} from "@chakra-ui/react";
import { ChangeEvent, LegacyRef, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiEdit2 } from "react-icons/fi";
import imageCompression from "browser-image-compression";
import { configExtras } from "@/utils/constants";
import { useConfig, useUserStore } from "@/store";
import { usePathname } from "next/navigation";
import localStorageService from "@/service/localStorage";

type Props = {
  currentImage?: File | string | null;
};

export default function ProfilePictureUploader({ currentImage }: Props) {
  const imageUploadRef = useRef<LegacyRef<HTMLInputElement> | null>(null);
  const uploadedImage = useRef<File | null>(null);
  const [key, setKey] = useState(1);
  const toast = useToast();
  const [profileImage, setProfileImage] = useState<
    File | string | null | undefined
  >(currentImage);
  const [compressingImage, setCompressingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateConfig } = useAppConfig({});
  const [updateStoreConfig] = useConfig((state) => [state.updateConfig]);
  const [setAvatar] = useUserStore((state) => [state.setAvatar]);
  const pathname = usePathname();

  const upload = async (file: File) => {
    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();

      await new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorageService.updateProfilePicture(base64String);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setKey(key + 1);
      setProfileImage(file);
      updateConfig([
        { key: configExtras.user_has_uploaded_profile_picture, value: "true" },
      ]);
      updateStoreConfig({ user_has_uploaded_profile_picture: "true" });
      setCompressingImage(false);
    } catch (error) {
      toast({
        title: "Picture upload failed. Please try again",
        status: "error",
      });
      setCompressingImage(false);
    }
    setLoading(false);
  };

  const UploadProfilePictureButton = () => (
    <Tooltip label="Upload profile picture" aria-label="A tooltip">
      <Button
        position="absolute"
        top="0"
        right="5"
        borderRadius="full"
        p="0"
        color="white"
        backgroundColor="primary.100"
        _hover={{
          backgroundColor: "#f9432a",
        }}
        // @ts-ignore
        onClick={() => imageUploadRef.current.click()}
      >
        <FiEdit2 />
      </Button>
    </Tooltip>
  );

  const onFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    let uploadedFile = e.target.files![0];
    if (uploadedFile && uploadedFile?.size > 1000000) {
      setCompressingImage(true);
      const controller = new AbortController();
      const response = await imageCompression(uploadedFile, {
        maxSizeMB: 0.9,
        signal: controller.signal,
      });
      if (response) {
        uploadedFile = response;
      }
      if (!response) {
        toast({
          title: "Picture upload failed. Please try again",
          status: "error",
        });
        return;
      }
      setTimeout(() => {
        controller.abort(new Error("Image is taking too long"));
      }, 20000);
    }
    if (e.target.files?.length) {
      uploadedImage.current = uploadedFile;
      if (pathname === "/auth/register") {
        setAvatar(uploadedFile);
        setProfileImage(uploadedImage.current);
        setCompressingImage(false);
      } else {
        await upload(uploadedFile);
      }
    }
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      w="full"
      mt="10"
    >
      {loading || compressingImage ? (
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
      {profileImage ? (
        <>
          <Box position="relative">
            <Image
              src={
                typeof profileImage === "string"
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
              bg: "gray.700",
              shadow: "lg",
              outline: "2px solid red",
              outlineOffset: "10px",
              outlineStyle: "dashed",
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
            m={0}
          >
            <CgProfile style={{ fontSize: "80px" }} />
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
