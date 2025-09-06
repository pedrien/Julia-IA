import React from "react";
import BlockChatIa from "./blockChatIa/blockChatIa";
import TabsInfoRoom from "./tabsInfoRoom/tabsInfoRoom";
import BlockFiles from "./blockFiles/blockFiles";
import AvisParticipants from "./drawers/avisParticipant";
import ModalShare from "./modalStep/modalShare";
import NewObserv from "@/components/features/room/NewObserv";
import NewUser from "@/components/features/room/newUser";
import { useQueryClient } from "@tanstack/react-query";

const BlockDash = ({ id }: { id: string }) => {
  const queryClient = useQueryClient();
  return (
    <>
      <div className="block-view-detail-room h-screen overflow-hidden">
        <div className="grid h-full grid-cols-12">
          <div className="col-span-12 lg:col-span-3">
            <TabsInfoRoom id={id} />
          </div>
          <div className="col-span-12 lg:col-span-6 ">
            <BlockFiles id={id} />
          </div>
          <div className="col-span-12 lg:col-span-3">
            <BlockChatIa id={id} />
          </div>
        </div>
      </div>
      <AvisParticipants />
      <ModalShare idMeeting={id} />
      <NewUser
        isForGuest={true}
        onSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: ["meeting-participants", id],
          });
        }}
      />
      <NewObserv idMeeting={id} />
    </>
  );
};

export default BlockDash;
