"use client";
import { useQuery } from "@apollo/client";
import QueryContainer from "@/components/General/QueryContainer";
import { Box } from "@chakra-ui/react";
import { QUERY_GROUP } from "../gql/queries";

export default function SingleGroupView() {
  const { loading, data, error } = useQuery(QUERY_GROUP, {
    variables: {
      id: "13",
    },
  });
  console.log(data);
  return (
    <QueryContainer error={error} loading={loading}>
      <Box>aosdfas</Box>
    </QueryContainer>
  );
}
