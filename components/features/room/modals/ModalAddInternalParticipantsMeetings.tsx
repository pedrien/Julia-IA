import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useAddInternalParticipantsMeeting } from "@/hooks/features/meetings/hook.add-internal-participants-meeting";
import { useGetListParticipants } from "@/hooks/features/participants/hook.list-participants";
import { helpEnumParticipantType } from "@/types/enums/participants/enum.type-participants";
import { Participant } from "@/validators/participants/validator.list-participants";
import type { SelectedItems } from "@heroui/react";
import {
  Avatar,
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  Select,
  SelectItem,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic, Plus, RefreshCcw, X } from "lucide-react";
import { useCallback, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  AddInternalParticipantSchema,
  addInternalParticipantSchema,
} from "@/validators/meetings/validator.add-internal-participant";

const ModalAddInternalParticipantsMeetings = ({
  meetingId,
  listParticipants,
}: {
  meetingId: string;
  listParticipants: Participant[];
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { isModalOpen, closeModal, openModal } = useModalContext();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const queryClient = useQueryClient();
  const [isPendingMeeting, startTransition] = useTransition();
  const { mutate: addInternalParticipantsMeeting } =
    useAddInternalParticipantsMeeting({
      onSuccessCallback: (data) => {
        console.log("Meeting created successfully:", data);

        // Extraire l'ID de la réponse
        queryClient.invalidateQueries({
          queryKey: ["meeting-participants", meetingId],
        });

        // Reset du formulaire
        reset({
          participantIds: [],
        });
        setSelectedParticipants([]);
        closeModal("ModalAddInternalParticipantsMeetings");
      },
    });

  const {
    data: participants,
    isLoading,
    isError,
    refetch,
  } = useGetListParticipants();

  const {
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    trigger,
  } = useForm<AddInternalParticipantSchema>({
    resolver: zodResolver(addInternalParticipantSchema),
    defaultValues: {
      meetingId: meetingId,
      participantIds: [],
    },
    mode: "all",
  });

  const onSubmit = useCallback(
    async (data: AddInternalParticipantSchema) => {
      startTransition(async () => {
        addInternalParticipantsMeeting(data);
      });
    },
    [addInternalParticipantsMeeting]
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

    setValue("participantIds", internalParticipants);
    trigger("participantIds");
  };

  return (
    <>
      <Modal
        size="5xl"
        isOpen={isModalOpen("ModalAddInternalParticipantsMeetings")}
        onClose={() => {
          reset({
            meetingId: meetingId,
            participantIds: [],
          });
          setSelectedParticipants([]);
          closeModal("ModalAddInternalParticipantsMeetings");
        }}
        isDismissable={false}
      >
        <ModalContent className="bg-bgCard">
          {() => (
            <>
              <ModalBody className="lg:px-2">
                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-1">
                      <div className="w-full h-full flex flex-col justify-center lg:px-6 lg:py-8">
                        <h2 className="text-colorTitle lg:text-[24px] font-semibold mb-2">
                          Ajouter des participants internes
                        </h2>
                        <p className="text-sm text-colorMuted lg:mb-6">
                          Ajouter des participants internes à la réunion.
                        </p>
                        <form
                          ref={formRef}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="col-span-2">
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
                              items={
                                participants?.data.filter(
                                  (p) =>
                                    p.type === "INTERNE" &&
                                    !listParticipants.some(
                                      (existing) => existing.id === p.id
                                    )
                                ) || []
                              }
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
                                <SelectItem
                                  key={user.id}
                                  textValue={user.name || "N/A  "}
                                >
                                  <div className="flex gap-2 items-center">
                                    <div className="w-[32px] h-[32px] bg-lightPrimaryColor rounded-full flex items-center justify-center">
                                      {user.name?.charAt(0)}
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
                            {(errors.participantIds ||
                              errors.participantIds) && (
                              <p className="text-danger text-tiny mt-1">
                                {errors.participantIds?.message ||
                                  errors.participantIds?.message}
                              </p>
                            )}
                          </div>
                          <div className="col-span-2">
                            <Button
                              className="w-full h-auto py-3 bg-primaryColor text-white mt-2"
                              isLoading={isSubmitting || isPendingMeeting}
                              isDisabled={!isValid}
                              onPress={() => setIsModalOpenConfirmation(true)}
                            >
                              Ajouter les participants
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <div className="block-img rounded-xl relative overflow-hidden lg:min-h-[570px] h-full z-10">
                        <Button
                          className="absolute z-10 p-0 min-w-0 h-[36px] w-[36px] rounded-full bg-bgCard top-2 right-2"
                          onPress={() => {
                            reset({
                              meetingId: meetingId,
                              participantIds: [],
                            });
                            setSelectedParticipants([]);
                            closeModal("ModalAddInternalParticipantsMeetings");
                          }}
                        >
                          <X size={18}></X>
                        </Button>
                        <video
                          src="/videos/2.mp4"
                          className="w-full h-full object-cover absolute top-0 left-0 -z-10"
                          playsInline
                          loop
                          autoPlay
                          muted
                        ></video>
                        <div className="block-design h-full flex flex-col justify-center items-center">
                          <div className="relative flex items-center justify-center">
                            {/* Icône centrale */}
                            <div className="relative z-10 icon-recording w-[140px] h-[140px] text-white bg-[#ffffff1f] border-[1px] border-white/10 backdrop-blur-[34px] rounded-full flex items-center justify-center">
                              <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className="absolute top-[-70px] z-10"
                              />
                              <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className="absolute left-[-70px] z-10"
                              />
                              <Avatar
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                className="absolute right-[-70px] z-10"
                              />
                              <Mic size={50}></Mic>
                              <div
                                className="absolute w-[140px] h-[140px] rounded-full border-2 border-white/20 animate-slow-pulse"
                                style={{ animationDelay: "0s" }}
                              ></div>
                              <div
                                className="absolute w-[180px] h-[180px] rounded-full border-2 border-white/15 animate-slow-pulse"
                                style={{ animationDelay: ".5s" }}
                              ></div>
                              <div
                                className="absolute w-[220px] h-[220px] rounded-full border-2 border-white/10 animate-slow-pulse"
                                style={{ animationDelay: "1s" }}
                              ></div>
                              <div
                                className="absolute w-[220px] h-[220px] rounded-full border-2 border-white/10 animate-slow-pulse"
                                style={{ animationDelay: "1.5s" }}
                              ></div>
                            </div>
                          </div>
                          <h3 className="text-white font-semibold text-[24px] text-center mt-4">
                            Enregistrement en cours
                          </h3>
                          <p className="text-white text-sm text-center px-20">
                            {
                              "Vous pouvez démarrer l'enregistrement en appuyant sur le bouton enregistrer."
                            }
                          </p>
                        </div>
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
        message="Voulez-vous vraiment ajouter ces participants internes à la réunion ?"
      />
    </>
  );
};

export default ModalAddInternalParticipantsMeetings;
