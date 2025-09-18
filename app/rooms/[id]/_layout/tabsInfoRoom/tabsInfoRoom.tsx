import React from "react";
import Link from "next/link";
import { ArrowLeft,} from "lucide-react";
import { Button, } from "@heroui/react";
import { Tabs, Tab } from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import TabsParticipants from "./TabsParticipants";
import TabsTranscriptionText from "./TabsTranscriptionText";
import TabsInfoMeeting from "./TabsInfoMeeting";

const TabsInfoRoom = ({ id }: { id: string }) => {
  const { openModal } = useModalContext();
  return (
    <div className="flex flex-col h-screen bg-bgCard">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link
              href={"/rooms"}
              className="w-[36px] h-[36px] flex justify-center items-center text-colorTitle"
            >
              <ArrowLeft size={20} />
            </Link>
            <h3 className="text-colorTitle font-semibold text-[18px]">
              Compte rendu
            </h3>
          </div>
          <Button className="bg-bgCard border border-colorBorder text-colorTitle text-xs h-auto py-2">
            Marquer comme Traiter
          </Button>
        </div>
      </div>
      <div className="body p-3 px-5 flex-grow overflow-y-auto">
        <Tabs
          aria-label="Options"
          style={{ overflow: "hidden", width: "100%" }}
          classNames={{
            cursor:
              "bg-primaryColor dark:bg-primaryColor shadow-none rounded-md h-[2px] top-auto bottom-[-3px]",
            tab: " bg-transparent",
            tabList: "bg-transparent gap-2 rounded-none",
            tabContent:
              "text-colorMuted group-data-[selected=true]:text-colorTitle group-data-[selected=true]:font-medium",
          }}
        >
          <Tab key="participant" title="Participants">
            <TabsParticipants id={id} />
          </Tab>
          <Tab key="transcrip" title="Transcription">
            <TabsTranscriptionText id={id} />
          </Tab>
          <Tab key="info" title="Infos générales">
            <TabsInfoMeeting id={id} />
          </Tab>
        </Tabs>
      </div>
      <div className="footer px-5 p-4">
        <Button
          className="bg-primaryColor  text-white w-full font-medium"
          onPress={() => openModal("NewObserv")}
        >
          Laisser une observation
        </Button>
      </div>
    </div>
  );
};

export default TabsInfoRoom;
