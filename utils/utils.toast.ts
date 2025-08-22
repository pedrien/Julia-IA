import { addToast } from "@heroui/react";

interface ToastParams {
  title: string;
  description: string;
  timeout?: number;
  shouldShowTimeoutProgess?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

/**
 * Displays a toast notification with the specified parameters.
 *
 * @param {Object} params - The parameters for the toast notification.
 * @param {string} params.title - The title of the toast notification.
 * @param {string} params.description - The description of the toast notification.
 * @param {number} [params.timeout=3000] - The duration (in milliseconds) for which the toast should be displayed.
 * @param {boolean} [params.shouldShowTimeoutProgess=true] - Whether to show the timeout progress bar.
 * @param {string} [params.color="default"] - The color of the toast notification.
 */
export const showToast = ({
  title,
  description,
  timeout = 3000,
  shouldShowTimeoutProgess = true,
  color = "default",
}: ToastParams) => {
  addToast({
    title,
    description,
    timeout,
    color,
    shouldShowTimeoutProgress: shouldShowTimeoutProgess,
  });
};
