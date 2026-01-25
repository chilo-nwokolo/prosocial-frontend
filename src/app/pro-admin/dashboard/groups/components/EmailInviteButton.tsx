import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import localStorageService from "@/service/localStorage";

type Props = {
  id: string;
};

export default function EmailInviteButton({ id }: Props) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const handleSendInvite = () => {
    setLoading(true);
    try {
      localStorageService.sendGroupInvitation(id);
      toast({
        title: "Group invitation sent successfully!",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: error.message || "Failed to send invitation",
        status: "error",
      });
    }
    setLoading(false);
  };

  return (
    <Button isDisabled={loading} isLoading={loading} onClick={handleSendInvite}>
      Send Email
    </Button>
  );
}
