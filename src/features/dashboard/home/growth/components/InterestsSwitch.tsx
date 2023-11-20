import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

type Props = {
	interest: {
		id?: string | null | undefined;
		title?: string | null | undefined;
		image_url?: string | null | undefined;
	};
	// eslint-disable-next-line no-unused-vars
	onChange: (value: string, id: string) => void;
};

export default function InterestsSwitch({ interest, onChange }: Props) {
	return (
		<>
			<FormControl display="flex" alignItems="center" gap="3">
				<Switch
					colorScheme="gray"
					onChange={(e) => onChange(interest.title as string, e.target.id)}
					value={interest.id as string}
					id={interest.id as string}
				/>
				<FormLabel htmlFor={interest.id as string} w="full" py="2" mb="0">
					{interest.title}
				</FormLabel>
			</FormControl>
		</>
	);
}
