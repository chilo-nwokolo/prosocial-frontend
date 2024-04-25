import { Suspense } from "react";
import SocialPreferenceComponent from "./SocialPreferenceComponent";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function SocialPreferencePage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <SocialPreferenceComponent />
    </Suspense>
  );
}
