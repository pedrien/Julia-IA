import { useModalContext } from "@/contexts/Modal/ModalContext";
import { helpEnumParticipantType } from "@/types/enums/participants/enum.type-participants";
import { Participant } from "@/validators/participants/validator.list-participants";
import {
  Button,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { Search } from "lucide-react";
import { useState } from "react";

const ModalShareRapport = ({
  participants,
}: {
  participants: Participant[];
}) => {
  const { isModalOpen, closeModal } = useModalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeople, setSelectedPeople] = useState<string[]>([]);

  // Filtrer les personnes selon la recherche
  const filteredPeople = participants.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la sélection d'une personne
  const handlePersonSelect = (personId: string) => {
    setSelectedPeople((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  };

  // Gérer la sélection/désélection de tous
  const handleSelectAll = () => {
    if (selectedPeople.length === filteredPeople.length) {
      setSelectedPeople([]);
    } else {
      setSelectedPeople(filteredPeople.map((person) => person.id));
    }
  };

  // Gérer le partage
  const handleShare = () => {
    const selectedPeopleData = participants.filter((person) =>
      selectedPeople.includes(person.id)
    );
    console.log("Partage avec:", selectedPeopleData);
    // Ici vous pouvez ajouter la logique de partage
    closeModal("ModalShareRapport");
  };

  // Réinitialiser lors de la fermeture
  const handleClose = () => {
    setSelectedPeople([]);
    setSearchTerm("");
    closeModal("ModalShareRapport");
  };

  return (
    <Modal
      size="md"
      isOpen={isModalOpen("ModalShareRapport")}
      onClose={handleClose}
      isDismissable={false}
    >
      <ModalContent className="bg-bgCard">
        {() => (
          <>
            <ModalHeader>
              <h5 className="text-colorTitle">Partager le compte rendu</h5>
            </ModalHeader>
            <ModalBody>
              <Input
                type="text"
                variant="bordered"
                placeholder="Rechercher des personnes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                classNames={{
                  inputWrapper:
                    "bg-transparent border-colorBorder border-[1px] shadow-none",
                  input: "text-colorTitle placeholder:text-colorMuted",
                }}
                startContent={<Search size={20} className="text-colorMuted" />}
              />

              {/* Sélectionner tout */}
              {filteredPeople.length > 0 && (
                <div className="flex items-center gap-2 mt-2 mb-2">
                  <Checkbox
                    isSelected={
                      selectedPeople.length === filteredPeople.length &&
                      filteredPeople.length > 0
                    }
                    isIndeterminate={
                      selectedPeople.length > 0 &&
                      selectedPeople.length < filteredPeople.length
                    }
                    onValueChange={handleSelectAll}
                    classNames={{
                      wrapper:
                        "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                      icon: "text-white",
                      base: "text-primaryColor",
                    }}
                  />
                  <span className="text-sm text-colorTitle">
                    {selectedPeople.length === filteredPeople.length
                      ? "Désélectionner tout"
                      : "Sélectionner tout"}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
                {filteredPeople.length > 0 ? (
                  filteredPeople.map((person) => (
                    <div key={person.id} className="card relative">
                      <div
                        className={`content-card border p-3 rounded-xl transition-colors cursor-pointer ${
                          selectedPeople.includes(person.id)
                            ? "border-primaryColor"
                            : "border-colorBorderTr hover:border-colorBorder"
                        }`}
                        onClick={() => handlePersonSelect(person.id)}
                      >
                        <div className="flex gap-3 items-center">
                          <Checkbox
                            isSelected={selectedPeople.includes(person.id)}
                            onValueChange={() => handlePersonSelect(person.id)}
                            classNames={{
                              wrapper:
                                "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                              icon: "text-white",
                              base: "text-primaryColor",
                            }}
                          />
                          <div className="flex items-center rounded-full p-200">
                            {person.name?.charAt(0)}
                          </div>
                          <div className="flex flex-col flex-grow">
                            <span className="text-small text-colorTitle font-medium">
                              {person.name}
                            </span>
                            <span className="text-tiny text-colorMuted">
                              {helpEnumParticipantType(person.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-colorMuted text-sm">
                      {searchTerm
                        ? "Aucune personne trouvée"
                        : "Aucune personne disponible"}
                    </p>
                  </div>
                )}
              </div>

              {/* Résumé de la sélection */}
              {selectedPeople.length > 0 && (
                <div className="mt-2 p-2 bg-primaryColor/10 rounded-lg border border-primaryColor/20">
                  <p className="text-xs text-colorTitle">
                    <span className="font-medium">
                      {selectedPeople.length} personne
                      {selectedPeople.length > 1 ? "s" : ""}
                    </span>{" "}
                    sélectionnée{selectedPeople.length > 1 ? "s" : ""}
                  </p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center gap-3 w-full mt-1">
                <Button
                  className="w-1/2 bg-bgGray h-auto py-3 text-colorTitle"
                  onPress={handleClose}
                >
                  Annuler
                </Button>

                <Button
                  className="w-1/2 h-auto py-3 bg-primaryColor text-white"
                  onPress={handleShare}
                  isDisabled={selectedPeople.length === 0}
                >
                  Partager ({selectedPeople.length})
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalShareRapport;
