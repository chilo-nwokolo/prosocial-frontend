import { Suspense } from "react";
import FallbackComponent from "@/components/General/FallbackComponent";
import GroupMembers from "./components/GroupMembers";

export default function GroupMembersPage() {
  return (
    <Suspense fallback={<FallbackComponent />}>
      <GroupMembers />
    </Suspense>
  );
}
