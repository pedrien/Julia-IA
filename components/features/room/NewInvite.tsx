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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddGuestMeeting } from "@/hooks/features/meetings/hook.add-guest-meeting";
import {
  AddGuestMeetingSchema,
  addGuestMeetingSchema,
} from "@/validators/meetings/validator.add-guest-meeting";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
import { ENUM_PARTICIPANT_TYPE } from "@/types/enums/participants/enum.type-participants";
import { useQueryClient } from "@tanstack/react-query";

const NewInvite = ({ idMeeting }: { idMeeting: string }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, closeModal } = useModalContext();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const [isPendingGuest, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const { mutate: addGuestMeeting } = useAddGuestMeeting({
    onSuccessCallback: () => {
      reset({
        meetingId: idMeeting,
        type: "EXTERNE" as ENUM_PARTICIPANT_TYPE,
        external_name: "",
        external_email: "",
        external_phone: "",
        external_company: "",
      });
      queryClient.invalidateQueries({
        queryKey: ["meeting-participants", idMeeting],
      });
      closeModal("NewInvite");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AddGuestMeetingSchema>({
    resolver: zodResolver(addGuestMeetingSchema),
    defaultValues: {
      meetingId: idMeeting,
      type: "EXTERNE" as ENUM_PARTICIPANT_TYPE,
      external_name: "",
      external_email: "",
      external_phone: "",
      external_company: "",
    },
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: AddGuestMeetingSchema) => {
      startTransition(async () => {
        addGuestMeeting(data);
      });
    },
    [addGuestMeeting]
  );
  return (
    <>
      <Modal
        size="md"
        isOpen={isModalOpen("NewInvite")}
        onClose={() => {
          reset({
            meetingId: idMeeting,
            type: "EXTERNE" as ENUM_PARTICIPANT_TYPE,
            external_name: "",
            external_email: "",
            external_phone: "",
            external_company: "",
          });
          closeModal("NewInvite");
        }}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div>
                  <h5 className="text md font-medium mb-2">
                    {"Ajout d'un invité"}
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
                      htmlFor="external_name"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Nom
                    </label>

                    <Input
                      type="text"
                      placeholder="Nom du participant"
                      id="external_name"
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
                      htmlFor="external_email"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Email
                    </label>

                    <Input
                      type="email"
                      placeholder="exemple@gmail.com"
                      id="external_email"
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
                      htmlFor="external_phone"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Téléphone
                    </label>

                    <Input
                      type="text"
                      placeholder="Ex: +243810678167"
                      id="external_phone"
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
                  <div className="col-span-1">
                    <label
                      htmlFor="external_company"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Entreprise (optionnel)
                    </label>

                    <Input
                      type="text"
                      placeholder="Nom de l'entreprise"
                      id="external_company"
                      labelPlacement="outside"
                      variant="bordered"
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                        input:
                          "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                      }}
                      {...register("external_company")}
                      errorMessage={errors.external_company?.message}
                      isInvalid={!!errors.external_company}
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
                        meetingId: idMeeting,
                        type: "EXTERNE" as ENUM_PARTICIPANT_TYPE,
                        external_name: "",
                        external_email: "",
                        external_phone: "",
                        external_company: "",
                      });
                      closeModal("NewInvite");
                    }}
                    isDisabled={isSubmitting || isPendingGuest}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                    isLoading={isSubmitting || isPendingGuest}
                    isDisabled={!isValid}
                    onPress={() => setIsModalOpenConfirmation(true)}
                  >
                    Ajouter l&apos;invité
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
        message="Voulez-vous vraiment ajouter cet invité à la réunion ?"
      />
    </>
  );
};

export default NewInvite;
