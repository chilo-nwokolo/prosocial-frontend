import { externalLinks } from "@/utils/constants";
import Link from "next/link";
import React from "react";

export default function EmailLink() {
  return (
    <Link
      href={`mailto:${externalLinks.email}`}
      style={{ color: "#226db4", textDecoration: "underline" }}
      /*style_hover={{ textDecoration: "none" }}*/
    >
      {externalLinks.email}
    </Link>
  );
}
