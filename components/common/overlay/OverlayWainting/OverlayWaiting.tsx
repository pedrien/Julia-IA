"use client";

import { useLoading } from "@/contexts/Overlay/LoadingContext";
import "./style.css";

import React, { JSX } from "react";
import Loader from "../../loader/Loader";

/**
 * OverlayWaiting component displays a loading overlay when the application is in a loading state.
 * It uses the `useLoading` hook to determine if the loading state is active.
 *
 * @returns {JSX.Element | null} A JSX element containing the loading overlay, or null if not loading.
 */
function OverlayWaiting(): JSX.Element | null {
  const { isLoading } = useLoading();

  if (!isLoading) return null;
  return (
    <div className="loader__container__api inset-0">
      <Loader />
    </div>
  );
}

export default OverlayWaiting;
