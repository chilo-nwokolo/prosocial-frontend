import DownloadFile from "@/utils/downloadFile";
import { useToast } from "@chakra-ui/react";
import localStorageService from "@/service/localStorage";

export default function useDownloadData() {
  const toast = useToast();

  const handleDownload = async () => {
    toast({
      status: "loading",
      title: "Downloading data as CSV",
    });

    // Get all users from localStorage and convert to CSV
    const users = localStorageService.adminQueryUsers({});

    // Convert to CSV format
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "DOB",
      "User Type",
      "Created At",
    ];
    const csvRows = [headers.join(",")];

    users.forEach((user) => {
      const row = [
        user.id,
        `"${user.name}"`,
        user.email,
        user.phone,
        user.dob,
        user.user_type,
        user.created_at,
      ];
      csvRows.push(row.join(","));
    });

    const csvData = csvRows.join("\n");

    DownloadFile(csvData, "prosocial-data.csv");
    toast.closeAll();
  };

  return handleDownload;
}
