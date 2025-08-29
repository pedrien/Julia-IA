import React from "react";
import Image from "next/image";
import { SendHorizonal } from "lucide-react";
import { Button, Textarea } from "@heroui/react";

const BlockChatIa = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <div className="content-img rounded-full overflow-hidden w-[36px] h-[36px]">
              <Image
                src={"/images/julia.jpeg"}
                alt="julia"
                width={0}
                height={0}
                className="w-full h-[100%!important] object-cover"
                layout="responsive"
              />
            </div>
            <Image
              src={"/images/logos/logoJulia.png"}
              alt="logo de julia"
              className="w-[40px!important]"
              width={0}
              height={0}
              layout="responsive"
            />
          </div>
        </div>
      </div>
      <div className="body p-3 flex-grow">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="w-full text-center">
            <h2 className="lg:text-[24px] font-semibold">Salut Martins 👋</h2>
            <p className="text-colorMuted text-sm">
              Je suis Julia, toujours prête à vous assister.
            </p>
          </div>
        </div>
      </div>
      <div className="footer p-[18px] py-3">
        <Textarea
          placeholder="Demandez à Julia"
          variant="bordered"
          minRows={1}
          classNames={{
            inputWrapper:
              "bg-transparent border-colorBorder border-[1px] shadow-none ",
            input:
              "text-colorTitle placeholder:text-colorMuted placeholder:opacity-70",
          }}
          endContent={
            <Button className="w-[32px] h-[32px] bg-primaryColor min-w-0 p-0 flex-none text-white">
              <SendHorizonal size={16} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default BlockChatIa;
