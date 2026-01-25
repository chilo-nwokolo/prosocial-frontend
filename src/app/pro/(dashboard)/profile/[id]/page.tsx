"use client";
import EditableFormInput from "@/components/General/EditableFormInput";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";
import { useUserStore } from "@/store";
import { Button, Flex, Text, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

export default function ProfilePageId() {
  const [userProfile] = useUserStore((state) => [state.userProfile]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const submit = async (formData: any) => {
    setLoading(true);
    try {
      localStorageService.updateUser(formData);
      toast({
        status: "success",
        title: "Update successful",
      });
    } catch (error: any) {
      toast({
        status: "error",
        title: error.message || "Update failed",
      });
    }
    setLoading(false);
  };

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
      if (Object.keys(formData).length > 0) {
        submit(formData);
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
          <Button type="submit" isLoading={loading}>
            Save
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
