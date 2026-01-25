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
import QueryContainer from "@/components/General/QueryContainer";
import { useRef, useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

const journalTitles = {
  "Happiest Childhood Memory": "What is your happiest memory from childhood?",
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
  const [loading, setLoading] = useState(true);
  const [meLoading, setMeLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [meError, _setMeError] = useState<Error | null>(null);
  const [journalCategories, setJournalCategories] = useState<any[]>([]);
  const [meJournals, setMeJournals] = useState<any[]>([]);

  const clearedErrors = useRef(false);

  useEffect(() => {
    const categories = localStorageService.getJournalCategories();
    setJournalCategories(categories);
    setLoading(false);
  }, []);

  useEffect(() => {
    const journals = localStorageService.getUserJournals();
    setMeJournals(journals);
    setMeLoading(false);
  }, []);

  const genInitialValues = () => {
    const found = meJournals.find(
      (journal) => journal?.category?.id === journalId.toString(),
    );
    return clearedErrors.current ? "" : found?.input || "";
  };

  const getJournalTitle = () => {
    const found = journalCategories.find(
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
