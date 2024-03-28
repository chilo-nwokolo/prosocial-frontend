import { ComponentConfigType } from "@/app/pro/(onboarding)/intro/[slug]/componentConfig";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";

type Props = {
  title: string;
  options: [{ id: string; title: string; value: string }] | undefined;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  name: string;
  config: ComponentConfigType;
  error?: string;
};

export default function SingleChoiceQuestion({
  title,
  options,
  error,
  name,
  onChange,
  value,
  config,
}: Props) {
  return (
    <FormControl as="fieldset">
      <FormLabel as="legend">{title}</FormLabel>
      <RadioGroup defaultValue={value} mt="3">
        <VStack alignItems="start" spacing="15px">
          {options?.map((option) => (
            <Radio
              key={`${option.value}-${option.id}`}
              value={config?.useIdAsValue ? option.id : option.value}
              name={name}
              onChange={onChange}
              sx={{ border: "1.5px solid", color: "#00000070" }}
            >
              {option.title}
            </Radio>
          ))}
        </VStack>
      </RadioGroup>
      {error ? <FormHelperText>{error}</FormHelperText> : null}
    </FormControl>
  );
}
