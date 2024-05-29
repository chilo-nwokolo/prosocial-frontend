import DownloadFile from "@/utils/downloadFile";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function useDownloadData() {
  const toast = useToast();

  const handleDownload = async () => {
    toast({
      status: "loading",
      title: "Downloading data as CSV",
    });
    const response = await axios.get(
      "https://api.prosocialapp.com/api/download-data-csv",
    );
    DownloadFile(response.data, "prosocial-data.csv");
    toast.closeAll();
  };

  return handleDownload;
}
