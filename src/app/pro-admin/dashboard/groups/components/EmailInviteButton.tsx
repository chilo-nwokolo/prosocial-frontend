import { useMutation } from "@apollo/client";
import { Button, useToast } from "@chakra-ui/react";
import { SEND_GROUP_INVITATION } from "../gql/queries";
import { apolloErrorHandler } from "@/utils/helpers";

type Props = {
  id: string;
};

export default function EmailInviteButton({ id }: Props) {
  const toast = useToast();
  const [mutate, { loading }] = useMutation(SEND_GROUP_INVITATION, {
    onError(error) {
      toast({
        title: apolloErrorHandler(error),
        status: "error",
      });
    },
    onCompleted: (data) => {
      toast({
        title: data.sendGroupInviteToParticipants.message,
      });
    },
  });

  return (
    <Button
      isDisabled={loading}
      isLoading={loading}
      onClick={() => mutate({ variables: { group_id: id } })}
    >
      Send Email
    </Button>
  );
}
