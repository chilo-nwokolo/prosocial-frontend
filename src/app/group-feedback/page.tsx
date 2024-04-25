import { Suspense } from "react";
import OutingFeedbackComponent from "./components/OutingFeedbackComponent";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function OutingFeedbackPage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <OutingFeedbackComponent />
    </Suspense>
  );
}
