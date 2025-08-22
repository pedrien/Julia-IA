"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import "./style.css";

import React, { JSX } from "react";

interface PropsIconModal {
  type: "success" | "error" | "warning" | "info";
}

const IconModal = ({ type }: PropsIconModal) => {
  const icons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-6 w-6 fill-green-500"
      >
        <path d="M7.976563 1.019531C7.863281 1.027344 7.757813 1.074219 7.671875 1.148438L6.464844 2.242188L4.871094 1.898438C4.621094 1.847656 4.367188 1.992188 4.289063 2.234375L3.789063 3.789063L2.234375 4.289063C1.992188 4.367188 1.847656 4.617188 1.898438 4.867188L2.242188 6.464844L1.148438 7.671875C0.976563 7.863281 0.976563 8.15625 1.148438 8.34375L2.242188 9.554688L1.898438 11.152344C1.847656 11.402344 1.992188 11.652344 2.234375 11.730469L3.789063 12.230469L4.289063 13.78125C4.367188 14.027344 4.617188 14.171875 4.867188 14.121094L6.464844 13.777344L7.671875 14.871094C7.863281 15.042969 8.15625 15.042969 8.34375 14.871094L9.554688 13.777344L11.152344 14.121094C11.402344 14.171875 11.652344 14.027344 11.730469 13.78125L12.230469 12.230469L13.78125 11.730469C14.027344 11.652344 14.171875 11.402344 14.121094 11.152344L13.777344 9.554688L14.871094 8.34375C15.042969 8.15625 15.042969 7.863281 14.871094 7.671875L13.777344 6.464844L14.121094 4.867188C14.171875 4.617188 14.027344 4.367188 13.78125 4.289063L12.230469 3.789063L11.730469 2.234375C11.652344 1.992188 11.402344 1.847656 11.152344 1.898438L9.554688 2.242188L8.34375 1.148438C8.257813 1.070313 8.144531 1.023438 8.027344 1.019531C8.011719 1.019531 7.992188 1.019531 7.976563 1.019531 Z M 8.007813 2.195313L9.074219 3.15625C9.195313 3.265625 9.359375 3.308594 9.515625 3.273438L10.917969 2.972656L11.359375 4.339844C11.40625 4.492188 11.527344 4.613281 11.679688 4.664063L13.046875 5.101563L12.746094 6.507813C12.710938 6.664063 12.757813 6.824219 12.863281 6.945313L13.828125 8.007813L12.863281 9.074219C12.753906 9.195313 12.710938 9.359375 12.746094 9.515625L13.046875 10.917969L11.679688 11.359375C11.527344 11.40625 11.40625 11.527344 11.359375 11.679688L10.917969 13.046875L9.515625 12.746094C9.359375 12.710938 9.195313 12.753906 9.074219 12.863281L8.007813 13.828125L6.945313 12.863281C6.824219 12.757813 6.664063 12.710938 6.507813 12.746094L5.101563 13.046875L4.664063 11.679688C4.613281 11.527344 4.492188 11.40625 4.339844 11.359375L2.976563 10.917969L3.273438 9.515625C3.308594 9.359375 3.265625 9.195313 3.15625 9.074219L2.195313 8.007813L3.15625 6.945313C3.265625 6.828125 3.308594 6.664063 3.273438 6.507813L2.976563 5.101563L4.339844 4.664063C4.492188 4.613281 4.613281 4.492188 4.664063 4.339844L5.101563 2.972656L6.503906 3.273438C6.660156 3.308594 6.824219 3.265625 6.945313 3.15625 Z M 10.652344 5.640625L7.496094 8.683594L5.71875 7.011719L5.03125 7.738281L7.503906 10.066406L11.347656 6.359375Z" />
      </svg>
    ),

    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-6 w-6 fill-red-500"
      >
        <path d="M7.5 1.007813C6.957031 1.007813 6.414063 1.265625 6.105469 1.78125L0.226563 11.605469C-0.398438 12.644531 0.402344 14 1.617188 14L13.378906 14C14.597656 14 15.398438 12.644531 14.777344 11.605469L8.894531 1.78125C8.585938 1.265625 8.042969 1.007813 7.5 1.007813 Z M 7.5 1.992188C7.707031 1.992188 7.914063 2.09375 8.039063 2.296875L13.917969 12.117188C14.164063 12.527344 13.890625 13 13.378906 13L1.617188 13C1.109375 13 0.835938 12.527344 1.082031 12.117188L6.960938 2.296875C7.085938 2.09375 7.292969 1.992188 7.5 1.992188 Z M 6.992188 5L6.992188 10L7.992188 10L7.992188 5 Z M 6.992188 11L6.992188 12L7.992188 12L7.992188 11Z" />
      </svg>
    ),

    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-6 w-6 fill-yellow-500"
      >
        <path d="M7.5 1C3.917969 1 1 3.917969 1 7.5C1 11.082031 3.917969 14 7.5 14C11.082031 14 14 11.082031 14 7.5C14 3.917969 11.082031 1 7.5 1 Z M 7.5 2C10.542969 2 13 4.457031 13 7.5C13 10.542969 10.542969 13 7.5 13C4.457031 13 2 10.542969 2 7.5C2 4.457031 4.457031 2 7.5 2 Z M 7 4L7 9L8 9L8 4 Z M 7 10L7 11L8 11L8 10Z" />
      </svg>
    ),

    info: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        className="h-6 w-6 fill-blue-500"
      >
        <path d="M8 1C6.902344 1 6 1.902344 6 3C6 4.097656 6.902344 5 8 5C9.097656 5 10 4.097656 10 3C10 1.902344 9.097656 1 8 1 Z M 8 2C8.558594 2 9 2.441406 9 3C9 3.558594 8.558594 4 8 4C7.441406 4 7 3.558594 7 3C7 2.441406 7.441406 2 8 2 Z M 5 6L5 7L6 7L6 13L5 13L5 14L11 14L11 13L10 13L10 7.5C10 6.675781 9.324219 6 8.5 6 Z M 7 7L8.5 7C8.78125 7 9 7.21875 9 7.5L9 13L7 13Z" />
      </svg>
    ),
  };
  return icons[type];
};
interface ModalNotificationProps {
  open: boolean;
  type: "success" | "error" | "warning" | "info";
  onClose: () => void;
  title?: string;
  message?: string;
  labelAction?: string;
  onConfirm?: () => void;
}
const defaultTitles = {
  success: "Succès",
  error: "Erreur",
  warning: "Attention",
  info: "Information",
};

