"use client";
import useScrollToTop from "@/hooks/useScrollToTop";
import { Box } from "@chakra-ui/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollToTop();
  return <Box as="main">{children}</Box>;
}
