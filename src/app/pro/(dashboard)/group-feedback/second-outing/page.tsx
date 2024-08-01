"use client";
import RatingScaleQuestion from "@/features/intro/components/RatingScaleQuestion";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import useSubmitOutingFeedback from "../hooks/useSubmitOutingFeedback";

export default function OutingFeedbackSecondOuting() {
  const { handleSubmit, loading } = useSubmitOutingFeedback();

  const formik = useFormik({
    initialValues: {
      secondOuting: "",
    },
    onSubmit: (data) => {
      handleSubmit(data.secondOuting);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex flexDir="column">
          <Text fontSize="2xl" as="h1" mt="3" fontWeight="semibold">
            Outing feedback
          </Text>
          <Text mt="3" fontSize="xl" as="h2">
            Would you like to go on a second outing?
          </Text>
          <RatingScaleQuestion
            name="secondOuting"
            value={formik.values.secondOuting}
            onChange={formik.handleChange}
            title={
              <FormLabel
                borderBottom="1px solid"
                borderColor="gray.500"
                w="full"
                mt="5"
                pb="5"
                mb="0"
                textAlign="left"
              >
                You would be sorted into another group which may or may not
                include people from previous outing(s)
              </FormLabel>
            }
            options={[
              { id: "1", title: "Yes", value: "YES" },
              { id: "2", title: "No", value: "NO" },
            ]}
            config={{ useIdAsValue: false, returnTitle: true }}
          />
          {/* {formik.values.secondOuting === "YES" ? (
            <Text mt="3">
              We will provide the new groups by July 5 and expect the outing to
              be completed by July 31. If you do not complete the second outing
              or fail to provide feedback, then you will not receive your free
              month of membership with classes at Fitness 19, Arlington Heights.
            </Text>
          ) : null} */}
          <Box mt="10">
            <Button w="full" type="submit" isLoading={loading}>
              Submit
            </Button>
          </Box>
        </Flex>
      </form>
    </>
  );
}
