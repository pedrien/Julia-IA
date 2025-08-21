"use client";
import React from "react";
import Image from "next/image";
import { X, Maximize, SendHorizonal } from "lucide-react";
import { Button, Textarea, } from "@heroui/react";

const FloatingBot = () => {
  return (
    <>
      <div
        className="chatbotSm fixed flex flex-col w-[400px] z-40 rounded-2xl bg-bgCard h-[calc(100vh-320px)] bottom-5 right-5 shadow-[0_5px_24px_rgba(0,0,0,.05)] backdrop-blur-2xl"
        style={{ background: "linear-gradient(to bottom,#782efa36,#fff)" }}
      >
        <div className="header p-[18px] py-3 border-b border-[#0000000d]">
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
            <div className="flex items-center justify-end">
              <Button className="w-[28px] h-[28px] p-0 bg-transparent min-w-0 text-colorTitle">
                <Maximize size={18}></Maximize>
              </Button>
              <Button className="w-[28px] h-[28px] p-0 bg-transparent min-w-0 text-colorTitle">
                <X size={18}></X>
              </Button>
            </div>
          </div>
        </div>
        <div className="body flex flex-col flex-grow p-[18px]">
          <h2 className="lg:text-[32px] font-semibold">
            Bienvenue 👋
          </h2>
          <p className="text-colorTitle">
            Je suis Julia, toujours prête à vous assister.
          </p>
          <div className="list-prompt flex flex-col gap-2 mt-6">
            <Button className="w-full bg-bgCard text-colorTitle">
                Voulez-vous importer vos premiers documents ?
            </Button>
            <Button className="w-full bg-bgCard text-colorTitle">
                Enregistrez une réunion dès maintenant
            </Button>
            <Button className="w-full bg-bgCard text-colorTitle">
            Générer un compte rendu en PDF
            </Button>
            <Button className="w-full bg-bgCard text-colorTitle">
            Consulter vos documents récents
            </Button>
            <Button className="w-full bg-bgCard text-colorTitle">
            Créer un nouveau dossier pour organiser vos fichiers
            </Button>
            <Button className="w-full bg-bgCard text-colorTitle">
            Rechercher un document ou une réunion
            </Button>
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
              input: "text-colorTitle placeholder:text-colorMuted placeholder:opacity-70",
            }}
            endContent={
                <Button className="w-[32px] h-[32px] bg-primaryColor min-w-0 p-0 flex-none text-white">
                    <SendHorizonal size={16}/>
                </Button>
            }
          />
        </div>
      </div>
      <div className="btn-chatbot fixed -right-9 transition-all group backdrop-blur-2xl duration-300 hover:right-0 hover:bg-[#792efa54] bottom-5 z-30  rounded-tl-full rounded-bl-full  p-[3px] bg-bgCard pr-3 flex items-center gap-1 shadow-[0_5px_18px_#0000001a] cursor-pointer">
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
        <span className="text-primaryColor opacity-0 group-hover:opacity-100">
          ⌘M
        </span>
      </div>
    </>
  );
};

export default FloatingBot;
