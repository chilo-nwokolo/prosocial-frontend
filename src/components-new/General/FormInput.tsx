import {
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Text,
	Tooltip,
} from '@chakra-ui/react';
import { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

type Props = {
	labelTitle: string;
	inputType: HTMLInputTypeAttribute;
	value: string;
  name: string;
	onChange: (e: ChangeEvent<any>) => void;
	onBlur: (e: any) => void;
	infoText?: string;
	tooltip?: string;
	error?: string;
  min?: string | number;
  max?: string | number;
};

export default function FormInput({
	labelTitle,
	inputType,
	tooltip,
	infoText,
  name,
	value,
	onChange,
	onBlur,
	error,
  min,
  max
}: Props) {
	return (
		<FormControl>
			<FormLabel>{labelTitle}</FormLabel>
			<Input name={name} type={inputType} value={value} onChange={onChange} onBlur={onBlur} min={min} max={max} />
			<FormHelperText>
				{error ? (
					<Text fontSize="xs" color="red.500">{error}</Text>
				) : tooltip ? (
					<Tooltip label={tooltip} placement="bottom" fontSize="xs">
						<Flex alignItems="center" gap="1" fontSize="xs" cursor="default">
							<AiFillInfoCircle /> {infoText}
						</Flex>
					</Tooltip>
				) : <Text fontSize="xs">{infoText}</Text>}
			</FormHelperText>
		</FormControl>
	);
}
