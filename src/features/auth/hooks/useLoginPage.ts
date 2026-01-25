import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import {
  AccessToken,
  appRouteLinks,
  formFeedback,
  storeKeys,
} from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { useUserStore } from "@/store";
import { deleteCookie, getCookie, setCookie } from "@/libs/cookies";
import localStorageService from "@/service/localStorage";

export default function useLoginPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [updateUser] = useUserStore((state) => [state.updateUser]);

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

        localStorage.removeItem(storeKeys.USER_STORE);
        localStorage.removeItem(storeKeys.QUESTIONS_STORE);

        // Format data to match the expected structure
        updateUser({
          login: {
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

        router.push(appRouteLinks.onbording);
        setCookie("accessToken", data.token);
        setLoading(false);
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
