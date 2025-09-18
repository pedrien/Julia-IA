import React, { useCallback, useRef, useTransition, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
} from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddObservation,
  addObservationSchema,
} from "@/validators/meetings/validator.add-obersvation";
import { useAddMeetingObservation } from "@/hooks/features/meetings/hook.add-meeting-observation";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";

const NewObserv = ({
  idMeeting,
  onSuccess,
}: {
  idMeeting: string;
  onSuccess?: () => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, closeModal } = useModalContext();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);

  const [isPendingObservation, startTransition] = useTransition();

  const { mutate: addObservation } = useAddMeetingObservation({
    onSuccessCallback: () => {
      reset({
        meetingId: idMeeting,
        content: "",
      });
      onSuccess?.();
      closeModal("NewObserv");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<AddObservation>({
    resolver: zodResolver(addObservationSchema),
    defaultValues: {
      meetingId: idMeeting,
      content: "",
    },
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: AddObservation) => {
      startTransition(async () => {
        addObservation(data);
      });
    },
    [addObservation]
  );

  return (
    <>
      <Modal
        size="md"
        isOpen={isModalOpen("NewObserv")}
        onClose={() => {
          reset({
            meetingId: idMeeting,
            content: "",
          });
          closeModal("NewObserv");
        }}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div>
                  <h5 className="text md font-medium mb-2">
                    {"Nouvelle observation"}
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
                      htmlFor="content"
                      className="text-[14px] text-colorTitle block mb-1"
                    >
                      Observation
                    </label>
                    <Textarea
                      id="content"
                      placeholder="Laissez votre observation"
                      variant="bordered"
                      minRows={4}
                      classNames={{
                        inputWrapper:
                          "bg-transparent border-colorBorder border-[1px] shadow-none",
                        input:
                          "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                      }}
                      {...register("content")}
                      isInvalid={!!errors.content}
                      errorMessage={errors.content?.message}
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
                        content: "",
                      });
                      closeModal("NewObserv");
                    }}
                    isDisabled={isSubmitting || isPendingObservation}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                    isLoading={isSubmitting || isPendingObservation}
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
        message="Voulez-vous vraiment ajouter cette observation ?"
      />
    </>
  );
};

export default NewObserv;
