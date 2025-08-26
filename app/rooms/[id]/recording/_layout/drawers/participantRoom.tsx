import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Avatar,
} from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";

const ParticipantRoom = () => {
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
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
                  className="shrink-0"
                  size="md"
                  src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
                />
                <div className="flex flex-col">
                  <span className="text-small text-colorTitle">
                    Tony Reichert
                  </span>
                  <span className="text-tiny text-colorMuted">
                  tony.reichert@example.com
                  </span>
                </div>
              </div>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png"}
                  className="shrink-0"
                  size="md"
                  src={"https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png"}
                />
                <div className="flex flex-col">
                  <span className="text-small text-colorTitle">
                    Zoey Lang
                  </span>
                  <span className="text-tiny text-colorMuted">
                  zoey.lang@example.com
                  </span>
                </div>
              </div>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <div className="flex gap-2 items-center">
                <div className="icon-name shrink-0 flex items-center w-[40px] h-[40px] rounded-full bg-bgGray justify-center text-sm font-medium">
                    Z
                </div>
                <div className="flex flex-col">
                  <span className="text-small text-colorTitle">
                    Zoey Lang
                  </span>
                  <span className="text-tiny text-colorMuted">
                  zoey.lang@example.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default ParticipantRoom;
