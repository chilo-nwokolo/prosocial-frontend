import DownloadFile from "@/utils/downloadFile";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { BASE_REST_URL } from "@/service";

export default function useDownloadData() {
  const toast = useToast();

  const handleDownload = async () => {
    toast({
      status: "loading",
      title: "Downloading data as CSV",
    });
    const response = await axios.get(BASE_REST_URL + "/download-data-csv");
    DownloadFile(response.data, "prosocial-data.csv");
    toast.closeAll();
  };

  return handleDownload;
}
