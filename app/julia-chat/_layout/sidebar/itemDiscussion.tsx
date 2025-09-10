import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { EllipsisVertical, Trash, Pen } from "lucide-react";

interface ItemDiscussionProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ItemDiscussion = ({
  title,
  isActive = false,
  onClick,
}: ItemDiscussionProps) => {
  return (
    <div
      className={`flex items-center card p-2 rounded-xl cursor-pointer gap-2 hover:bg-[#f5f7fb] relative group transition-all duration-200 ${
        isActive ? "bg-[#f5f7fb]" : ""
      }`}
      onClick={onClick}
    >
      <div className="w-full pr-[28px]">
        <h6
          className={`text-sm font-medium truncate ${
            isActive ? "text-colorTitle" : "text-colorTitle"
          }`}
        >
          {title}
        </h6>
        {/* {lastMessage && (
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-colorMuted">
              {lastMessage.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {messageCount && messageCount > 0 && (
              <span className="text-xs text-colorMuted">
                {messageCount} msg{messageCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        )} */}
      </div>
      <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Dropdown classNames={{
          content: "min-w-[150px] shadow-[0_5px_18px_#00000005]"
        }}>
          <DropdownTrigger>
          <Button
          isIconOnly
          variant="light"
          size="sm"
          className="ml-auto w-[28px] h-[28px] p-0 min-w-0 flex-none"
        >
          <EllipsisVertical size={16} />
        </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection title={"Actions"}>
              <DropdownItem
                key={1}
                classNames={{
                  base: "data-[hover=true]:bg-bgFond data-[hover=true]:text-colorTitle text-[14px] text-colorTitle",
                }}
              >
                <span className="flex items-center gap-2">
                  <Pen size="16"></Pen>
                  Rénomer
                  </span>
              </DropdownItem>
              <DropdownItem
                key={2}
                classNames={{
                  base: "data-[hover=true]:bg-bgFond data-[hover=true]:text-colorTitle text-[14px] text-colorTitle",
                }}
              >
                <span className="flex items-center gap-2"><Trash size={16}></Trash> Supprimer</span>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
       
      </div>
    </div>
  );
};

export default ItemDiscussion;
