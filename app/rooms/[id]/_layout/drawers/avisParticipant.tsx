import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
} from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";

const AvisParticipants = () => {
  const { isDrawerOpen, closeDrawer } = useDrawerContext();
  return (
    <Drawer
      isOpen={isDrawerOpen("AvisParticipants")}
      onClose={() => closeDrawer("AvisParticipants")}
      size="md"
      radius="none"
    >
      <DrawerContent>
        <DrawerHeader className="border-b border-colorBorderTr">
          <div className="flex gap-2 items-center">
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <span className="text-small text-colorTitle">Tony Reichert</span>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
        </DrawerHeader>
        <DrawerBody>
          <h4 className="text-colorTitle font-semibold">Observations</h4>
          <div className="flex flex-col gap-3">
            <div className="card p-3 rounded-xl bg-[#f8f8f8]">
              <p className="text-colorTitle text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                assumenda asperiores atque?
              </p>
              <div className="date text-xs text-end text-colorMuted mt-1">
                30/08/2025 à 15:50
              </div>
            </div>
            <div className="card p-3 rounded-xl bg-[#f8f8f8]">
              <p className="text-colorTitle text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                assumenda asperiores atque?
              </p>
              <div className="date text-xs text-end text-colorMuted mt-1">
                30/08/2025 à 15:50
              </div>
            </div>
            <div className="card p-3 rounded-xl bg-[#f8f8f8]">
              <p className="text-colorTitle text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                assumenda asperiores atque?
              </p>
              <div className="date text-xs text-end text-colorMuted mt-1">
                30/08/2025 à 15:50
              </div>
            </div>
            <div className="card p-3 rounded-xl bg-[#f8f8f8]">
              <p className="text-colorTitle text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
                assumenda asperiores atque?
              </p>
              <div className="date text-xs text-end text-colorMuted mt-1">
                30/08/2025 à 15:50
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AvisParticipants;
