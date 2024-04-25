import { Suspense } from "react";
import { Center } from "@chakra-ui/react";
import VerifyEmailComponent from "../../components/VerifyEmailComponent";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function EmailVerificationPage() {
  return (
    <Center h="100vh">
      <Suspense fallback={<FallbackComponent />}>
        <VerifyEmailComponent />
      </Suspense>
    </Center>
  );
}
