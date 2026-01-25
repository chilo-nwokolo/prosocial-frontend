import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import {
  AccessToken,
  adminRoutes,
  formFeedback,
  userType,
} from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { deleteCookie, getCookie, setCookie } from "@/libs/cookies";
import localStorageService from "@/service/localStorage";

export default function useAdminLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email(formFeedback.invalidEmail)
      .required(formFeedback.required),
    password: yup.string().required(formFeedback.required),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      setLoading(true);

      if (getCookie(AccessToken)) {
        deleteCookie(AccessToken);
      }

      try {
        const data = localStorageService.login(email, password);

        if (data.user.user_type === "admin") {
          router.push(adminRoutes.users);
          setCookie(AccessToken, data.token);
          setCookie(userType, data.user.user_type || "");
          setLoading(false);
          return;
        } else {
          toast({
            status: "error",
            title: "Wrong user credentials",
          });
          setLoading(false);
        }
      } catch (error: any) {
        toast({
          status: "error",
          title: error.message || "Login failed",
        });
        setLoading(false);
      }
    },
    validationSchema,
  });

  return { formik, loading } as const;
}
