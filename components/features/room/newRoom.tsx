import React from "react";
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
  Avatar,
  Chip,
} from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { X, Plus, RefreshCcw } from "lucide-react";
import { useGetListParticipants } from "@/hooks/features/participants/hook.list-participants";
import { Participant } from "@/validators/participants/validator.list-participants";
import { helpEnumParticipantType } from "@/types/enums/participants/enum.type-participants";

const NewRoom = () => {
  const { isModalOpen, closeModal, openModal } = useModalContext();
  const {
    data: participants,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useGetListParticipants();

  return (
    <Modal
      size="5xl"
      isOpen={isModalOpen("ModalNewRoom")}
      onClose={() => closeModal("ModalNewRoom")}
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
                      <div className="grid grid-cols-1 gap-3 lg:gap-4">
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
                          />
                        </div>
                        <div className="col-span-1">
                          <label
                            htmlFor="title"
                            className="text-[14px] text-colorTitle block mb-1"
                          >
                            Date
                          </label>

                          <Input
                            type="date"
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
                          />
                        </div>
                        <div className="col-span-1">
                          <div className="flex items-center gap-2 mb-2">
                            <label
                              htmlFor="title"
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
                            placeholder="Selectionnez les participant"
                            variant="bordered"
                            selectionMode="multiple"
                            items={participants?.data || []}
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
                            aria-label="Sexe"
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
                                  {/* <Avatar
                                    alt={user.name}
                                    className="shrink-0"
                                    size="sm"
                                    src={user.avatar}
                                  /> */}
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
                        </div>
                        <div className="col-span-1">
                          <Button className="w-full h-auto py-3 bg-primaryColor text-white mt-2">
                            Démarrer
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="block-img rounded-xl relative overflow-hidden lg:min-h-[570px] h-full">
                      <Button
                        className="absolute z-10 p-0 min-w-0 h-[36px] w-[36px] rounded-full bg-bgCard top-2 right-2"
                        onPress={() => closeModal("ModalNewRoom")}
                      >
                        <X size={18}></X>
                      </Button>
                      {/* <Image
                        src={"/images/bg.jpeg"}
                        alt="Image de julia"
                        width={0}
                        height={0}
                        layout="responsive"
                        className="absolute w-[100%!important] h-[100%!important] object-cover"
                      /> */}
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
            {/* <ModalFooter>
              <div className="flex items-center gap-3 w-full">
                <Button
                  className="w-1/2 bg-bgFond h-auto py-3 text-darkenGreen"
                  onPress={() => closeModal("ModalNewRoom")}
                >
                  Annuler
                </Button>
                
              </div>
            </ModalFooter> */}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewRoom;
