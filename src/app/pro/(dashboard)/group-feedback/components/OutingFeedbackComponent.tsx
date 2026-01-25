"use client";
import { Box, Button, Center, Flex, Text, useToast } from "@chakra-ui/react";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import FormInput from "@/components/General/FormInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { GroupUser, useGlobalStore } from "@/store";
import { useEffect, useState } from "react";
import localStorageService from "@/service/localStorage";

const field = {
  labelTitle: "Pick a date",
  tooltip: "",
  inputType: "date",
  name: "date",
  infoText: "",
};

export default function OutingFeedbackComponent() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [
    setOutingDate,
    setUserData,
    userData,
    updateGroupData,
    setOutingGroupMembers,
  ] = useGlobalStore((state) => [
    state.setOutingDate,
    state.setUserData,
    state.userData,
    state.updateGroupData,
    state.setOutingGroupMembers,
  ]);

  const params = useSearchParams();

  useEffect(() => {
    let groupId: string = "";
    const userId = params.get("userId");
    groupId = params.get("amp;groupId") || "";
    if (!groupId) {
      groupId = params.get("groupId") || "";
    }
    if (userId && groupId) {
      setUserData({ userId, groupId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const validationSchema = yup.object({
    date: yup.date().required(formFeedback.chooseValidOutingDate),
  });

  const getUserGroup = () => {
    setLoading(true);

    if (userData?.groupId && userData?.userId) {
      const group = localStorageService.pullUserGroupParticipants(
        userData.userId,
        userData.groupId,
      );

      if (group) {
        updateGroupData(group as any);

        const result = [] as GroupUser[];

        group.users?.forEach((user) => {
          if (user.unique_id !== userData?.userId) {
            result.push(user as GroupUser);
          }
        });

        setOutingGroupMembers(result);
        router.push(appRouteLinks.outingFeedbackCards);
      } else {
        toast({
          title: "Group not found",
          status: "error",
        });
      }
    } else {
      toast({
        title: "Sorry, this link is invalid",
        status: "error",
      });
    }

    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    onSubmit: (data) => {
      setOutingDate(data.date);
      getUserGroup();
    },
    validationSchema,
  });

  return (
    <Center h="90vh">
      <form className="w-100" onSubmit={formik.handleSubmit}>
        <Box my="auto" w="full">
          <Text fontSize="24px" fontWeight="600" mb="5">
            Outing Feedback
          </Text>
          <Text mb="3">When did you meet for your outing?</Text>
          <FormInput
            labelTitle={field.labelTitle}
            tooltip={field.tooltip}
            inputType={field.inputType}
            name={field.name}
            infoText={field.infoText}
            value={formik.values[field.name as keyof typeof formik.values]}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors[field.name as keyof typeof formik.values]}
          />
          <Flex flexDir="column" gap="4" mt="10">
            <Button type="submit" w="full" isLoading={loading}>
              Save
            </Button>
          </Flex>
        </Box>
      </form>
    </Center>
  );
}
