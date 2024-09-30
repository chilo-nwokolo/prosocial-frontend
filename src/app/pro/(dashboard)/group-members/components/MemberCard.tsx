import { Box } from "@chakra-ui/react";

type MemberCardProps = {
  name: string;
};

function MemberCard({ name }: MemberCardProps) {
  return (
    <Box
      border={"1px"}
      borderBottom={"none"}
      borderColor="black"
      paddingY={10}
      paddingX={5}
      textAlign="left"
    >
      {name}
    </Box>
  );
}

export default MemberCard;
