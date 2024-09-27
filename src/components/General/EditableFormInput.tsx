import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, HTMLInputTypeAttribute, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import AppModal from "../AppModal";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

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
  isEditable?: boolean;
  // eslint-disable-next-line no-unused-vars
  reset: (nextState?: any) => void;
};

export default function EditableFormInput({
  labelTitle,
  inputType,
  tooltip,
  infoText,
  name,
  value,
  onChange,
  onBlur,
  error,
  reset,
  isEditable = true,
}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <FormControl>
        <FormLabel>{labelTitle}</FormLabel>
        <Flex>
          <Input
            name={name}
            type={inputType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            color={editMode ? "#000" : "gray.500"}
            isReadOnly={!editMode}
            h="12"
            w="90%"
          />
          {isEditable ? (
            editMode ? (
              <Flex ml="3" gap="2">
                <Button
                  variant="solid"
                  colorScheme="green"
                  h="auto"
                  onClick={() => setEditMode(false)}
                >
                  <AiOutlineCheck />
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    setEditMode(false);
                    reset(name);
                  }}
                  h="auto"
                >
                  <AiOutlineClose />
                </Button>
              </Flex>
            ) : (
              <Button
                variant="link"
                onClick={() => setEditMode(true)}
                color="blue"
                h="auto"
              >
                <FiEdit2 />
              </Button>
            )
          ) : null}
        </Flex>
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
                fontSize="sm"
                color="blue.600"
                fontWeight="600"
                cursor="pointer"
                onClick={onOpen}
              >
                <FaInfoCircle color="#226db4" /> {infoText}
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
