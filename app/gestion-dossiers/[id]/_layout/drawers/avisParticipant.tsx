import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Avatar,
  Button
} from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";

const AvisParticipants = () => {
  const { openModal } = useModalContext();
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
          <div className="card p-3 rounded-xl border border-colorBorder border-dashed mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <h4 className="text-colorTitle font-medium text-xs mb-1">Lu</h4>
                <p className="text-colorMuted text-sm">29/08/2025</p>
              </div>
              <div>
                <h4 className="text-colorTitle font-medium text-xs mb-1">
                  Traité
                </h4>
                <p className="text-colorMuted text-sm">29/08/2025</p>
              </div>
            </div>
          </div>
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
        <DrawerFooter>
        <Button className="bg-primaryColor  text-white w-full font-medium"  onPress={() => openModal("NewObserv")}>
          Laisser une observation
        </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AvisParticipants;
