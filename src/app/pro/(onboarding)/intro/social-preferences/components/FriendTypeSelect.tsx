import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { friendTypeOptions } from "./SocialPreferencesAccordion";

type Props = {
  value: string;
  title: string;
  name: string;
  error: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur: (e: ChangeEvent<any>) => void;
};

export default function FriendTypeSelect({
  value,
  title,
  onChange,
  onBlur,
  name,
  error,
}: Props) {
  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Select
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        borderColor="gray.500"
      >
        <option value="">Select One</option>
        {friendTypeOptions.map((option) => (
          <option key={option.id} value={option.title}>
            {option.title}
          </option>
        ))}
      </Select>
      {error ? (
        <FormHelperText fontSize="xs" color="critical.100">
          {error}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
}
