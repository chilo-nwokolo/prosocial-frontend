"use client";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import BackButton from "@/components/General/BackButton";
import { RiDeleteBin6Line } from "react-icons/ri";
import { appRouteLinks } from "@/utils/constants";
import AppModal from "@/components/AppModal";
import useSubmitChallengeJournal from "@/features/dashboard/home/growth/hooks/useSubmitChallengeJournal";
import { useQuery } from "@apollo/client";
import {
  QUERY_JOURNAL_CATEGORIES,
  QUERY_ME_JOURNALS,
} from "@/features/dashboard/home/growth/queries";
import QueryContainer from "@/components/General/QueryContainer";
import { useRef } from "react";

const journalTitles = {
  "Happiest ChildhoodMemory": "What is your happiest memory from childhood?",
  "Greatest Personal Achievement":
    "What is your greatest personal achievement?",
  "Hardest Learned Life Lesson":
    "What is the hardest lesson you have learned in life?",
  "Most Valued Relationship": "Can you describe your most valued relationship?",
};

export default function ViewJournalPage({
  params: { journalId },
}: {
  params: { journalId: number };
}) {
  const { data, loading, error } = useQuery(QUERY_JOURNAL_CATEGORIES);

  const clearedErrors = useRef(false);

  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery(QUERY_ME_JOURNALS);

  const genInitialValues = () => {
    const found = meData?.me?.journals?.find(
      (challenge) => challenge?.category?.id === journalId.toString(),
    );
    return clearedErrors.current ? "" : found?.input || "";
  };

  const getJournalTitle = () => {
    const found = data?.journalCategories?.find(
      (journal) => journal.id === journalId.toString(),
    );
    return found?.title || "";
  };

  const {
    onOpen,
    onClose,
    isOpen,
    formik,
    loading: submitting,
  } = useSubmitChallengeJournal({
    id: journalId,
    initialValue: genInitialValues(),
    source: "journal",
    title: getJournalTitle(),
  });

  return (
    <QueryContainer loading={loading || meLoading} error={error || meError}>
      <Flex flexDir="column">
        <Flex justifyContent="space-between" alignItems="center">
          <BackButton destination={appRouteLinks.growthJournal} />
          <Button
            variant="outline"
            leftIcon={<RiDeleteBin6Line />}
            textTransform="capitalize"
            onClick={onOpen}
            isDisabled={!formik.values.input}
          >
            Clear Entry
          </Button>
        </Flex>
        <Text fontSize="lg" mt="4" fontWeight="medium">
          Journal Entry
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Text mt="2">
            {journalTitles[getJournalTitle() as keyof typeof journalTitles]}
          </Text>
          <Textarea
            name="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.input}
            mt="4"
            size="lg"
            rows={25}
          ></Textarea>
          <Text fontSize="sm">Minimum of 100 characters required</Text>
          <Box mt="6" w="full">
            <Button
              isLoading={submitting}
              isDisabled={!!formik.errors.input}
              w="full"
              type="submit"
            >
              Save
            </Button>
          </Box>
        </form>
        <AppModal
          title="Are you sure?"
          description="This action cannot be reversed."
          isOpen={isOpen}
          onClose={onClose}
          actionButtons={
            <SimpleGrid columns={2} gap="3">
              <Button onClick={onClose} variant="secondary">
                No
              </Button>
              <Button
                onClick={() => {
                  formik.resetForm({ values: { input: "" } });
                  clearedErrors.current = true;
                  onClose();
                }}
              >
                Yes
              </Button>
            </SimpleGrid>
          }
        />
      </Flex>
    </QueryContainer>
  );
}
