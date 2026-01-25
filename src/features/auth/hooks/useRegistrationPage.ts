"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { appRouteLinks, configExtras, formFeedback } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { setCookie } from "@/libs/cookies";
import { useUserStore } from "@/store";
import localStorageService from "@/service/localStorage";

export default function UseRegistrationPage() {
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [acceptTc, setAcceptTc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [groups, setGroups] = useState<{
    universities: { id: string; name: string }[];
  } | null>(null);
  const [updateUser, avatar] = useUserStore((state) => [
    state.updateUser,
    state.avatar,
  ]);

  useEffect(() => {
    setCookie(configExtras.user_visited_intro_page, "true");

    // Load universities from localStorage
    const universities = localStorageService.getUniversities();
    setGroups({ universities });
    setLoadingGroups(false);
  }, []);

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
    onSubmit: async (values) => {
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

      setLoading(true);

      try {
        const data = localStorageService.register({
          phone,
          dob,
          email,
          name: `${firstName} ${lastName}`,
          password,
          university_id: universityId,
        });

        // Format data to match the expected structure
        updateUser({
          register: {
            token: data.token,
            user: {
              id: data.user.id,
              name: data.user.name,
              phone: data.user.phone,
              email: data.user.email,
              user_type: data.user.user_type,
              groups: data.user.groups.map((g) => ({
                id: g.id,
                name: g.name,
                users: g.users.map((u) => ({ id: u.id, name: u.name })),
              })),
            },
          },
        });

        setCookie("accessToken", data.token);

        // Handle profile picture upload - convert to base64 and store
        if (avatar) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            localStorageService.updateProfilePicture(base64String);
          };
          reader.readAsDataURL(avatar);
        }

        // Email verification is skipped - user is automatically verified
        toast({
          title: "Registration successful!",
          status: "success",
        });

        router.push(appRouteLinks.onbording);
        setLoading(false);
      } catch (error: any) {
        toast({
          title: "Registration failed",
          description: error.message || "An error occurred",
          status: "error",
        });
        setLoading(false);
      }
    },
    validationSchema,
  });

  return {
    formik,
    setPhone,
    phone,
    loading,
    isUploadingProfilePic: false,
    loadingGroups,
    groups,
    setAcceptTc,
  } as const;
}
