"use client";

import ViewApp from "@/components/common/containers/ViewApp";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ViewApp>{children}</ViewApp>;
}
