import {
  Box,
  Divider,
  Flex,
  Image,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import AppModal from "./AdminModal";
import { GenderEnum } from "@/__generated__/graphql";
import { ImageLinks } from "@/utils/constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userInView: AdminUserType | null;
};

export default function UserPreviewModal({
  isOpen,
  onClose,
  userInView,
}: Props) {
  return (
    <AppModal
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile"
      body={<UserModal user={userInView} />}
      size="6xl"
    />
  );
}

const UserModal = ({ user }: { user: AdminUserType | null }) => {
  return (
    <Box>
      <Image
        src={
          user?.profile?.avatar ? user.profile.avatar : ImageLinks.dpPlaceholder
        }
        alt="user's picture"
        loading="lazy"
        width={200}
        height={200}
      />
      <Text fontWeight="semibold" fontSize="xl">
        Bio
      </Text>
      <SimpleGrid columns={5} mt="5">
        <Flex gap="3" flexDir="column">
          <Text fontWeight="semibold">Name</Text>
          <Text>{user?.name}</Text>
        </Flex>
        <Flex gap="3" flexDir="column">
          <Text fontWeight="semibold">UUID</Text>
          <Text>{user?.unique_id}</Text>
        </Flex>
        <Flex gap="3" flexDir="column">
          <Text fontWeight="semibold">Email Address</Text>
          <Text>{user?.email}</Text>
        </Flex>
        <Flex gap="3" flexDir="column">
          <Text fontWeight="semibold">Phone Number</Text>
          <Text>{user?.phone}</Text>
        </Flex>
      </SimpleGrid>
      <Divider my="10" />
      <Text fontWeight="semibold" fontSize="xl">
        Profile
      </Text>
      <SimpleGrid columns={5} mt="3" spacing={10}>
        <AnswerSect
          title={"What gender do you identify with?"}
          value={user?.profile?.gender || ""}
        />
        <AnswerSect
          title={"What is your race/ethnicity?"}
          value={user?.profile?.race || ""}
        />
        <AnswerSect
          title={"What is your relationship status?"}
          value={user?.profile?.relationship_status || ""}
        />
        <AnswerSect
          title={"What is your level of education?"}
          value={user?.profile?.level_of_education || ""}
        />
        <AnswerSect
          title={"What is your zip code?"}
          value={user?.profile?.zip_code || ""}
        />
        <AnswerSect
          title={"What is your political orientation?"}
          value={user?.profile?.political_orientation || ""}
        />
        <AnswerSect
          title={"What kind of area did you grow up in from ages 0-18?"}
          value={user?.profile?.type_of_city_grown || ""}
        />
        <AnswerSect
          title={
            "How big is your family of origin (the people that you lived with)?"
          }
          value={user?.profile?.family_size_in_numbers || ""}
        />
        <AnswerSect
          title={"What is your occupation?"}
          value={user?.profile?.occupation || ""}
        />
        <AnswerSect
          title={"do you have children?"}
          value={user?.profile?.has_children ? "Yes" : "No"}
        />
      </SimpleGrid>
      <Divider my="10" />
      <Text fontWeight="semibold" mt="5" fontSize="xl">
        Social Preference
      </Text>
      <SimpleGrid columns={5} mt="3" spacing={10}>
        {user?.social_preference_answers?.map((preferenceAnswer) => {
          const question =
            preferenceAnswer.social_preference_option?.social_preference?.title;
          const answer = preferenceAnswer.answer;
          return (
            <AnswerSect
              title={question || ""}
              value={answer || ""}
              key={question}
            />
          );
        })}
      </SimpleGrid>
      <Divider my="10" />
      <Text fontWeight="semibold" mt="5" fontSize="xl">
        Interests
      </Text>
      <UnorderedList>
        {user?.interests?.map((interest) => (
          <ListItem key={interest.id}>{interest.title}</ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

const AnswerSect = ({
  title,
  value = "",
}: {
  title: string;
  value: string;
}) => {
  return (
    <Flex gap="3" flexDir="column">
      <Text fontWeight="semibold" color="primary.200">
        {title}
      </Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export interface AdminUserType {
  __typename?: "User";
  id: string;
  name: string;
  unique_id: string;
  email: string;
  phone?: string | null;
  dob?: any | null;
  groups?: Array<{ __typename?: "UserGroup"; id: string; name: string }> | null;
  social_preference_answers?: Array<{
    __typename?: "SocialPreferenceAnswer";
    id: string;
    answer?: string | null;
    description?: string | null;
    note?: string | null;
    social_preference_option?: {
      __typename?: "SocialPreferenceOption";
      id: string;
      title?: string | null;
      social_preference?: {
        __typename?: "SocialPreference";
        id: string;
        title?: string | null;
      } | null;
    } | null;
  }> | null;
  interests?: Array<{
    __typename?: "Interest";
    id?: string | null;
    title?: string | null;
  }> | null;
  question_responses?: Array<{
    __typename?: "QuestionResponse";
    id: string;
  }> | null;
  personalityScore?: {
    __typename?: "PersonalityScore";
    id?: string | null;
    extroversion?: string | null;
    agreeableness?: string | null;
    conscientiousness?: string | null;
    neuroticism?: string | null;
    openness?: string | null;
    narcissism?: string | null;
    personalityBucketType?: {
      __typename?: "PersonalityBucketType";
      id: string;
      name?: string | null;
      sub_title?: string | null;
    } | null;
  } | null;
  profile?: {
    __typename?: "UserProfile";
    political_orientation?: string | null;
    level_of_education?: string | null;
    gender?: GenderEnum | null;
    race?: string | null;
    relationship_status?: string | null;
    health_rating?: string | null;
    zip_code?: string | null;
    has_children?: boolean | null;
    occupation?: string | null;
    family_size_in_numbers?: string | null;
    type_of_city_grown?: string | null;
    avatar?: string | null;
  } | null;
}
