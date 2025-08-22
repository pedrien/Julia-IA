"use client";

import React, { JSX } from "react";
import { BsInfoLg } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import PulseIcon from "@/components/icons/PulseIcon/PulseIcon";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
interface PropsModalConfirmation {
  type?: "delete" | "edit" | "add";
  isOpen: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void;
  labelConfirm?: string;
  labelCancel?: string;
}

/**
 * ModalConfirmation component renders a modal dialog for confirming actions such as add, edit, or delete.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.type="add"] - The type of confirmation modal. Can be "add", "edit", or "delete".
 * @param {boolean} props.isOpen - Indicates whether the modal is open or not.
 * @param {string} [props.title] - The title of the modal. Defaults to a title based on the type.
 * @param {string} [props.message] - The message of the modal. Defaults to a message based on the type.
 * @param {function} props.onCancel - The callback function to call when the cancel button is pressed.
 * @param {function} props.onConfirm - The callback function to call when the confirm button is pressed.
 * @param {string} [props.labelConfirm] - The label for the confirm button. Defaults to a label based on the type.
 * @param {string} [props.labelCancel] - The label for the cancel button. Defaults to "Annuler".
 *
 * @returns {JSX.Element} The rendered ModalConfirmation component.
 */
function ModalConfirmation({
  type = "add",
  isOpen,
  title,
  message,
  onCancel,
  onConfirm,
  labelConfirm,
  labelCancel,
}: PropsModalConfirmation): JSX.Element {
  const defaultTitle =
    type === "delete"
      ? "Confirmation de suppression"
      : type === "edit"
      ? "Confirmation de modification"
      : "Confirmation d'ajout";
  const defaultMessage =
    type === "delete"
      ? "Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible..."
      : type === "edit"
      ? "Êtes-vous sûr de vouloir modifier cet élément ?"
      : "Êtes-vous sûr de vouloir ajouter cet élément ?";
  const defaultLabelConfirm =
    type === "delete" ? "Supprimer" : type === "edit" ? "Modifier" : "Ajouter";
  const defaultLabelCancel = "Annuler";

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      onClose={onCancel}
      // closeButton={<></>}
      size="md"
      className="modal__app z-[100000]"
      radius="sm"
      placement="center"
      hideCloseButton
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
        <ModalBody className="modal__body flex flex-col items-start pb-8">
          <div className="flex flex-none w-full items-start justify-between pl-3 pb-5">
            <PulseIcon
              color={
                type === "delete"
                  ? "#ef4444"
                  : type === "edit"
                  ? "#F5A524"
                  : "#17C964"
              }
              icon={<BsInfoLg color="white" size={25} />}
            />
            <Button
              isIconOnly
              color="default"
              aria-label="Close"
              variant="bordered"
              radius="sm"
              className=" translate-y-[-10px] border-1 "
              size="sm"
              onPress={onCancel}
            >
              <IoCloseOutline className="text" size={20} />
            </Button>
          </div>
          <p className="text-black text-left font-bold text-xl">
            {title || defaultTitle}
          </p>
          <p className="text-default-800 text-base text-left ">
            {message || defaultMessage}
          </p>
        </ModalBody>
        <ModalFooter className="bg-gray-50 grid grid-cols-2 gap-3">
          <Button
            color="default"
            variant="ghost"
            onPress={onCancel}
            radius="sm"
            className="border-1"
          >
            <IoCloseOutline className="text" size={20} />{" "}
            {labelCancel || defaultLabelCancel}
          </Button>
          <Button
            color={
              type === "delete"
                ? "danger"
                : type === "edit"
                ? "warning"
                : "success"
            }
            onPress={onConfirm}
            radius="sm"
            className="text-white"
          >
            <IoMdCheckmark className="text-white" size={20} />{" "}
            {labelConfirm || defaultLabelConfirm}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalConfirmation;
