import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { MeetingDetail } from "@/validators/meetings/validator.meeting-recording-detail";

const InfoRoom = ({ meetingDetail }: { meetingDetail: MeetingDetail }) => {
  const { isDrawerOpen, closeDrawer } = useDrawerContext();
  return (
    <Drawer
      isOpen={isDrawerOpen("DrawerInfoRoom")}
      onClose={() => closeDrawer("DrawerInfoRoom")}
      size="md"
      radius="none"
    >
      <DrawerContent>
        <DrawerHeader className="border-b border-colorBorderTr">
          <div className="flex">
            <h3 className="text-colorTitle font-medium">Infos générales</h3>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col">
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <h6 className="text-sm text-colorTitle mb-2">Titre</h6>
              <p className="text-sm text-colorMuted">{meetingDetail.title}</p>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <h6 className="text-sm text-colorTitle mb-2">Description</h6>
              <p className="text-sm text-colorMuted">
                {meetingDetail.description}
              </p>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <h6 className="text-sm text-colorTitle mb-2">Date</h6>
              <p className="text-sm text-colorMuted">
                {(() => {
                  const date = new Date(meetingDetail.scheduled_start_time);
                  const jours = [
                    "dimanche",
                    "lundi",
                    "mardi",
                    "mercredi",
                    "jeudi",
                    "vendredi",
                    "samedi",
                  ];
                  const mois = [
                    "jan",
                    "fév",
                    "mar",
                    "avr",
                    "mai",
                    "jui",
                    "jui",
                    "aoû",
                    "sep",
                    "oct",
                    "nov",
                    "déc",
                  ];
                  const jourSemaine = jours[date.getDay()];
                  const jour = date.getDate().toString().padStart(2, "0");
                  const moisNom = mois[date.getMonth()];
                  const annee = date.getFullYear();
                  const heures = date.getHours().toString().padStart(2, "0");
                  const minutes = date.getMinutes().toString().padStart(2, "0");
                  return `${jourSemaine} ${jour} ${moisNom} ${annee} à ${heures}h${minutes}`;
                })()}
              </p>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default InfoRoom;
