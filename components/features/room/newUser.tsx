import React, { useCallback, useRef, useTransition, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Input,
} from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";

import {
  CreateParticipantSchema,
  createParticipantSchema,
} from "@/validators/participants/validator.create-participant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
import { useCreateParticipant } from "@/hooks/features/participants/hook.create-participant";

const NewUser = ({
  isForGuest,
  onSuccess,
}: {
  isForGuest?: boolean;
  onSuccess?: () => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, closeModal } = useModalContext();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);

  const [isPendingParticipant, startTransition] = useTransition();
  const { mutate: createParticipant } = useCreateParticipant({
    onSuccessCallback: () => {
      reset({
        type: isForGuest ? "EXTERNE" : "INTERNE",
        external_name: "",
        external_email: "",
        external_phone: "",
        external_company: "",
      });
      onSuccess?.();
      closeModal("ModalNewUser");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<CreateParticipantSchema>({
    resolver: zodResolver(createParticipantSchema),
    defaultValues: {
      type: isForGuest ? "EXTERNE" : "INTERNE",
      external_name: "",
      external_email: "",
      external_phone: "",
      external_company: "",
    },
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: CreateParticipantSchema) => {
      startTransition(async () => {
        createParticipant(data);
      });
    },
    [createParticipant]
  );

  return (
    <>
      <Modal
        size="md"
        isOpen={isModalOpen("ModalNewUser")}
        onClose={() => {
          reset({
            type: "EXTERNE",
            external_name: "",
            external_email: "",
            external_phone: "",
            external_company: "",
          });
          closeModal("ModalNewUser");
        }}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div>
                  <h5 className="text md font-medium mb-2">
                    {isForGuest ? "Nouvel invité" : "Nouveau participant"}
                  </h5>
                </div>
              </ModalHeader>
              <ModalBody>
                <form
                  ref={formRef}
                  className="grid grid-cols-1 gap-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Nom
                    </label>

                    <Input
                      type="text"
                      placeholder="Nom du participant"
                      id="name"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                        input:
                          "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                      }}
                      {...register("external_name")}
                      errorMessage={errors.external_name?.message}
                      isInvalid={!!errors.external_name}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Email
                    </label>

                    <Input
                      type="text"
                      placeholder="exemple@gmail.com"
                      id="name"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                        input:
                          "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                      }}
                      {...register("external_email")}
                      errorMessage={errors.external_email?.message}
                      isInvalid={!!errors.external_email}
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="name"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Téléphone
                    </label>

                    <Input
                      type="text"
                      placeholder="Ex: +243810678167"
                      id="name"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                        input:
                          "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                      }}
                      {...register("external_phone")}
                      errorMessage={errors.external_phone?.message}
                      isInvalid={!!errors.external_phone}
                    />
                  </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <div className="flex items-center gap-3 w-full mt-1">
                  <Button
                    className="w-1/2 bg-bgGray h-auto py-3 text-colorTitle"
                    onPress={() => {
                      reset({
                        type: "EXTERNE",
                        external_name: "",
                        external_email: "",
                        external_phone: "",
                        external_company: "",
                      });
                      closeModal("ModalNewUser");
                    }}
                    isDisabled={isSubmitting || isPendingParticipant}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                    isLoading={isSubmitting || isPendingParticipant}
                    isDisabled={!isValid}
                    onPress={() => setIsModalOpenConfirmation(true)}
                  >
                    Créer
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ModalConfirmation
        isOpen={isModalOpenConfirmation}
        onCancel={() => setIsModalOpenConfirmation(false)}
        onConfirm={() => {
          formRef.current?.requestSubmit();
          setIsModalOpenConfirmation(false);
        }}
        title="Confirmation"
        message={`Voulez-vous vraiment ajouter ${
          isForGuest ? "cet invité" : "ce participant"
        } ?`}
      />
    </>
  );
};

export default NewUser;
