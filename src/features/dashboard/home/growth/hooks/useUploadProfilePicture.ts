import useAppConfig from "@/hooks/useAppConfig";
import { useConfig } from "@/store";
import { configExtras } from "@/utils/constants";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

export default function useUploadProfilePicture() {
  const { updateConfig } = useAppConfig({});
  const [updateStoreConfig] = useConfig((state) => [state.updateConfig]);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const upload = async (variables: {
    input: { profile: { avatar: File } };
  }) => {
    setLoading(true);
    setError(false);

    try {
      const file = variables.input.profile.avatar;

      // Convert file to base64
      const reader = new FileReader();

      await new Promise<void>((resolve, reject) => {
        reader.onloadend = () => {
          const base64String = reader.result as string;
          localStorageService.updateProfilePicture(base64String);
          resolve();
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      updateConfig([
        { key: configExtras.user_has_uploaded_profile_picture, value: "true" },
      ]);
      updateStoreConfig({ user_has_uploaded_profile_picture: "true" });

      setLoading(false);
    } catch (err) {
      toast({
        title: "Picture upload failed. Please try again",
        status: "error",
      });
      setError(true);
      setLoading(false);
    }
  };

  return { upload, loading, error };
}
