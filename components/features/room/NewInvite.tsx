import React from "react";
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

const NewInvite = () => {
  const { isModalOpen, closeModal } = useModalContext();
  return (
    <Modal
      size="md"
      isOpen={isModalOpen("NewInvite")}
      onClose={() => closeModal("NewInvite")}
    >
      <ModalContent>
        {() => (
          <>
          <ModalHeader className="flex flex-col gap-1">
              <div>
                <h5 className="text md font-medium mb-2">{"Ajout d'un invité"}</h5>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 gap-3">
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
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-3 w-full mt-1">
                <Button
                  className="w-1/2 bg-bgGray h-auto py-3 text-colorTitle"
                  onPress={() => closeModal("NewInvite")}
                >
                  Annuler
                </Button>
                <Button className="w-1/2 h-auto py-3 bg-primaryColor text-white">
                  Créer
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewInvite;
