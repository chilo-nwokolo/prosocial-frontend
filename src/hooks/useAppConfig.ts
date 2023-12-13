import {
  QUERY_ME_SETTINGS,
  UPDATE_USER_SETTINGS,
} from "@/features/dashboard/profile/gql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";

type ConfigType = { key: string; value: string }[];

type FlatConfigType = {
  [key: string]: string;
};

type Props = {
  initialConfig?: ConfigType;
  // eslint-disable-next-line no-unused-vars
  onQuerySuccess?: (settings: FlatConfigType) => void;
  onUpdateSuccess?: () => void;
};

type PreferenceSettingsType = {
  key: string;
  value: string;
}[];

export default function useAppConfig({
  initialConfig,
  onQuerySuccess,
  onUpdateSuccess,
}: Props) {
  const transformElement = (settings: PreferenceSettingsType) => {
    const obj: FlatConfigType = {};
    const settingsArray: string[] = [];
    settings?.forEach((element) => {
      obj[element.key] = element.value;
      settingsArray.push(element.key);
    });
    return obj;
  };

  const [config, setConfig] = useState<FlatConfigType | null>(null);

  const [mutate] = useMutation(UPDATE_USER_SETTINGS, {
    onCompleted: async (data) => {
      if (onUpdateSuccess && typeof onUpdateSuccess === "function") {
        onUpdateSuccess();
      }
      const preferenceSettings =
        data.updateUserSettings.settings?.preference_settings!;

      const res = transformElement(preferenceSettings);

      setConfig(res);

      console.info(
        "config ::: ",
        data.updateUserSettings.settings?.preference_settings,
      );
    },
  });

  const { loading } = useQuery(QUERY_ME_SETTINGS, {
    onCompleted: (data) => {
      const obj: FlatConfigType = {};
      const settings = data.me?.settings?.preference_settings;
      const settingsArray: string[] = [];
      settings?.forEach((element) => {
        obj[element.key] = element.value;
        settingsArray.push(element.key);
      });

      setConfig(obj);

      // Compare initialConfig options with result
      if (settings?.length) {
        const configToUpdate: ConfigType = [];

        initialConfig?.forEach((config) => {
          if (!settingsArray?.includes(config.key)) {
            configToUpdate.push({ key: config.key, value: config.value });
          }
        });

        // store new config
        if (configToUpdate.length) {
          mutate({
            variables: {
              input: { preferenceSettings: initialConfig },
            },
          });
        }
      }

      // The user does not have any settings saved and there is a config to be saved
      if (!settings && initialConfig?.length) {
        mutate({
          variables: {
            input: { preferenceSettings: initialConfig },
          },
        });
      }
      if (onQuerySuccess && typeof onQuerySuccess === "function") {
        onQuerySuccess(obj);
      }
    },
    fetchPolicy: "cache-and-network",
  });

  const updateConfig = (values: ConfigType) => {
    mutate({
      variables: {
        input: { preferenceSettings: values },
      },
    });
  };

  return { config, updateConfig, loading } as const;
}
