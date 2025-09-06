"use client";

import { useDrawerContext } from "@/contexts/Drawer/DrawerContext";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import { useGetMeetingParticipants } from "@/hooks/features/meetings/hook.get-meeting-participants";
import { Avatar, Button, Chip, Tooltip } from "@heroui/react";
import { Plus } from "lucide-react";

const TabsParticipants = ({ id }: { id: string }) => {
  const { openDrawer } = useDrawerContext();
  const { openModal } = useModalContext();
  const { data: participants } = useGetMeetingParticipants(id);

  console.log(participants);
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-colorTitle font-semibold mb-3 mt-2">
          Participants
        </h3>
        <div className="flex flex-col gap-4">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => openDrawer("AvisParticipants")}
          >
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#f08d501b]  text-[#f08c50] text-[10px]"
                    size="sm"
                  >
                    Non lu
                  </Chip>
                  <Chip
                    className="bg-[#e829291b]  text-[#e82929] text-[10px]"
                    size="sm"
                  >
                    Non traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => openDrawer("AvisParticipants")}
          >
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#5078f01b]  text-[#5078f0] text-[10px]"
                    size="sm"
                  >
                    Lu
                  </Chip>
                  <Chip
                    className="bg-[#2ac66618] text-[#2ac667] text-[10px]"
                    size="sm"
                  >
                    Traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-3 mt-2">
          <h3 className="text-colorTitle font-semibold">Invités</h3>
          <Tooltip
            content={"Ajouter"}
            classNames={{
              content: ["bg-colorTitle border-0 text-white text-xs"],
            }}
          >
            <Button
              className="bg-transparent border border-colorBorder  text-colorTitle text-xs p-0 min-w-0 h-[26px] w-[26px]"
              onPress={() => openModal("NewInvite")}
            >
              <Plus size={14}></Plus>
            </Button>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => openDrawer("AvisParticipants")}
          >
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#f08d501b]  text-[#f08c50] text-[10px]"
                    size="sm"
                  >
                    Non lu
                  </Chip>
                  <Chip
                    className="bg-[#e829291b]  text-[#e82929] text-[10px]"
                    size="sm"
                  >
                    Non traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => openDrawer("AvisParticipants")}
          >
            <Avatar
              alt={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
              className="shrink-0"
              size="md"
              src={"https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-small text-colorTitle">
                  Tony Reichert
                </span>
                <div className="flex items-center gap-1">
                  <Chip
                    className="bg-[#5078f01b]  text-[#5078f0] text-[10px]"
                    size="sm"
                  >
                    Lu
                  </Chip>
                  <Chip
                    className="bg-[#2ac66618] text-[#2ac667] text-[10px]"
                    size="sm"
                  >
                    Traité
                  </Chip>
                </div>
              </div>
              <span className="text-tiny text-colorMuted">
                tony.reichert@example.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabsParticipants;
