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
import useSubmitChallengeJournal from "@/features/dashboard/home/growth/hooks/useSubmitChallengeJournal";
import { appRouteLinks } from "@/utils/constants";
import AppModal from "@/components/AppModal";
import QueryContainer from "@/components/General/QueryContainer";
import YoutubeEmbed from "@/components/General/YoutubeEmbed";
import TranscriptComponent from "@/components/General/TranscriptComponent";
import { useRef, useState, useEffect } from "react";
import localStorageService from "@/service/localStorage";

const challengeTitles = {
  " Interesting or Funny Story": "Write down an interesting or Funny Story",
  "Interesting or Funny Story": "Write down an interesting or Funny Story",
  Commitments: "Write down your commitments",
  Curiosity: "What are you curious about",
};

type ChallengeCategoriesQueryType = {
  id: string;
  title: string;
  type: string;
  video_url?: string | null;
  transcript?: string | null;
};

export default function ViewChallengePage({
  params: { challengeId },
}: {
  params: { challengeId: number };
}) {
  const [activeChallenge, setActiveChallenge] =
    useState<ChallengeCategoriesQueryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [meLoading, setMeLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);
  // eslint-disable-next-line no-unused-vars
  const [meError, _setMeError] = useState<Error | null>(null);
  const [meChallenges, setMeChallenges] = useState<any[]>([]);

  const clearedErrors = useRef(false);

  useEffect(() => {
    // Load challenge categories
    const categories = localStorageService.getChallengeCategories();
    const found = categories.find(
      (challenge) => challenge.id === challengeId.toString(),
    );
    if (found) {
      setActiveChallenge(found);
    }
    setLoading(false);
  }, [challengeId]);

  useEffect(() => {
    // Load user's challenges
    const challenges = localStorageService.getUserChallenges();
    setMeChallenges(challenges);
    setMeLoading(false);
  }, []);

  const genInitialValues = () => {
    const found = meChallenges.find(
      (challenge) => challenge?.category?.id === challengeId.toString(),
    );
    return clearedErrors.current ? "" : found?.input || "";
  };

  const {
    onOpen,
    onClose,
    isOpen,
    formik,
    loading: submitting,
  } = useSubmitChallengeJournal({
    id: challengeId,
    initialValue: genInitialValues(),
    source: "challenges",
    title: activeChallenge?.title || "",
  });

  return (
    <QueryContainer loading={loading || meLoading} error={error || meError}>
      <Flex flexDir="column">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <BackButton destination={appRouteLinks.growthChallenges} />
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
        <Text my="2" as="h1" fontSize="lg">
          {
            challengeTitles[
              activeChallenge?.title as keyof typeof challengeTitles
            ]
          }
        </Text>
        <YoutubeEmbed
          embedId={
            activeChallenge?.video_url?.split("/")?.[
              activeChallenge?.video_url?.split("/").length - 1
            ] || ""
          }
        />
        <TranscriptComponent>
          <Text>{activeChallenge?.transcript || ""}</Text>
        </TranscriptComponent>
        <Text fontSize="lg" mt="4" fontWeight="medium">
          Your Challenge Entry
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <Textarea
            name="input"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.input}
            errorBorderColor="critical.100"
            isInvalid={!!formik.errors.input}
            mt="4"
            size="lg"
            rows={10}
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
