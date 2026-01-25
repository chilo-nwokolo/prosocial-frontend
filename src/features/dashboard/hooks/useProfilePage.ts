import { useFormik } from "formik";
import { useUserStore } from "@/store";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

export default function useProfilePage() {
  const [setUserProfile, userProfile] = useUserStore((state) => [
    state.setUserProfile,
    state.userProfile,
  ]);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const user = localStorageService.getCurrentUser();
    if (user) {
      const meData = {
        me: {
          __typename: "User" as const,
          id: user.id,
          unique_id: user.unique_id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          profile: {
            avatar: user.profile.avatar,
          },
          groups: user.groups.map((g) => ({
            id: g.id,
            name: g.name,
            created_at: g.created_at,
            users: g.users.map((u) => ({ id: u.id, name: u.name })),
          })),
        },
      };
      setData(meData);
      setUserProfile(meData);
    }
    setLoading(false);
  }, [setUserProfile]);

  const submit = async (variables: { input: any }) => {
    setUpdating(true);
    try {
      const updated = localStorageService.updateUser(variables.input);
      if (updated) {
        const meData = {
          me: {
            __typename: "User" as const,
            id: updated.id,
            unique_id: updated.unique_id,
            name: updated.name,
            email: updated.email,
            phone: updated.phone,
            profile: {
              avatar: updated.profile.avatar,
            },
            groups: updated.groups.map((g) => ({
              id: g.id,
              name: g.name,
              created_at: g.created_at,
              users: g.users.map((u) => ({ id: u.id, name: u.name })),
            })),
          },
        };
        setData(meData);
        setUserProfile(meData);
        toast({
          status: "success",
          title: "Update successful",
        });
      }
    } catch (err: any) {
      toast({
        status: "error",
        title: err.message || "Update failed",
      });
    }
    setUpdating(false);
  };

  const password = "password";

  const avatar = data?.me?.profile?.avatar;

  const formik = useFormik({
    initialValues: {
      phone: data?.me?.phone || "+123223233",
      email: data?.me?.email || "sample@mail.com",
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
      if (!Object.values(formData).length) return;
      submit({
        input: formData,
      });
    },
    enableReinitialize: true,
  });

  return {
    formik,
    loading,
    error,
    submit,
    updating,
    avatar,
  } as const;
}
