import { UPDATE_PROFILE_PICTURE } from "@/features/dashboard/profile/gql/queries";
import useAppConfig from "@/hooks/useAppConfig";
import { client } from "@/service";
import { useConfig } from "@/store";
import { configExtras } from "@/utils/constants";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

export default function useUploadProfilePicture() {
  const { updateConfig } = useAppConfig({});
  const [updateStoreConfig] = useConfig((state) => [state.updateConfig]);
  const toast = useToast();
  let error = false;
  const [upload, { loading }] = useMutation(UPDATE_PROFILE_PICTURE, {
    onCompleted: async () => {
      updateConfig([
        { key: configExtras.user_has_uploaded_profile_picture, value: "true" },
      ]);
      updateStoreConfig({ user_has_uploaded_profile_picture: "true" });
      await client.refetchQueries({
        include: ["ME"],
        updateCache(cache) {
          cache.evict({ fieldName: "ME" });
        },
      });
    },
    onError: () => {
      toast({
        title: "Picture upload failed. Please try again",
        status: "error",
      });
      error = true;
    },
  });
  return { upload, loading, error };
}
