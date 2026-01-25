import { useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load settings from localStorage
    const settings = localStorageService.getUserSettings();
    const preferenceSettings = settings.preference_settings || [];

    const obj: FlatConfigType = {};
    const settingsArray: string[] = [];
    preferenceSettings.forEach((element) => {
      obj[element.key] = element.value;
      settingsArray.push(element.key);
    });

    setConfig(obj);

    // Compare initialConfig options with result
    if (preferenceSettings.length) {
      const configToUpdate: ConfigType = [];

      initialConfig?.forEach((config) => {
        if (!settingsArray?.includes(config.key)) {
          configToUpdate.push({ key: config.key, value: config.value });
        }
      });

      // store new config
      if (configToUpdate.length) {
        const updatedSettings = localStorageService.updateUserSettings(
          initialConfig || [],
        );
        const res = transformElement(updatedSettings.preference_settings);
        setConfig(res);
      }
    }

    // The user does not have any settings saved and there is a config to be saved
    if (!preferenceSettings.length && initialConfig?.length) {
      const updatedSettings =
        localStorageService.updateUserSettings(initialConfig);
      const res = transformElement(updatedSettings.preference_settings);
      setConfig(res);
    }

    if (onQuerySuccess && typeof onQuerySuccess === "function") {
      onQuerySuccess(obj);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateConfig = (values: ConfigType) => {
    const updatedSettings = localStorageService.updateUserSettings(values);
    const res = transformElement(updatedSettings.preference_settings);
    setConfig(res);

    if (onUpdateSuccess && typeof onUpdateSuccess === "function") {
      onUpdateSuccess();
    }
  };

  return { config, updateConfig, loading } as const;
}
