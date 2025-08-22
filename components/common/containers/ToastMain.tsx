"use client";
import React, { JSX } from "react";
import { ToastProvider } from "@heroui/react";

/**
 * ToastMain component to display toast notifications.
 *
 * This component utilizes d`react-toastify` to show notifications, adapting its theme based on the current application theme.
 *
 * @returns {JSX.Element} - The rendered ToastContainer component.
 */
function ToastMain(): JSX.Element {
  return <ToastProvider />;
}

export default ToastMain;
