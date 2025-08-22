"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

interface ClientProps {
  children: React.ReactNode;
}

/**
 * A React component that renders its children only on the client side.
 * This component ensures that its children are only rendered after the
 * component has been mounted on the client side, preventing issues
 * related to server-side rendering (SSR).
 *
 * @param {ClientProps} param0 - The props object.
 * @param {React.ReactNode} param0.children - The child elements to be rendered.
 * @returns {React.ReactNode|null} The child elements if the component has
 * mounted, otherwise null.
 */
function ClientOnly({ children }: ClientProps): React.ReactNode | null {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <SessionProvider>{children}</SessionProvider>;
}

export default ClientOnly;
