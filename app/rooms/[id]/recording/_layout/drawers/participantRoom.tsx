import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { MeetingParticipant } from "@/validators/meetings/validator.meeting-recording-detail";

const ParticipantRoom = ({
  participants,
}: {
  participants: MeetingParticipant[];
}) => {
  const { isDrawerOpen, closeDrawer } = useDrawerContext();
  return (
    <Drawer
      isOpen={isDrawerOpen("DraweParticipantRoom")}
      onClose={() => closeDrawer("DraweParticipantRoom")}
      size="md"
      radius="none"
    >
      <DrawerContent>
        <DrawerHeader className="border-b border-colorBorderTr">
          <div className="flex">
            <h3 className="text-colorTitle font-medium">Participants</h3>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="py-4 border-b-[1px] border-dashed border-colorBorderTr"
              >
                <div className="flex gap-2 items-center">
                  <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center text-colorTitle bg-gray-300 ">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-small text-colorTitle">
                      {participant.name}
                    </span>
                    <span className="text-tiny text-colorMuted">
                      {participant.type === "INTERNE" ? "Interne" : "Externe"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ParticipantRoom;
