import {
	QUERY_ME_SETTINGS,
	UPDATE_USER_SETTINGS,
} from '@/features/dashboard/profile/gql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

type ConfigType = { key: string; value: string }[];

type FlatConfigType = {
	[key: string]: string;
};

export default function useAppConfig({ initialConfig }: { initialConfig?: ConfigType }) {
	const [config, setConfig] = useState<FlatConfigType | null>(null);

	const [mutate] = useMutation(UPDATE_USER_SETTINGS, {
		onCompleted: (data) => {
			console.log('config>>> ', data.updateUserSettings.settings?.preference_settings);
		},
		refetchQueries: ['QUERY_ME_SETTINGS'],
	});

	useQuery(QUERY_ME_SETTINGS, {
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
					if (!settingsArray.includes(config.key)) {
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
		},
	});

	const updateConfig = (values: ConfigType) => {
		mutate({
			variables: {
				input: { preferenceSettings: values },
			},
		});
	};

	return { config, updateConfig } as const;
}
