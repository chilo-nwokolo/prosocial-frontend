"use client";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Box } from "@chakra-ui/react";
import AdminNavBar from "../components/NavBar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop();
  return (
    <Box as="main">
      <AdminNavBar />
      <Box mt="20" mx="10">
        {children}
      </Box>
    </Box>
  );
}
