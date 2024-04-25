import { storeKeys } from "@/utils/constants";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigState {
  config: Record<string, string | boolean | number>;
  // eslint-disable-next-line no-unused-vars
  updateConfig: (config: Record<string, string | boolean | number>) => void;
}

const transformConfig = (
  config: Record<string, string | number | boolean>,
  newConfig: Record<string, string | number | boolean>,
) => {
  let updatedConfig = {};
  const key = Object.keys(newConfig);
  if (!config[key[0]]) {
    updatedConfig = { ...config, ...newConfig };
    return updatedConfig;
  }
  return config;
};

export const useConfig = create<ConfigState>()(
  persist(
    (set) => ({
      config: {},
      updateConfig: (config) =>
        set((state) => ({ config: transformConfig(state.config, config) })),
    }),
    { name: storeKeys.CONFIG_STORE },
  ),
);
