import { externalLinks } from "@/utils/constants";
import Link from "next/link";
import React from "react";

export default function EmailLink() {
  return (
    <Link href={`mailto:${externalLinks.email}`} style={{ color: "blue" }}>
      {externalLinks.email}
    </Link>
  );
}
