"use client";
import AppModal from "@/components/AppModal";
import LoadingModal from "@/components/General/LoadingModal";
import CharacterBox from "@/features/intro/components/CharacterBox";
import useResultPage from "@/features/intro/hooks/useResultPage";
import { ImageLinks } from "@/utils/constants";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

export default function ResultPage() {
  const {
    loading,
    result,
    checkIfAllAnswered,
    updatePersonalityBucketQuestions,
    setSelected,
    selected,
    personalityBucketQuestions,
    onSubmit,
    submitting,
    resultNote,
    setResultNote,
  } = useResultPage();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex justifyContent="center" alignItems="center" gap="1">
        <FaInfoCircle color="#226db4" />
        <Tooltip label="Every answer you provided during the registration procures a score that combines together to place you into a category. If you feel this category is not an accurate reflection of your personality, you will have the opportunity to answer some more questions so we can further refine our understanding of who you are as a person.">
          <Text
            fontSize="sm"
            color="blue.600"
            fontWeight="600"
            cursor="pointer"
            onClick={onOpen}
          >
            How did my answers produce this result?
          </Text>
        </Tooltip>
      </Flex>
      <Flex mt="5" flexDir="column">
        <Text fontWeight="medium" fontSize="xl">
          Based on your answers, you seem to fit one of our social categories:{" "}
        </Text>
        <Flex flexDir="column" alignItems="center" my="8">
          <Image
            src={result?.image || ImageLinks.logo}
            alt={result?.name || "Image of character"}
            w="60"
            h="60"
            objectFit="contain"
          />
          <Text fontSize="2xl" fontWeight="bold" marginTop="5">
            {result?.name}
          </Text>
          <Text fontStyle="italic">{result?.sub_title}</Text>
          <Text mt="4">{result?.description}</Text>
        </Flex>
        <Text textAlign="center" px="9" fontWeight="bold">
          Select whether or not you agree these characteristics match you.
        </Text>
        <Flex flexDir="column" gap="4" my="5">
          {result?.bucketQuestions?.map((val) => (
            <CharacterBox
              updatePersonalityBucketQuestions={
                updatePersonalityBucketQuestions
              }
              personalityBucketQuestions={personalityBucketQuestions}
              key={val.id}
              id={val.id}
              title={val.title || ""}
              description={val.text || ""}
              setSelected={setSelected}
              selected={selected}
            />
          ))}
        </Flex>
        <Box>
          {checkIfAllAnswered() ? (
            <>
              <Box fontWeight="medium" m="4" textAlign="center">
                {personalityBucketQuestions.length <= 1 ? (
                  <Flex flexDir="column" alignItems="flex-start">
                    <Text textAlign="center" mb="2" fontStyle="italic">
                      It looks like we didn&apos;t get this right. If you&apos;d
                      like, provide some descriptors of your personality
                      (optional).
                    </Text>
                    <Textarea
                      value={resultNote}
                      onChange={(e) => setResultNote(e.target.value)}
                      border="1px solid"
                      borderColor="black"
                    />
                  </Flex>
                ) : personalityBucketQuestions.length === 2 ? (
                  <Text px="10">
                    It looks like your assessment mostly matches how you feel.
                    Ready to move on?
                  </Text>
                ) : (
                  <Text px="10">
                    It looks like your assessment matches how you feel. Ready to
                    move on?
                  </Text>
                )}
              </Box>
              <Button onClick={onSubmit} w="full" isLoading={submitting} m="4">
                Complete
              </Button>
            </>
          ) : null}
        </Box>
      </Flex>
      <LoadingModal isOpen={loading} onClose={() => {}} />
      <AppModal
        title=""
        description="Every answer you provided during the registration procures a score that combines together to place you into a category. If you feel this category is not an accurate reflection of your personality, you will have the opportunity to answer some more questions so we can further refine our understanding of who you are as a person."
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
