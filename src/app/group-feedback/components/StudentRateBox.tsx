import { GroupUser, InteractionFeedbackType, useGlobalStore } from "@/store";
import { updateInteractionArray } from "@/utils/admin.utils";
import { ImageLinks } from "@/utils/constants";
import {
  Box,
  Flex,
  HStack,
  Image,
  RadioGroup,
  Text,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

export function RadioCard(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" w="full">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        _checked={{
          bg: "teal.600",
          color: "white",
          borderColor: "teal.600",
        }}
        h="5.8rem"
        w="full"
        borderTop="none"
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        fontSize="xs"
        whiteSpace="pre-wrap"
        borderLeft="0.5px solid black"
        borderRight="0.5px solid black"
      >
        {props.children}
      </Flex>
    </Box>
  );
}

export default function StudentRateBox({ user }: { user: GroupUser }) {
  const options = [
    { title: "Yes", value: "YES" },
    { title: "Need More Interaction", value: "NEEDMOREINTERACTION" },
    { title: "No", value: "NO" },
    { title: "Didn't interact", value: "NOINTERACTION" },
  ];

  const [interactionFeedback, setInteractionFeedback] = useGlobalStore(
    (state) => [state.interactionFeedback, state.setInteractionFeedback],
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "feedback",
    onChange: (status) => {
      handleResponse({ connection: status, userId: user?.id, name: user.name });
    },
    defaultValue:
      interactionFeedback.find((feedback) => feedback.userId === user?.id)
        ?.connection || "",
  });

  const handleResponse = (response: InteractionFeedbackType) => {
    setInteractionFeedback(
      updateInteractionArray(response, interactionFeedback),
    );
  };

  const group = getRootProps();

  return (
    <Flex border="1px solid black" flexDir="column" alignItems="center">
      <Box py="10">
        <Image
          src={user.profile?.avatar || ""}
          alt="display picture"
          width="150px"
          height="150px"
          fallbackSrc={ImageLinks.dpPlaceholder}
          style={{ objectFit: "contain" }}
        />
        <Text textAlign="center" fontSize="lg" fontWeight="semibold" mt="9">
          {user.name}
        </Text>
      </Box>
      <Box w="full" borderTop="1px solid" borderColor="black">
        <RadioGroup>
          <HStack {...group} gap="0">
            {options.map((value) => {
              const radio = getRadioProps({ value: value.value });
              return (
                <RadioCard key={value.value} {...radio}>
                  {value.title}
                </RadioCard>
              );
            })}
          </HStack>
        </RadioGroup>
      </Box>
    </Flex>
  );
}
