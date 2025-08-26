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
import { X, Plus } from "lucide-react";
export const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Tech Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Sr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "C.M.",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "S. Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png",
    email: "kristen.cooper@example.com",
  },
  {
    id: 6,
    name: "Brian Kim",
    role: "P. Manager",
    team: "Management",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png",
    email: "brian.kim@example.com",
    status: "active",
  },
  {
    id: 7,
    name: "Michael Hunt",
    role: "Designer",
    team: "Design",
    status: "paused",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png",
    email: "michael.hunt@example.com",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    role: "HR Manager",
    team: "HR",
    status: "active",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png",
    email: "samantha.brooks@example.com",
  },
  {
    id: 9,
    name: "Frank Harrison",
    role: "F. Manager",
    team: "Finance",
    status: "vacation",
    age: "33",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png",
    email: "frank.harrison@example.com",
  },
  {
    id: 10,
    name: "Emma Adams",
    role: "Ops Manager",
    team: "Operations",
    status: "active",
    age: "35",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png",
    email: "emma.adams@example.com",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    role: "Jr. Dev",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/7.png",
    email: "brandon.stevens@example.com",
  },
  {
    id: 12,
    name: "Megan Richards",
    role: "P. Manager",
    team: "Product",
    status: "paused",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/7.png",
    email: "megan.richards@example.com",
  },
  {
    id: 13,
    name: "Oliver Scott",
    role: "S. Manager",
    team: "Security",
    status: "active",
    age: "37",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/8.png",
    email: "oliver.scott@example.com",
  },
  {
    id: 14,
    name: "Grace Allen",
    role: "M. Specialist",
    team: "Marketing",
    status: "active",
    age: "30",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/8.png",
    email: "grace.allen@example.com",
  },
  {
    id: 15,
    name: "Noah Carter",
    role: "IT Specialist",
    team: "I. Technology",
    status: "paused",
    age: "31",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/9.png",
    email: "noah.carter@example.com",
  },
  {
    id: 16,
    name: "Ava Perez",
    role: "Manager",
    team: "Sales",
    status: "active",
    age: "29",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/9.png",
    email: "ava.perez@example.com",
  },
  {
    id: 17,
    name: "Liam Johnson",
    role: "Data Analyst",
    team: "Analysis",
    status: "active",
    age: "28",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/11.png",
    email: "liam.johnson@example.com",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    role: "QA Analyst",
    team: "Testing",
    status: "active",
    age: "27",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/11.png",
    email: "sophia.taylor@example.com",
  },
  {
    id: 19,
    name: "Lucas Harris",
    role: "Administrator",
    team: "Information Technology",
    status: "paused",
    age: "32",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/12.png",
    email: "lucas.harris@example.com",
  },
  {
    id: 20,
    name: "Mia Robinson",
    role: "Coordinator",
    team: "Operations",
    status: "active",
    age: "26",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/12.png",
    email: "mia.robinson@example.com",
  },
];
type User = {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
};
const NewRoom = () => {
  const { isModalOpen, closeModal, openModal } = useModalContext();
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
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ipsum cum impedit iste!
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
                            <Button className="bg-bgGray text-colorTitle min-w-0 p-0 w-[24px] h-[24px]" onPress={() => openModal("ModalNewUser")}>
                              <Plus size={14}></Plus>
                            </Button>
                          </div>

                          <Select
                            placeholder="Selectionnez les participant"
                            variant="bordered"
                            selectionMode="multiple"
                            items={users}
                            renderValue={(items: SelectedItems<User>) => {
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
                          >
                            {(user) => (
                              <SelectItem key={user.id} textValue={user.name}>
                                <div className="flex gap-2 items-center">
                                  <Avatar
                                    alt={user.name}
                                    className="shrink-0"
                                    size="sm"
                                    src={user.avatar}
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-small text-colorTitle">
                                      {user.name}
                                    </span>
                                    <span className="text-tiny text-default-400 text-colorMuted">
                                      {user.email}
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
