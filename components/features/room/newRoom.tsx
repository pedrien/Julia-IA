import React, { useCallback, useRef, useTransition, useState } from "react";
import type { SelectedItems } from "@heroui/react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Input,
  Select,
  SelectItem,
  Textarea,
  Chip,
} from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { X, Plus, RefreshCcw } from "lucide-react";
import { useGetListParticipants } from "@/hooks/features/participants/hook.list-participants";
import { Participant } from "@/validators/participants/validator.list-participants";
import { helpEnumParticipantType } from "@/types/enums/participants/enum.type-participants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createMeetingSchema } from "@/validators/meetings/validator.create-meeting";
import { useCreateMeeting } from "@/hooks/features/meetings/hook.create-meeting";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";

const NewRoom = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, closeModal, openModal } = useModalContext();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );

  const [isPendingMeeting, startTransition] = useTransition();
  const { mutate: createMeeting } = useCreateMeeting({
    onSuccessCallback: () => {
      reset({
        title: "",
        description: "",
        scheduled_start_time: "",
        location: "",
        participants_interne: [],
        participants_externe: [],
      });
      setSelectedParticipants([]);
      closeModal("ModalNewRoom");
    },
  });

  const {
    data: participants,
    isLoading,
    isError,
    refetch,
  } = useGetListParticipants();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      title: "",
      description: "",
      scheduled_start_time: "",
      location: "",
      participants_interne: [],
      participants_externe: [],
    },
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: {
      title: string;
      description: string;
      scheduled_start_time: string;
      location: string;
      participants_interne: string[];
      participants_externe: string[];
    }) => {
      startTransition(async () => {
        // Convertir le format datetime-local vers le format attendu par l'API
        const formattedData = {
          ...data,
          scheduled_start_time:
            data.scheduled_start_time.replace("T", " ") + ":00",
        };
        createMeeting(formattedData);
      });
    },
    [createMeeting]
  );

  const handleParticipantSelection = (keys: string[]) => {
    setSelectedParticipants(keys);

    // Séparer les participants internes et externes
    const internalParticipants: string[] = [];
    const externalParticipants: string[] = [];

    keys.forEach((key) => {
      const participant = participants?.data.find((p) => p.id === key);
      if (participant) {
        if (participant.type === "INTERNE") {
          internalParticipants.push(key);
        } else {
          externalParticipants.push(key);
        }
      }
    });

    setValue("participants_interne", internalParticipants);
    setValue("participants_externe", externalParticipants);
  };

  return (
    <>
      <Modal
        size="5xl"
        isOpen={isModalOpen("ModalNewRoom")}
        onClose={() => {
          reset({
            title: "",
            description: "",
            scheduled_start_time: "",
            location: "",
            participants_interne: [],
            participants_externe: [],
          });
          setSelectedParticipants([]);
          closeModal("ModalNewRoom");
        }}
        isDismissable={false}
      >
        <ModalContent>
          {() => (
            <>
              <ModalBody className="lg:px-2">
                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-1">
                      <div className="w-full h-full flex flex-col justify-center lg:px-6 lg:py-8">
                        <h2 className="text-colorTitle lg:text-[24px] font-semibold mb-2">
                          Nouvelle réunion
                        </h2>
                        <p className="text-sm text-colorMuted lg:mb-6">
                          Créer une nouvelle réunion pour commencer à discuter
                          avec vos collègues.
                        </p>
                        <form
                          ref={formRef}
                          className="grid grid-cols-1 gap-3 lg:gap-4"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="col-span-1">
                            <label
                              htmlFor="title"
                              className="text-[14px] text-colorTitle block mb-1"
                            >
                              Titre
                            </label>

                            <Input
                              type="text"
                              placeholder="Titre de la réunion"
                              id="title"
                              labelPlacement="outside"
                              variant="bordered"
                              classNames={{
                                inputWrapper:
                                  "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                                input:
                                  "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                              }}
                              {...register("title")}
                              errorMessage={errors.title?.message}
                              isInvalid={!!errors.title}
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              htmlFor="description"
                              className="text-[14px] text-colorTitle block mb-1"
                            >
                              Description
                            </label>

                            <Textarea
                              id="description"
                              placeholder="Description de la réunion"
                              variant="bordered"
                              minRows={2}
                              classNames={{
                                inputWrapper:
                                  "bg-transparent border-colorBorder border-[1px] shadow-none ",
                                input:
                                  "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                              }}
                              {...register("description")}
                              errorMessage={errors.description?.message}
                              isInvalid={!!errors.description}
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              htmlFor="scheduled_start_time"
                              className="text-[14px] text-colorTitle block mb-1"
                            >
                              Date et heure
                            </label>

                            <Input
                              type="datetime-local"
                              placeholder="Date et heure de la réunion"
                              id="scheduled_start_time"
                              labelPlacement="outside"
                              variant="bordered"
                              classNames={{
                                inputWrapper:
                                  "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                                input:
                                  "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                              }}
                              {...register("scheduled_start_time")}
                              errorMessage={
                                errors.scheduled_start_time?.message
                              }
                              isInvalid={!!errors.scheduled_start_time}
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              htmlFor="location"
                              className="text-[14px] text-colorTitle block mb-1"
                            >
                              Lieu
                            </label>

                            <Input
                              type="text"
                              placeholder="Lieu de la réunion"
                              id="location"
                              labelPlacement="outside"
                              variant="bordered"
                              classNames={{
                                inputWrapper:
                                  "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                                input:
                                  "text-colorTitle placeholder:text-colorMuted placeholder:opacity-50",
                              }}
                              {...register("location")}
                              errorMessage={errors.location?.message}
                              isInvalid={!!errors.location}
                            />
                          </div>
                          <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-2">
                              <label
                                htmlFor="participants"
                                className="text-[14px] text-colorTitle block"
                              >
                                Participants
                              </label>
                              <Button
                                className="bg-bgGray text-colorTitle min-w-0 p-0 w-[24px] h-[24px]"
                                onPress={() => openModal("ModalNewUser")}
                              >
                                <Plus size={14}></Plus>
                              </Button>
                            </div>

                            <Select
                              placeholder="Selectionnez les participants"
                              variant="bordered"
                              selectionMode="multiple"
                              items={participants?.data || []}
                              selectedKeys={selectedParticipants}
                              onSelectionChange={(keys) =>
                                handleParticipantSelection(
                                  Array.from(keys) as string[]
                                )
                              }
                              renderValue={(
                                items: SelectedItems<Participant>
                              ) => {
                                return (
                                  <div className="flex flex-wrap gap-1">
                                    {items.map((item) => (
                                      <Chip
                                        key={item.key}
                                        className="bg-bgGray text-colorTitle text-xs border-0"
                                      >
                                        {item.data?.name}
                                      </Chip>
                                    ))}
                                  </div>
                                );
                              }}
                              isMultiline={true}
                              classNames={{
                                trigger:
                                  "border border-colorBorder shadow-none py-2 min-h-[42px] text-darkenGreen",
                                value: "text-colorMuted",
                              }}
                              disallowEmptySelection
                              aria-label="Participants"
                              isLoading={isLoading}
                              endContent={
                                isError ? (
                                  <Button
                                    className="bg-bgGray text-colorTitle  rounded-full"
                                    onPress={() => refetch()}
                                    isIconOnly
                                  >
                                    <RefreshCcw size={14}></RefreshCcw>
                                  </Button>
                                ) : null
                              }
                            >
                              {(user) => (
                                <SelectItem key={user.id} textValue={user.name}>
                                  <div className="flex gap-2 items-center">
                                    <div className="w-[32px] h-[32px] bg-lightPrimaryColor rounded-full flex items-center justify-center">
                                      {user.name.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-small text-colorTitle">
                                        {user.name}
                                      </span>
                                      <span className="text-tiny text-default-400">
                                        Participant{" "}
                                        {helpEnumParticipantType(user.type)}
                                      </span>
                                    </div>
                                  </div>
                                </SelectItem>
                              )}
                            </Select>
                            {(errors.participants_interne ||
                              errors.participants_externe) && (
                              <p className="text-danger text-tiny mt-1">
                                {errors.participants_interne?.message ||
                                  errors.participants_externe?.message}
                              </p>
                            )}
                          </div>
                          <div className="col-span-1">
                            <Button
                              className="w-full h-auto py-3 bg-primaryColor text-white mt-2"
                              isLoading={isSubmitting || isPendingMeeting}
                              isDisabled={!isValid}
                              onPress={() => setIsModalOpenConfirmation(true)}
                            >
                              Démarrer
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="block-img rounded-xl relative overflow-hidden lg:min-h-[570px] h-full">
                        <Button
                          className="absolute z-10 p-0 min-w-0 h-[36px] w-[36px] rounded-full bg-bgCard top-2 right-2"
                          onPress={() => {
                            reset({
                              title: "",
                              description: "",
                              scheduled_start_time: "",
                              location: "",
                              participants_interne: [],
                              participants_externe: [],
                            });
                            setSelectedParticipants([]);
                            closeModal("ModalNewRoom");
                          }}
                        >
                          <X size={18}></X>
                        </Button>
                        <video
                          src="/videos/2.mp4"
                          className="w-full h-full object-cover"
                          playsInline
                          loop
                          autoPlay
                          muted
                        ></video>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
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
        message="Voulez-vous vraiment créer cette réunion ?"
      />
    </>
  );
};

export default NewRoom;
