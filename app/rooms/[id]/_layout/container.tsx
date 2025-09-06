"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import BlockDash from "./blockDash";
import { CurrentParticipantProvider } from "@/contexts/features/meetings/context.current-participant-meetings-detail";

const Container = ({ id }: { id: string }) => {
  return (
    <ViewApp>
      <CurrentParticipantProvider>
        <BlockDash id={id} />
      </CurrentParticipantProvider>
    </ViewApp>
  );
};

export default Container;
