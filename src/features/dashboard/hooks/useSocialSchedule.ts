import { useState } from "react";
import { ScheduleDateType, useUserStore } from "@/store";
import { useMutation, useQuery } from "@apollo/client";
import {
  ME_SCHEDULES,
  UPDATE_USER_SCHEDULE,
} from "@/features/dashboard/profile/gql/queries";
import { DayName, TimeRange } from "@/__generated__/graphql";
import { apolloErrorHandler } from "@/utils/helpers";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { appRouteLinks } from "@/utils/constants";

export type NewScheduleDateType = {
  day_name: DayName;
  time_range: TimeRange[];
  status: boolean;
};

export default function useSocialSchedule() {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSchedules, updateSelectedSchedules] = useUserStore((state) => [
    state.selectedSchedules,
    state.updateSelectedSchedules,
  ]);

  const router = useRouter();
  const toast = useToast();

  const { loading: loadingSchedules, error } = useQuery(ME_SCHEDULES, {
    onCompleted: (data) => {
      const schedule = data.me?.schedules || [];
      const updatedSchedules: ScheduleDateType[] = [];
      schedule.forEach((sch) => {
        updatedSchedules.push({
          day: sch.day_name,
          timeRange: sch.time_range,
          status: sch.status,
        });
      });
      updateSelectedSchedules(updatedSchedules);
    },
  });

  const [submit, { loading }] = useMutation(UPDATE_USER_SCHEDULE, {
    onCompleted: () => {
      toast({
        title: "Updated Successfully",
        status: "success",
      });
      router.push(appRouteLinks.socialScheduleSuccess);
    },
    onError: (e) => {
      apolloErrorHandler(e);
    },
    refetchQueries: [ME_SCHEDULES],
  });

  const toggleAccordion = (day: string) => {
    const index = selectedDays.indexOf(day);

    if (index < 0) {
      setSelectedDays([...selectedDays, day]);
    }

    if (index >= 0) {
      const newSelectedDays = [...selectedDays];
      newSelectedDays.splice(index, 1);
      setSelectedDays(newSelectedDays);
    }
  };

  const submitSocialSchedule = () => {
    if (!selectedDays.length) {
      toast({
        status: "error",
        title: "You have not selected a valid time for your outings",
      });
      return;
    }

    const result: NewScheduleDateType[] = [];

    selectedSchedules.forEach((schedule) => {
      if (selectedDays.includes(schedule.day)) {
        result.push({
          day_name: schedule.day.toUpperCase() as DayName,
          time_range: schedule.timeRange as TimeRange[],
          status: schedule.status,
        });
      }
    });

    submit({
      variables: { input: { schedules: result } },
    });
  };
  return {
    loading,
    submitSocialSchedule,
    toggleAccordion,
    loadingSchedules,
    error,
  } as const;
}
