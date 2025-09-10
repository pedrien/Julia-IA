import React from "react";
import BlockChatIa from "./blockChatIa/blockChatIa";
import TabsInfoRoom from "./tabsInfoRoom/tabsInfoRoom";
import BlockFiles from "./blockFiles/blockFiles";
import AvisParticipants from "./drawers/avisParticipant";
import ModalShare from "./modalStep/modalShare";
import NewInvite from "@/components/features/room/NewInvite";
import NewObserv from "@/components/features/room/NewObserv";

const BlockDash = () => {
  return (
    <div className="block-view-detail-room h-screen overflow-hidden">
      <div className="grid h-full grid-cols-12">
        <div className="col-span-12 lg:col-span-3">
          <TabsInfoRoom />
        </div>
        <div className="col-span-12 lg:col-span-6 ">
          <BlockFiles/>
        </div>
        <div className="col-span-12 lg:col-span-3">
          <BlockChatIa />
        </div>
      </div>
      <AvisParticipants/>
      <ModalShare/>
      <NewInvite/>
      <NewObserv/>
    </div>
  );
};

export default BlockDash;
