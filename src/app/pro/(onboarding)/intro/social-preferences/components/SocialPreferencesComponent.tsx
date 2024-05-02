"use client";
import { appRouteLinks, formFeedback } from "@/utils/constants";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { ChangeEvent, useEffect, useState } from "react";
import SocialPreferencesAccordion from "./SocialPreferencesAccordion";
import RatingScaleQuestion from "@/features/intro/components/RatingScaleQuestion";
import { useFormik } from "formik";
import SingleChoiceQuestion from "@/features/intro/components/SingleChoiceQuestion";
import * as yup from "yup";
import FriendTypeSelect from "./FriendTypeSelect";
import { useMutation } from "@apollo/client";
import { convertSocialPreferenceObjectToArray } from "../helpers";
import { UserSocialPreferenceSubmitInput } from "@/__generated__/graphql";
import { useAppQuestions } from "@/store";
import {
  fitness19Member,
  outingDynamics,
  socializationOptions,
  toSocializeOptions,
  yesNo,
} from "../helpers";
import ProfilePictureUploader from "@/components/General/ProfilePictureUploader";
import { SUBMIT_SOCIAL_PREFERENCES } from "../graphql/gql";

type ReferralList = { name: string; value: string }[];

export default function SocialPreferencesComponent() {
  const router = useRouter();
  const [referrals, setReferrals] = useState<ReferralList>([]);

  const [referralInput, setReferralInput] = useState<Record<string, string>>(
    {},
  );

  const searchParams = useSearchParams();

  const [
    socialPreferenceAnswers,
    socialPreferenceReferrees,
    updateSocialPreferenceAnswers,
    updateSocialPreferenceReferrees,
  ] = useAppQuestions((state) => [
    state.socialPreferenceAnswers,
    state.socialPreferenceReferrees,
    state.updateSocialPreferenceAnswers,
    state.updateSocialPreferenceReferrees,
  ]);

  const { onCopy, hasCopied } = useClipboard(
    "https://www.prosocialnetworks.com/fitness19",
  );

  const validationSchema = yup.object({
    4: yup.string().required(formFeedback.required),
    5: yup.string().required(formFeedback.required),
    6: yup.string().required(formFeedback.required),
    7: yup.string().required(formFeedback.required),
    8: yup.string().required(formFeedback.required),
    9: yup.string().required(formFeedback.required),
    10: yup.string().required(formFeedback.required),
    11: yup.string(),
    12: yup.string().required(formFeedback.required),
    13: yup.string().required(formFeedback.required),
    14: yup.string().required(formFeedback.required),
    15: yup.string(),
    18: yup.string(),
  });

  const toast = useToast();

  const [mutate, { loading }] = useMutation(SUBMIT_SOCIAL_PREFERENCES, {
    onCompleted: (data) => {
      toast({
        status: "success",
        description: data.handleSocialPreferenceSubmit.message,
      });
      router.push(appRouteLinks.intro);
    },
  });

  const handleReferralsList = (number: number) => {
    const result: ReferralList = [];

    for (let i = 1; i <= number; i++) {
      result.push({ name: `friend-${i}`, value: "" });
    }

    setReferrals(result);
  };

  const formik = useFormik({
    initialValues: {
      4: socialPreferenceAnswers[4] || "",
      5: socialPreferenceAnswers[5] || "",
      6: socialPreferenceAnswers[6] || "",
      7: socialPreferenceAnswers[7] || "",
      8: socialPreferenceAnswers[8] || "",
      9: socialPreferenceAnswers[9] || "",
      10: socialPreferenceAnswers[10] || "",
      11: socialPreferenceAnswers[11] || "",
      12: socialPreferenceAnswers[12] || "",
      13: socialPreferenceAnswers[13] || "",
      14: socialPreferenceAnswers[14] || "",
      15: socialPreferenceAnswers[15] || "",
      18: socialPreferenceAnswers[18] || "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (data) => {
      updateSocialPreferenceAnswers(data);
      updateSocialPreferenceReferrees(referralInput);

      const result = convertSocialPreferenceObjectToArray(data);

      let metaName = "";
      const referralNames = [];

      if (data[7] === "29" && data[18] === "31") {
        // Fitness 19 member
        const refereesLength = referrals.length;

        if (!refereesLength) {
          toast({
            status: "error",
            description:
              "Please complete the first and last names of the people you would like to refer to Fitness19",
          });
          return;
        }
        metaName = "referees";

        for (let i = 1; i <= refereesLength; i++) {
          const fullName = `${referralInput[`ref-firstName-friend-${i}`]} ${
            referralInput[`ref-lastName-friend-${i}`]
          }`;
          referralNames.push(fullName);
        }
      }

      if (data[7] === "30") {
        // Friend
        const refereesLength = Object.keys(referralInput).length;
        if (!refereesLength || refereesLength % 2 > 0) {
          toast({
            status: "error",
            description:
              "Please enter the first and last name of the person who referred you to Fitness19",
          });
          return;
        }
        metaName = "referrer";
        const name =
          referralInput["ref-firstName-friend-1"] +
          " " +
          referralInput["ref-lastName-friend-1"];
        referralNames.push(name);
      }

      let formData = result as unknown as UserSocialPreferenceSubmitInput[];

      if (metaName) {
        const meta = referralNames.map((name, i) => {
          return {
            key: metaName === "referrer" ? "referrer" : `${metaName} ${i + 1}`,
            value: name,
          };
        });
        formData = [
          ...formData,
          {
            social_preference_id: "8",
            answer: "Yes",
            social_preference_option_id: "31",
            meta,
          },
        ];
      }
      mutate({
        variables: {
          input: {
            input: formData,
          },
        },
      });
    },
  });

  const handleReferralInputChange = (e: ChangeEvent<any>) => {
    setReferralInput((ref) => {
      return {
        ...ref,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    setReferrals([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values[7]]);

  useEffect(() => {
    if (hasCopied) {
      toast({
        status: "success",
        description: "Copied to clipboad",
      });
    }
  }, [hasCopied, toast]);

  useEffect(() => {
    let result: Record<string, string> = {};
    const set = new Set<string>();

    const referreesLength = Object.keys(socialPreferenceReferrees).length;

    if (referreesLength) {
      for (let key in socialPreferenceReferrees) {
        result[key] = socialPreferenceReferrees[key];
        const str = key.split("-");
        set.add(`${str[2]}-${str[3]}`);
      }
      setReferralInput(result);
      const map = Array.from(set).map((item) => {
        return { name: item, value: "" };
      });
      setReferrals(map);
    }
  }, [socialPreferenceReferrees]);

  return (
    <Flex flexDir="column" gap="8" mb="5">
      <Flex mt="5">
        <Button
          color="black"
          variant="secondary"
          onClick={() =>
            router.push(
              searchParams.has("social-preferences-form")
                ? appRouteLinks.introSocialPreferences
                : appRouteLinks.intro,
            )
          }
        >
          <FaChevronLeft />
        </Button>
      </Flex>
      {searchParams.has("social-preferences-form") ? (
        <form onSubmit={formik.handleSubmit}>
          <Flex flexDir="column" gap="8">
            <Text as="h1" fontSize="3xl" fontWeight="semibold">
              Social Preferences
            </Text>
            <Text>All fields required</Text>

            {/* Q1 */}
            <Flex flexDir="column" gap="3">
              <Text>1. What types of friends are you looking for?</Text>
              <Text fontWeight="normal" fontSize="small">
                Select your top 3
              </Text>
              <FriendTypeSelect
                value={formik.values[8]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="8"
                title="First choice"
                error={formik.errors[8]}
              />
              <FriendTypeSelect
                value={formik.values[9]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="9"
                title="Second choice"
                error={formik.errors[9]}
              />
              <FriendTypeSelect
                value={formik.values[10]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="10"
                title="Third choice"
                error={formik.errors[10]}
              />

              {/* Q1b */}
              <FormControl mt="3">
                <FormLabel>
                  Optional: Do you want to provide any other detail about the
                  type of friend(s) you&apos;re looking for?
                </FormLabel>
                <Textarea
                  value={formik.values[11]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="11"
                  borderColor="gray.500"
                />
              </FormControl>
            </Flex>

            {/* Q2 */}
            <Flex flexDir="column" gap="3">
              <Text>2. What type of friend do you think you are?</Text>
              <Text fontWeight="normal" fontSize="small">
                Select your top 3
              </Text>
              <FriendTypeSelect
                value={formik.values[12]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="12"
                title="First choice"
                error={formik.errors[12]}
                hideFriend={["Parent Friend"]}
              />
              <FriendTypeSelect
                value={formik.values[13]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="13"
                title="Second choice"
                error={formik.errors[13]}
                hideFriend={["Parent Friend"]}
              />
              <FriendTypeSelect
                value={formik.values[14]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="14"
                title="Third choice"
                error={formik.errors[14]}
                hideFriend={["Parent Friend"]}
              />

              {/* Q2b */}
              <FormControl mt="3">
                <FormLabel>
                  Optional: Do you want to provide any other detail about the
                  type of friend(s) you think you are?
                </FormLabel>
                <Textarea
                  value={formik.values[15]}
                  onChange={formik.handleChange}
                  name="15"
                  borderColor="gray.500"
                />
              </FormControl>
            </Flex>

            {/* Q3 */}
            <RatingScaleQuestion
              title="3. How often do you go out to socialize?"
              name="4"
              onChange={formik.handleChange}
              options={socializationOptions}
              value={formik.values[4]}
              config={{ returnTitle: true, useIdAsValue: true }}
              error={formik.errors[4]}
            />

            {/* Q4 */}
            <RatingScaleQuestion
              title="4. How often would you like to go out to 
              socialize?"
              name="5"
              onChange={formik.handleChange}
              options={toSocializeOptions}
              value={formik.values[5]}
              config={{ returnTitle: true, useIdAsValue: true }}
              error={formik.errors[5]}
            />

            {/* Q5 */}
            <SingleChoiceQuestion
              title="5. When you do your outing with Fitness19 members, would you like:"
              infoText="We will do our best to place you in a group of your preference."
              value={formik.values[6]}
              name="6"
              onChange={formik.handleChange}
              options={outingDynamics}
              config={{ useIdAsValue: true }}
              error={formik.errors[6]}
            />

            <Flex flexDir="column">
              <Text as="h2" fontWeight="bold">
                Add a profile photo
              </Text>
              <Text>
                Please add a clear photo of your face without sunglasses. Your
                profile photo is not public but will be seen by potential
                friends once an outing has been completed.
              </Text>
              <ProfilePictureUploader />
            </Flex>

            {/* Q6 */}
            <RatingScaleQuestion
              title="6. Are you already a member of Fitness19 or a friend of a member?"
              value={formik.values[7]}
              name="7"
              onChange={formik.handleChange}
              options={fitness19Member}
              config={{ returnTitle: true, useIdAsValue: true }}
              error={formik.errors[7]}
            />

            {formik.values[7] === "29" ? (
              <Flex flexDir="column" gap="5">
                {/* Q7 */}
                <RatingScaleQuestion
                  title="7. Will you be referring a friend to 
                    Fitness 19 who is currently not a 
                    member to be part of the ProSocial 
                    partnership?"
                  value={formik.values[18]}
                  name="18"
                  onChange={formik.handleChange}
                  options={yesNo}
                  config={{ returnTitle: true, useIdAsValue: true }}
                  error={formik.errors[18]}
                />

                {formik.values[18] === "31" ? (
                  <>
                    {/* Q8 */}
                    <FormControl mt="4">
                      <FormLabel>8. How many friends?</FormLabel>
                      <Select
                        onChange={(e) => handleReferralsList(+e.target.value)}
                        defaultValue={referrals.length || ""}
                      >
                        <option key="friends-key" value="">
                          Choose one
                        </option>
                        {Array(5)
                          .fill(1)
                          .map((_val, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                    {referrals.map((val, i) => (
                      <FriendsName
                        title={`Friend ${i + 1}`}
                        name={val.name}
                        key={i}
                        value={referralInput}
                        onChange={handleReferralInputChange}
                      />
                    ))}
                    <Text mt="4">
                      To get your friend(s) set up to receive a free month of
                      membership at Fitness19, please share this link with them:
                    </Text>

                    <Box cursor="pointer" onClick={onCopy}>
                      <Button
                        variant="link"
                        color="blue.600"
                        fontWeight="medium"
                      >
                        https://www.prosocialnetworks.com/fitness19
                      </Button>
                    </Box>
                  </>
                ) : null}
              </Flex>
            ) : formik.values[7] === "30" ? (
              <Flex flexDir="column">
                <FriendsName
                  title={"Who referred you?"}
                  name="friend-1"
                  value={referralInput}
                  onChange={handleReferralInputChange}
                />
                <Text mt="4">
                  To make sure you receive your free month of membership, visit
                  Fitness 19 in Arlington Heights to sign-up.
                </Text>
              </Flex>
            ) : null}
            <Button type="submit" isLoading={loading} loadingText="Saving">
              Save
            </Button>
          </Flex>
        </form>
      ) : (
        <>
          <Text>
            Take a moment to read these friend types; in the next screen we’ll
            ask you to choose the type of friend you’re looking for and the type
            of friend that you are.
          </Text>
          <SocialPreferencesAccordion />
          <Box mt="5" w="full">
            <Button
              onClick={() =>
                router.push(
                  appRouteLinks.introSocialPreferences +
                    "?social-preferences-form=true",
                )
              }
              w="full"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Flex>
  );
}

function FriendsName({
  title,
  name,
  value,
  onChange,
}: {
  title: string;
  name: string;
  value: Record<string, string>;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: ChangeEvent<any>) => void;
}) {
  return (
    <Flex gap="3" flexDir="column">
      <Text as="h3" mb="2">
        {title}
      </Text>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          type="text"
          name={`ref-firstName-${name}`}
          value={value[`ref-firstName-${name}`]}
          onChange={onChange}
          borderColor="gray.500"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          type="text"
          name={`ref-lastName-${name}`}
          value={value[`ref-lastName-${name}`]}
          onChange={onChange}
          borderColor="gray.500"
        />
      </FormControl>
    </Flex>
  );
}
