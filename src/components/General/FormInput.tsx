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
        <FormLabel color="primary.200">{labelTitle}</FormLabel>
        {inputType === "password" ? (
          <InputGroup>
            <Input
              borderRadius="0"
              border="0.75px solid #876a6c"
              name={name}
              type={show ? "text" : "password"}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              _focus={{ border: "1.5px solid #7bb4ce" }}
              autoComplete={autoComplete}
              outline={
                autoComplete === "new-password"
                  ? !value
                    ? ""
                    : error?.length
                      ? "2px solid #f95c47"
                      : value.length && !error?.length
                        ? "2px solid #389974"
                        : ""
                  : ""
              }
              isInvalid={!!error}
              errorBorderColor="#f95c47"
            />
            <InputRightElement onClick={setShow.toggle}>
              {show ? (
                <Text cursor="pointer">
                  <FaRegEyeSlash style={{ color: "#3a3738" }} />
                </Text>
              ) : (
                <Text cursor="pointer">
                  <FaRegEye style={{ color: "#3a3738" }} />
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
            borderRadius="0"
            bg="#fff"
            border="0.75px solid #876a6c"
            _focus={{ border: "1.5px solid #7bb4ce", bg: "#fff" }}
          />
        )}
        <FormHelperText>
          {error ? (
            <Text fontSize="xs" color="#f95c47">
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
            <Text color="primary.200" fontSize="xs" fontStyle="italic">
              {infoText}
            </Text>
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
