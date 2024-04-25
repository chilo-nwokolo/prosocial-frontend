import FallbackComponent from "@/components/General/FallbackComponent";
import { Suspense } from "react";
import ResetPasswordComponent from "../components/ResetPasswordComponent";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
