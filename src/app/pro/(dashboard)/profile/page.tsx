"use client";

import { Button, Flex, Text } from "@chakra-ui/react";
import QueryContainer from "@/components/General/QueryContainer";
import EditableFormInput from "@/components/General/EditableFormInput";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";
import useProfilePage from "@/features/dashboard/hooks/useProfilePage";
import { useRouter } from "next/navigation";
import { appRouteLinks } from "@/utils/constants";

export default function ProfilePage() {
  const router = useRouter();
  const { formik, loading, error, updating, profileImage } = useProfilePage();

  return (
    <QueryContainer loading={loading} error={error}>
      <Flex flexDir="column" p="5">
        <Text textAlign="center" fontSize="lg" fontWeight="medium">
          Profile Photo
        </Text>
        <ProfilePictureUploader currentImage={profileImage} />
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="column" gap="5" mb="10">
            <EditableFormInput
              inputType="text"
              labelTitle="Phone Number"
              name="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              reset={formik.resetForm}
            />
            <EditableFormInput
              inputType="text"
              labelTitle="Email Address"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              reset={formik.resetForm}
              isEditable={false}
            />
            <EditableFormInput
              inputType="password"
              labelTitle="Password"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              reset={formik.resetForm}
            />
            <Button type="submit" loadingText="Saving" isLoading={updating}>
              Save
            </Button>
            <Button onClick={() => router.push(appRouteLinks.home)}>
              Go Home
            </Button>
          </Flex>
        </form>
      </Flex>
    </QueryContainer>
  );
}
