"use client";
import ViewApp from "@/components/common/containers/ViewApp";
import BlockDash from "./blockDash";

const Container = ({ id }: { id: string }) => {
  return (
    <ViewApp>
      <BlockDash id={id} />
    </ViewApp>
  );
};

export default Container;
