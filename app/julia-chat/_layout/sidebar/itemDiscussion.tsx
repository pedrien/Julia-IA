import React from "react";
import { Button } from "@heroui/react";
import { EllipsisVertical } from "lucide-react";

interface ItemDiscussionProps {
  title: string;
}

const ItemDiscussion = ({ title }: ItemDiscussionProps) => {
  return (
    <div className="flex items-center card p-2 rounded-xl cursor-pointer gap-2 hover:bg-bgGray relative group">
      <div className="w-full pr-[28px]">
        <h6 className="text-sm font-medium text-colorTitle truncate">
          {title}
        </h6>
      </div>
      <div className="absolute right-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="ml-auto w-[28px] h-[28px] p-0 min-w-0 flex-none "
        >
          <EllipsisVertical size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ItemDiscussion;
