"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { appRouteLinks, configExtras, formFeedback } from "@/utils/constants";
import { QUERY_UNIVERSITY_GROUPS, REGISTER_USER } from "../gql";
import { useRouter } from "next/navigation";
import { apolloErrorHandler } from "@/utils/helpers";
import { setCookie } from "@/libs/cookies";
import { useUserStore } from "@/store";
import useUploadProfilePicture from "@/features/dashboard/home/growth/hooks/useUploadProfilePicture";

export default function UseRegistrationPage() {
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [acceptTc, setAcceptTc] = useState(false);
  const [updateUser, avatar] = useUserStore((state) => [
    state.updateUser,
    state.avatar,
  ]);

  useEffect(() => {
    setCookie(configExtras.user_visited_intro_page, "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: groups, loading: loadingGroups } = useQuery(
    QUERY_UNIVERSITY_GROUPS,
    {
      onError: (error) => {
        toast({
          title: apolloErrorHandler(error),
          status: "error",
        });
      },
    },
  );

  const [register, { loading }] = useMutation(REGISTER_USER);
  const {
    upload,
    loading: isUploadingProfilePic,
    error,
  } = useUploadProfilePicture();
  const validationSchema = yup.object({
    dob: yup.date().required(formFeedback.required),
    email: yup
      .string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required),
    password: yup
      .string()
      .required(formFeedback.required)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
        formFeedback.passwordRequirement,
      ),
    firstName: yup.string().required(formFeedback.required),
    lastName: yup.string().required(formFeedback.required),
    universityId: yup.string().required(formFeedback.required),
  });

  const formik = useFormik({
    initialValues: {
      dob: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      universityId: "",
    },
    onSubmit: (values) => {
      if (!avatar) {
        toast({
          description: "Please, upload a profile picture",
          status: "error",
        });
        return;
      }
      if (!acceptTc) {
        toast({
          description:
            "Please, accept the Terms and Conditions before signing up",
          status: "error",
        });
        return;
      }
      const { dob, email, password, firstName, lastName, universityId } =
        values;
      if (!phone) {
        toast({
          description: "Invalid phone number",
          status: "error",
        });
        return;
      }

      register({
        variables: {
          input: {
            phone,
            dob,
            email,
            name: `${firstName} ${lastName}`,
            password,
            university_id: universityId,
          },
        },
        onCompleted: async (data) => {
          updateUser(data);
          setCookie("accessToken", data.register.token);
          await upload({
            variables: {
              input: {
                profile: {
                  avatar,
                },
              },
            },
          });
          if (error) {
            toast({
              title: "Picture upload failed. Please try again",
              status: "error",
            });
            return;
          }
          if (!isUploadingProfilePic) {
            router.push(appRouteLinks.onbording);
          }
        },
        onError: (error) => {
          toast({
            title: "Registration failed",
            description: apolloErrorHandler(error),
          });
        },
      });
    },
    validationSchema,
  });

  return {
    formik,
    setPhone,
    phone,
    loading,
    isUploadingProfilePic,
    loadingGroups,
    groups,
    setAcceptTc,
  } as const;
}
