"use client";
import EditableFormInput from "@/components/General/EditableFormInput";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";
import { UPDATE_USER_INFO } from "@/features/dashboard/profile/gql/queries";
import { useUserStore } from "@/store";
import { useMutation } from "@apollo/client";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";

export default function ProfilePageId() {
  const [userProfile] = useUserStore((state) => [state.userProfile]);
  const toast = useToast();

  // eslint-disable-next-line no-unused-vars
  const [submit, { loading }] = useMutation(UPDATE_USER_INFO, {
    onCompleted: () => {
      toast({
        status: "success",
        title: "Update successful",
      });
    },
    refetchQueries: [`${userProfile?.me?.__typename}:${userProfile?.me?.id}`],
  });

  const password = "password";

  const formik = useFormik({
    initialValues: {
      phone: userProfile?.me?.phone || "+123223233",
      email: userProfile?.me?.email || "sample@mail.com",
      password,
    },
    onSubmit: (values) => {
      const formData: Partial<typeof values> = {};
      if (values.email !== userProfile?.me?.email) {
        formData.email = values.email;
      }
      if (values.phone !== userProfile?.me?.phone) {
        formData.phone = values.phone;
      }
      if (values.password !== password) {
        formData.password = values.password;
      }
    },
  });

  return (
    <Flex flexDir="column" p="5">
      <Text textAlign="center" fontSize="lg" fontWeight="medium">
        Profile Photo
      </Text>
      <ProfilePictureUploader />
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
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Flex>
  );
}
