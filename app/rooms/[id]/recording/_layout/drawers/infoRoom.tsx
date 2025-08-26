import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from "@heroui/react";
import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";

const InfoRoom = () => {
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
              <p className="text-sm text-colorMuted">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <h6 className="text-sm text-colorTitle mb-2">Description</h6>
              <p className="text-sm text-colorMuted">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
            <div className="py-4 border-b-[1px] border-dashed border-colorBorderTr">
              <h6 className="text-sm text-colorTitle mb-2">Date</h6>
              <p className="text-sm text-colorMuted">23/08/2025</p>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default InfoRoom;
