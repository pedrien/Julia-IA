import React from "react";
import Container from "./_layout/container";

export default async function PageDetailRoom({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Container id={id} />;
}
