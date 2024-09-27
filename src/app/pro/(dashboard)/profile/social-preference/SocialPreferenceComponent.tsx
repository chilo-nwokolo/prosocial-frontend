"use client";
import {
  Box,
  Button,
  Flex,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// import ScheduleDaysBox from "@/features/intro/components/ScheduleDaysBox";
import useSocialSchedule from "@/features/dashboard/hooks/useSocialSchedule";
import BackButton from "@/components/General/BackButton";
import { FaInfoCircle } from "react-icons/fa";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";
import { useSearchParams } from "next/navigation";
import AppModal from "@/components/AppModal";
import QueryContainer from "@/components/General/QueryContainer";
import { configExtras } from "@/utils/constants";
import { useConfig } from "@/store";

export default function SocialPreferenceComponent() {
  const {
    loading,
    submitSocialSchedule,
    // toggleAccordion,
    loadingSchedules,
    error,
  } = useSocialSchedule();
  const searchParams = useSearchParams();
  const newUser = searchParams.get("newUser");
  const [config] = useConfig((state) => [state.config]);
  const toast = useToast();

  const onSave = () => {
    if (newUser) {
      if (!config?.[configExtras.user_has_uploaded_profile_picture]) {
        toast({
          status: "error",
          title: "Please, upload a profile picture",
        });
        return;
      }
    }
    submitSocialSchedule();
  };

  const {
    isOpen: isDpInfo,
    onClose: onCloseDpInfo,
    onOpen: onOpenDpInfo,
  } = useDisclosure();

  return (
    <QueryContainer loading={loadingSchedules} error={error}>
      <Box>
        <BackButton />
        {/* <Text fontSize="2xl" fontWeight="bold" mt="3">
          Weekly Availability
        </Text>
        <Accordion allowMultiple mt="5">
          <ScheduleDaysBox source="weekday" toggleAccordion={toggleAccordion} />
          <ScheduleDaysBox source="weekend" toggleAccordion={toggleAccordion} />
        </Accordion> */}
        {newUser ? (
          <>
            {/* Profile Photo */}
            <Flex flexDirection="column" mt="10">
              <Text fontWeight="medium">Upload your profile photo</Text>
              <Box my="3">
                <Tooltip
                  label="Your profile photo is not public. It will be seen by potential friends once an outing has been completed. The only 
								members who can see your photo are perpetually members in your ProSocial circle and friends who have linked with your account"
                  placement="bottom"
                  fontSize="xs"
                >
                  <Flex
                    alignItems="center"
                    gap="1"
                    fontSize="xs"
                    cursor="default"
                    onClick={onOpenDpInfo}
                  >
                    <FaInfoCircle color="#226db4" />Why do I need a profile picture?
                  </Flex>
                </Tooltip>
              </Box>
              <ProfilePictureUploader />
            </Flex>
          </>
        ) : null}

        <Flex mt="5" w="full">
          <Button w="full" isLoading={loading} onClick={onSave}>
            Save
          </Button>
        </Flex>
      </Box>
      <AppModal
        title=""
        description="Your profile photo is not public. It will be seen by potential friends once an outing has been completed. The only 
				members who can see your photo are perpetually members in your ProSocial circle and friends who have linked with your account"
        isOpen={isDpInfo}
        onClose={onCloseDpInfo}
      />
    </QueryContainer>
  );
}
