import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
  useBoolean,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import AppModal from "../AppModal";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type Props = {
  labelTitle: string;
  inputType: HTMLInputTypeAttribute;
  value: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur: (e: any) => void;
  infoText?: string;
  tooltip?: string;
  error?: string;
  min?: string | number;
  max?: string | number;
  autoComplete?: string;
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
  max,
  autoComplete = "new-password",
}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [show, setShow] = useBoolean();

  return (
    <>
      <FormControl>
        <FormLabel>{labelTitle}</FormLabel>
        {inputType === "password" ? (
          <InputGroup>
            <Input
              name={name}
              type={show ? "text" : "password"}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              autoComplete={autoComplete}
              outline={
                autoComplete === "new-password"
                  ? !value
                    ? ""
                    : error?.length
                      ? "2px solid red.400"
                      : value.length && !error?.length
                        ? "2px solid green"
                        : ""
                  : ""
              }
              isInvalid={!!error}
              errorBorderColor="red.400"
            />
            <InputRightElement onClick={setShow.toggle}>
              {show ? (
                <Text cursor="pointer">
                  <FaRegEyeSlash />
                </Text>
              ) : (
                <Text cursor="pointer">
                  <FaRegEye />
                </Text>
              )}
            </InputRightElement>
          </InputGroup>
        ) : (
          <Input
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            min={min}
            max={max}
          />
        )}
        <FormHelperText>
          {error ? (
            <Text fontSize="xs" color="red.500">
              {error}
            </Text>
          ) : tooltip ? (
            <Tooltip label={tooltip} placement="bottom" fontSize="xs">
              <Flex
                alignItems="center"
                gap="1"
                fontSize="xs"
                cursor="default"
                onClick={onOpen}
              >
                <AiFillInfoCircle /> {infoText}
              </Flex>
            </Tooltip>
          ) : (
            <Text fontSize="xs">{infoText}</Text>
          )}
        </FormHelperText>
      </FormControl>
      {tooltip ? (
        <AppModal
          title=""
          description={tooltip}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
    </>
  );
}
