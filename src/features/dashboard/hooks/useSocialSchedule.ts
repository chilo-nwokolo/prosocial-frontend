import { useState, useEffect } from "react";
import { ScheduleDateType, useUserStore } from "@/store";
import { DayName, TimeRange } from "@/__generated__/graphql";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { appRouteLinks } from "@/utils/constants";
import localStorageService from "@/service/localStorage";

export type NewScheduleDateType = {
  day_name: DayName;
  time_range: TimeRange[];
  status: boolean;
};

export default function useSocialSchedule() {
  // eslint-disable-next-line no-unused-vars
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedSchedules, updateSelectedSchedules] = useUserStore((state) => [
    state.selectedSchedules,
    state.updateSelectedSchedules,
  ]);
  const [loading, setLoading] = useState(false);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, _setError] = useState<Error | null>(null);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    // Load schedules from localStorage
    const schedules = localStorageService.getSchedules();
    const updatedSchedules: ScheduleDateType[] = schedules.map((sch) => ({
      day: sch.day_name,
      timeRange: sch.time_range,
      status: sch.status,
    }));
    updateSelectedSchedules(updatedSchedules);
    setLoadingSchedules(false);
  }, [updateSelectedSchedules]);

  const submitSocialSchedule = () => {
    setLoading(true);

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

    try {
      localStorageService.updateSchedules(
        result.map((r) => ({
          day_name: r.day_name,
          time_range: r.time_range as string[],
          status: r.status,
        })),
      );

      toast({
        title: "Updated Successfully",
        status: "success",
      });
      router.push(appRouteLinks.socialScheduleSuccess);
    } catch (err: any) {
      toast({
        status: "error",
        title: err.message || "Update failed",
      });
    }

    setLoading(false);
  };

  return {
    loading,
    submitSocialSchedule,
    loadingSchedules,
    error,
  } as const;
}
