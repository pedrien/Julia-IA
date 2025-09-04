import React from "react";
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

const NewObserv = () => {
  const { isModalOpen, closeModal } = useModalContext();
  return (
    <Modal
      size="md"
      isOpen={isModalOpen("NewObserv")}
      onClose={() => closeModal("NewObserv")}
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
              <div className="grid grid-cols-1 gap-3">
                <div className="col-span-1">
                  <label
                    htmlFor="name"
                    className="text-[14px] text-colorTitle block mb-1"
                  >
                    Observation
                  </label>

                  <Textarea
                    id="description"
                    placeholder="Laissez votre observation"
                    variant="bordered"
                    minRows={4}
                    classNames={{
                      inputWrapper:
                        "bg-transparent border-colorBorder border-[1px] shadow-none ",
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
                  onPress={() => closeModal("NewObserv")}
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

export default NewObserv;
