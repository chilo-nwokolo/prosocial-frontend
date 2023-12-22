import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { adminRoutes, formFeedback } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { setCookie } from "@/libs/cookies";
import { apolloErrorHandler } from "@/utils/helpers";
import { LOGIN_USER } from "@/features/auth/gql";

export default function useAdminLoginPage() {
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN_USER);
  const toast = useToast();

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
      login({
        variables: {
          email,
          password,
        },
        onCompleted: (data) => {
          if (data.login.user?.user_type === "admin") {
            router.push(adminRoutes.users);
            setCookie("accessToken", data.login.token);
            setCookie("userType", data.login.user?.user_type || "");
            return;
          } else {
            toast({
              status: "error",
              title: "Wrong user credentials",
            });
          }
        },
        onError: (error) => {
          toast({
            status: "error",
            title: apolloErrorHandler(error),
          });
        },
      });
    },
    validationSchema,
  });

  return { formik, loading } as const;
}
