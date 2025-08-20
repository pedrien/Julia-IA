"use client";
import * as React from "react";
import { HeroUIProvider as ProviderHeroUI } from "@heroui/react";

export default function HeroUIProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProviderHeroUI locale="fr-FR">{children}</ProviderHeroUI>;
}
