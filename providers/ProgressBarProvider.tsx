"use client";

import { AppProgressProvider as Providers } from "@bprogress/next";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  return (
    <Providers
      height="4px"
      color="#c6e76c"
      options={{ showSpinner: true }}
      shallowRouting
    >
      {children}
    </Providers>
  );
}
