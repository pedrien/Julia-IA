"use client";
import { Spinner } from "@heroui/react";
import "./style.css";

import React, { JSX } from "react";

/**
 * Loader component that renders a span element with a loader class.
 * This component can be used to indicate loading state in the application.
 *
 * @returns {JSX.Element} A span element with the class "loader__box".
 */
function Loader(): JSX.Element {
  return <Spinner color="primary" size="lg" />;
}

export default Loader;
