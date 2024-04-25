import { Suspense } from "react";
import SocialPreferencesComponent from "./components/SocialPreferencesComponent";
import FallbackComponent from "@/components/General/FallbackComponent";

export default function SocialPreferencesPage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <SocialPreferencesComponent />
    </Suspense>
  );
}
