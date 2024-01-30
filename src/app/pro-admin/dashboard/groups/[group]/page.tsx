"use client";
import QueryContainer from "@/components/General/QueryContainer";
import useGroupView from "../hooks/useGroupView";
import GroupTable from "../components/GroupTable";

export default function SingleGroupView({
  params,
}: {
  params: { group: string };
}) {
  const { loading, error, table } = useGroupView({ group: params.group });

  const handleSelectedRow = (event: any) => {
    console.log(event);
  };

  return (
    <QueryContainer error={error} loading={loading}>
      <GroupTable table={table} handleSelectedRow={handleSelectedRow} />
    </QueryContainer>
  );
}
