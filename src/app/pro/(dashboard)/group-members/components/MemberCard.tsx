import { Box } from "@chakra-ui/react";

type MemberCardProps = {
  name: string;
};

function MemberCard({ name }: MemberCardProps) {
  return (
    <Box
      border={"2px"}
      borderBottom={0}
      borderColor="gray"
      paddingY={10}
      paddingX={5}
      textAlign="left"
    >
      {name}
    </Box>
  );
}

export default MemberCard;