const defaultMessages = {
  success: "Opération réussie.",
  error: "Une erreur s'est produite.",
  warning: "Veuillez faire attention.",
  info: "Voici quelques informations.",
};

const mapTypeToColor = (
  type: "success" | "error" | "warning" | "info"
):
  | "success"
  | "warning"
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | undefined => {
  switch (type) {
    case "success":
      return "success";
    case "error":
      return "danger";
    case "warning":
      return "warning";
    case "info":
      return "primary";
    default:
      return undefined;
  }
};

/**
 * ModalNotification component displays a modal with a notification message.
 *
 * @param {boolean} open - Determines if the modal is open or closed.
 * @param {string} type - The type of notification (e.g., success, error, info).
 * @param {() => void} onClose - Function to call when the modal is closed.
 * @param {string} [title] - Optional title for the modal. Defaults to a predefined title based on the type.
 * @param {string} [message] - Optional message for the modal. Defaults to a predefined message based on the type.
 * @param {string} [labelAction="Fermer"] - Label for the action button. Defaults to "Fermer".
 * @param {() => void} [onConfirm] - Optional function to call when the action button is pressed. If not provided, the modal will close.
 *
 * @returns {JSX.Element} The rendered ModalNotification component.
 */
function ModalNotification({
  open,
  type,
  onClose,
  title,
  message,
  labelAction = "Fermer",
  onConfirm,
}: ModalNotificationProps): JSX.Element {
  const modalTitle = title || defaultTitles[type];
  const modalMessage = message || defaultMessages[type];

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      placement="center"
      isDismissable={false}
      closeButton={<></>}
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <div
              className={`modal-notification-${type} rounded-md flex items-center justify-center flex-none p-3`}
            >
              <IconModal type={type} />
            </div>
            <h2 className="font-Bold text-2xl text-center text">
              {modalTitle}
            </h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm font-FustatRegular text-center text-default-600">
            {modalMessage}
          </p>
        </ModalBody>
        <ModalFooter className="flex flex-col">
          <Button
            onPress={() => {
              if (onConfirm) {
                onConfirm();
              } else {
                onClose();
              }
            }}
            color={mapTypeToColor(type)}
            radius="sm"
            variant="ghost"
          >
            {labelAction}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalNotification;
