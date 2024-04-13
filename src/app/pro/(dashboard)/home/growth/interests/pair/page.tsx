import { Suspense } from "react";
import InterestsPairComponent from "./InterestsComponent";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function InterestsPairPage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <InterestsPairComponent />
    </Suspense>
  );
}
