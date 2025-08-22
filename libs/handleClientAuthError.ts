"use client";

import { APP_CONSTANTS } from "@/constants/appConstants";
import { addToast } from "@heroui/react";
import { signOut } from "next-auth/react";

/**
 * Handles client-side authentication errors by displaying each error message through a toast notification.
 * If any error message corresponds to a session expiration, invalid session, or unauthorized access, the page is automatically reloaded.
 *
 * @param serverActionErrorMsgs - The error messages received from the server as an array.
 * @param showMessage - Whether to show toast notifications for errors (default: true)
 */
export const handleClientAuthError = (
  serverActionErrorMsgs: string[],
  showMessage: boolean = true
) => {
  const {
    MESSAGE_AUTH_SESSION_EXPIRED,
    MESSAGE_AUTH_INVALID_SESSION,
    MESSAGE_AUTH_UNAUTHORIZED_ACCESS,
    MESSAGE_AUTH_INVALID_CREDENTIALS,
  } = APP_CONSTANTS;

  // Set of messages that should trigger a reload/sign out
  const reloadMessages = new Set([
    MESSAGE_AUTH_SESSION_EXPIRED,
    MESSAGE_AUTH_INVALID_SESSION,
    MESSAGE_AUTH_UNAUTHORIZED_ACCESS,
    MESSAGE_AUTH_INVALID_CREDENTIALS,
  ]);

  let shouldReload = false;

  if (
    Array.isArray(serverActionErrorMsgs) &&
    serverActionErrorMsgs.every((msg) => typeof msg === "string")
  ) {
    serverActionErrorMsgs.forEach((errorMsg) => {
      if (showMessage) {
        addToast({ title: errorMsg, color: "danger" });
      }
      if (reloadMessages.has(errorMsg)) {
        shouldReload = true;
      }
    });
  } else if (serverActionErrorMsgs.length > 0) {
    // Handle case where error is an object with an 'error' property
    const errorObj = serverActionErrorMsgs[0] as { error?: string };
    if (typeof errorObj === "object" && errorObj.error) {
      if (showMessage) addToast({ title: errorObj.error, color: "danger" });
    } else {
      if (showMessage)
        addToast({
          title:
            "Une erreur inattendue s'est produite. Veuillez réessayer. Si le problème persiste, contactez le service client.",
          color: "danger",
        });
    }
  } else {
    if (showMessage)
      addToast({
        title:
          "Une erreur inattendue s'est produite. Veuillez réessayer. Si le problème persiste, contactez le service client.",
        color: "danger",
      });
  }

  // If only one error and it's a session expired message, trigger reload
  if (
    serverActionErrorMsgs.length === 1 &&
    serverActionErrorMsgs[0] === MESSAGE_AUTH_SESSION_EXPIRED
  ) {
    shouldReload = true;
  }

  if (shouldReload) {
    signOut({ callbackUrl: window.location.href });
  }
};
