import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useShareMeeting } from "@/hooks/features/meetings/hook.share-meeting";
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
  meetingId,
  onSuccessShare,
}: {
  participants: Participant[];
  meetingId: string;
  onSuccessShare: () => void;
}) => {
  const { isModalOpen, closeModal } = useModalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInternalParticipants, setSelectedInternalParticipants] =
    useState<string[]>([]);
  const [selectedExternalParticipants, setSelectedExternalParticipants] =
    useState<string[]>([]);
  const { mutate: shareMeeting, isPending } = useShareMeeting({
    onSuccessCallback: () => {
      onSuccessShare();
      handleClose();
    },
  });

  // Séparer les participants par type
  const internalParticipants = participants.filter(
    (person) => person.type === "INTERNE"
  );
  const externalParticipants = participants.filter(
    (person) => person.type === "EXTERNE"
  );

  // Filtrer les participants selon la recherche
  const filteredInternalParticipants = internalParticipants.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredExternalParticipants = externalParticipants.filter((person) =>
    person.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer la sélection d'un participant interne
  const handleInternalParticipantSelect = (personId: string) => {
    setSelectedInternalParticipants((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  };

  // Gérer la sélection d'un participant externe
  const handleExternalParticipantSelect = (personId: string) => {
    setSelectedExternalParticipants((prev) =>
      prev.includes(personId)
        ? prev.filter((id) => id !== personId)
        : [...prev, personId]
    );
  };

  // Gérer la sélection/désélection de tous les participants internes
  const handleSelectAllInternal = () => {
    if (
      selectedInternalParticipants.length ===
      filteredInternalParticipants.length
    ) {
      setSelectedInternalParticipants([]);
    } else {
      setSelectedInternalParticipants(
        filteredInternalParticipants.map((person) => person.id)
      );
    }
  };

  // Gérer la sélection/désélection de tous les participants externes
  const handleSelectAllExternal = () => {
    if (
      selectedExternalParticipants.length ===
      filteredExternalParticipants.length
    ) {
      setSelectedExternalParticipants([]);
    } else {
      setSelectedExternalParticipants(
        filteredExternalParticipants.map((person) => person.id)
      );
    }
  };

  // Gérer le partage
  const handleShare = () => {
    shareMeeting({
      meeting_id: meetingId,
      internal_participant: selectedInternalParticipants,
      external_participant: selectedExternalParticipants,
    });
  };

  // Réinitialiser lors de la fermeture
  const handleClose = () => {
    setSelectedInternalParticipants([]);
    setSelectedExternalParticipants([]);
    setSearchTerm("");
    closeModal("ModalShareRapport");
  };

  // Calculer le total des participants sélectionnés
  const totalSelectedParticipants =
    selectedInternalParticipants.length + selectedExternalParticipants.length;

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

              <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                {/* Participants Internes */}
                {filteredInternalParticipants.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        isSelected={
                          selectedInternalParticipants.length ===
                            filteredInternalParticipants.length &&
                          filteredInternalParticipants.length > 0
                        }
                        isIndeterminate={
                          selectedInternalParticipants.length > 0 &&
                          selectedInternalParticipants.length <
                            filteredInternalParticipants.length
                        }
                        onValueChange={handleSelectAllInternal}
                        classNames={{
                          wrapper:
                            "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                          icon: "text-white",
                          base: "text-primaryColor",
                        }}
                      />
                      <span className="text-sm text-colorTitle font-medium">
                        Participants Internes (
                        {filteredInternalParticipants.length})
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {filteredInternalParticipants.map((person) => (
                        <div key={person.id} className="card relative">
                          <div
                            className={`content-card border p-3 rounded-xl transition-colors cursor-pointer ${
                              selectedInternalParticipants.includes(person.id)
                                ? "border-primaryColor"
                                : "border-colorBorderTr hover:border-colorBorder"
                            }`}
                            onClick={() =>
                              handleInternalParticipantSelect(person.id)
                            }
                          >
                            <div className="flex gap-3 items-center">
                              <Checkbox
                                isSelected={selectedInternalParticipants.includes(
                                  person.id
                                )}
                                onValueChange={() =>
                                  handleInternalParticipantSelect(person.id)
                                }
                                classNames={{
                                  wrapper:
                                    "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                                  icon: "text-white",
                                  base: "text-primaryColor",
                                }}
                              />
                              <div className="flex items-center rounded-full flex-none justify-center h-10 w-10 bg-lightPrimaryColor">
                                {person.name?.charAt(0) || "N/A"}
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
                      ))}
                    </div>
                  </div>
                )}

                {/* Participants Externes */}
                {filteredExternalParticipants.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Checkbox
                        isSelected={
                          selectedExternalParticipants.length ===
                            filteredExternalParticipants.length &&
                          filteredExternalParticipants.length > 0
                        }
                        isIndeterminate={
                          selectedExternalParticipants.length > 0 &&
                          selectedExternalParticipants.length <
                            filteredExternalParticipants.length
                        }
                        onValueChange={handleSelectAllExternal}
                        classNames={{
                          wrapper:
                            "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                          icon: "text-white",
                          base: "text-primaryColor",
                        }}
                      />
                      <span className="text-sm text-colorTitle font-medium">
                        Participants Externes (
                        {filteredExternalParticipants.length})
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {filteredExternalParticipants.map((person) => (
                        <div key={person.id} className="card relative">
                          <div
                            className={`content-card border p-3 rounded-xl transition-colors cursor-pointer ${
                              selectedExternalParticipants.includes(person.id)
                                ? "border-primaryColor"
                                : "border-colorBorderTr hover:border-colorBorder"
                            }`}
                            onClick={() =>
                              handleExternalParticipantSelect(person.id)
                            }
                          >
                            <div className="flex gap-3 items-center">
                              <Checkbox
                                isSelected={selectedExternalParticipants.includes(
                                  person.id
                                )}
                                onValueChange={() =>
                                  handleExternalParticipantSelect(person.id)
                                }
                                classNames={{
                                  wrapper:
                                    "text-primaryColor data-[selected=true]:bg-primaryColor after:bg-primaryColor",
                                  icon: "text-white",
                                  base: "text-primaryColor",
                                }}
                              />
                              <div className="flex items-center rounded-full flex-none justify-center h-10 w-10 bg-lightPrimaryColor">
                                {person.name?.charAt(0) || "N/A"}
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
                      ))}
                    </div>
                  </div>
                )}

                {/* Message si aucun participant trouvé */}
                {filteredInternalParticipants.length === 0 &&
                  filteredExternalParticipants.length === 0 && (
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
              {totalSelectedParticipants > 0 && (
                <div className="mt-2 p-2 bg-primaryColor/10 rounded-lg border border-primaryColor/20">
                  <p className="text-xs text-colorTitle">
                    <span className="font-medium">
                      {totalSelectedParticipants} personne
                      {totalSelectedParticipants > 1 ? "s" : ""}
                    </span>{" "}
                    sélectionnée{totalSelectedParticipants > 1 ? "s" : ""}
                    {selectedInternalParticipants.length > 0 && (
                      <span className="ml-2 text-colorMuted">
                        ({selectedInternalParticipants.length} interne
                        {selectedInternalParticipants.length > 1 ? "s" : ""}
                        {selectedExternalParticipants.length > 0 &&
                          `, ${selectedExternalParticipants.length} externe${
                            selectedExternalParticipants.length > 1 ? "s" : ""
                          }`}
                        )
                      </span>
                    )}
                    {selectedInternalParticipants.length === 0 &&
                      selectedExternalParticipants.length > 0 && (
                        <span className="ml-2 text-colorMuted">
                          ({selectedExternalParticipants.length} externe
                          {selectedExternalParticipants.length > 1 ? "s" : ""})
                        </span>
                      )}
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
                  isDisabled={totalSelectedParticipants === 0 || isPending}
                  isLoading={isPending}
                >
                  {isPending
                    ? "Partage en cours..."
                    : `Partager (${totalSelectedParticipants})`}
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
