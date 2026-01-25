import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { groupViewColumns } from "../components/GroupViewTableColumns";
import localStorageService from "@/service/localStorage";

type Props = {
  group: string;
};

export type GroupDataType = {
  id: string;
  name: string;
  connectionType: string;
  receiversName: string;
  feedback: string;
};

export default function useGroupView({ group }: Props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);
  const [groupData, setGroupData] = useState<GroupDataType[]>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // Fetch group from localStorage
    setLoading(true);
    const groupInfo = localStorageService.getGroup(group);
    if (groupInfo) {
      setData({ fetchGroup: groupInfo });
    } else {
      setError(new Error("Group not found"));
    }
    setLoading(false);
  }, [group]);

  useEffect(() => {
    const transformData = () => {
      const finalResult: GroupDataType[] = [];

      const usersWithFeedback: string[] = [];

      const outingFeedbacks = data?.fetchGroup?.outing_feedbacks;

      outingFeedbacks?.forEach((response: any) => {
        const name = response.user?.name || "";
        const id = response.id;

        usersWithFeedback.push(response.user?.unique_id || "");

        const receiversInfo = {
          connectionType: "",
          receiversName: "",
          feedback: "",
        };

        response.feedback_responses?.forEach((feedback: any) => {
          let secondConnection = "";
          receiversInfo["receiversName"] = feedback?.receiving_user?.name || "";
          receiversInfo["feedback"] = feedback?.note || "";

          if (
            usersWithFeedback.includes(feedback.receiving_user?.unique_id || "")
          ) {
            const feedbackMatch = outingFeedbacks.find(
              (result: any) =>
                result.user?.unique_id === feedback.receiving_user?.unique_id ||
                "",
            );

            if (feedbackMatch?.id) {
              feedbackMatch.feedback_responses?.forEach((response: any) => {
                if (
                  feedbackMatch.user?.unique_id ===
                  feedback.receiving_user?.unique_id
                ) {
                  secondConnection = response.connection || "";
                }
              });
            }
          }

          receiversInfo["connectionType"] = secondConnection.length
            ? `${feedback?.connection}/${secondConnection}`
            : feedback?.connection || "";

          finalResult.push({ id, name, ...receiversInfo });
        });
      });

      setGroupData(finalResult);
    };
    transformData();
  }, [data]);

  const table = useReactTable({
    // @ts-ignore
    data: groupData || [],
    // @ts-ignore
    columns: useMemo(() => groupViewColumns, []),
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      columnVisibility,
      rowSelection,
    },
    debugTable: process.env.NODE_ENV === "development",
  });

  return { loading, error, table };
}
