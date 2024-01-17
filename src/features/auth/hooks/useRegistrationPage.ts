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

export default function UseRegistrationPage() {
  const [phone, setPhone] = useState("");
  const toast = useToast();
  const router = useRouter();

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
        onCompleted: () => {
          router.push(appRouteLinks.confirmEmail);
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

  return { formik, setPhone, phone, loading, loadingGroups, groups } as const;
}
