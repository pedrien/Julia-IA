import React from "react";
import Link from "next/link";
import { ArrowLeft,  } from "lucide-react";
import { Button,Chip } from "@heroui/react";
import { Avatar, Tabs, Tab } from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";

const TabsInfoRoom = () => {
  const { openModal } = useModalContext();
  return (
    <div className="flex flex-col h-screen bg-bgCard">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Link
              href={"/rooms"}
              className="w-[36px] h-[36px] flex justify-center items-center text-colorTitle"
            >
              <ArrowLeft size={20} />
            </Link>
            <h3 className="text-colorTitle font-semibold text-[18px]">
              Dossier-26292
            </h3>
            <Chip className={`bg-[#f08d501b] text-[#f08c50]`} size="sm">
              En cours
            </Chip>
          </div>
        </div>
      </div>
      <div className="body p-3 px-5 flex-grow overflow-y-auto">
        <Tabs
          aria-label="Options"
          style={{ overflow: "hidden", width: "100%" }}
          classNames={{
            cursor:
              "bg-primaryColor dark:bg-primaryColor shadow-none rounded-md h-[2px] top-auto bottom-[-3px]",
            tab: " bg-transparent",
            tabList: "bg-transparent gap-2 rounded-none",
            tabContent:
              "text-colorMuted group-data-[selected=true]:text-colorTitle group-data-[selected=true]:font-medium",
          }}
        >
          <Tab key="resume" title="Résumé IA">
            <div className="flex items-center gap-2 mb-3 mt-2">
              <h3 className="text-colorTitle font-semibold">Résumé de Julia</h3>
            </div>
            <div className="card p-3 rounded-xl bg-bgGray flex flex-col gap-2">
              <p className="text-colorTitle text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem iusto minima quis dicta tempore unde eligendi non iste! Excepturi illum totam est consequuntur, laborum beatae officia quo quod autem laboriosam!</p>
              <p className="text-colorTitle text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem iusto minima quis dicta tempore unde eligendi non iste! Excepturi illum totam est consequuntur, laborum beatae officia quo quod autem laboriosam!</p>
              <p className="text-colorTitle text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem iusto minima quis dicta tempore unde eligendi non iste! Excepturi illum totam est consequuntur, laborum beatae officia quo quod autem laboriosam!</p>
            </div>
          </Tab>
          {/* <Tab key="activ" title="Activités">
            <div className="flex items-center gap-2 mb-3 mt-2">
              <h3 className="text-colorTitle font-semibold">Activités</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
            </div>
          </Tab> */}
          <Tab key="avis" title="Avis">
            <div className="flex items-center gap-2 mb-3 mt-2">
              <h3 className="text-colorTitle font-semibold">Avis</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
              <div className="card p-3 rounded-xl bg-bgGray">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    alt={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                    className="shrink-0"
                    size="sm"
                    src={
                      "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png"
                    }
                  />
                  <div>
                    <h6 className="text-colorTitle font-medium text-[15px]">
                      Martins kitambala
                    </h6>
                  </div>
                </div>
                <p className="text-colorTitle text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Saepe assumenda asperiores atque?
                </p>
                <div className="date text-xs text-end text-colorMuted mt-1">
                  30/08/2025 à 15:50
                </div>
              </div>
            </div>
          </Tab>
          <Tab key="info" title="Infos générales">
            <h3 className="text-colorTitle font-semibold mb-3 mt-2">
              Infos générales
            </h3>
            <div className="card p-3 rounded-xl border border-colorBorder border-dashed">
              <div className="flex flex-col gap-3">
                <div>
                  <h4 className="text-colorTitle font-medium text-sm mb-1">
                    Titre
                  </h4>
                  <p className="text-colorMuted text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing.
                  </p>
                </div>
                <div>
                  <h4 className="text-colorTitle font-medium text-sm mb-1">
                    Date
                  </h4>
                  <p className="text-colorMuted text-sm">29/08/2025</p>
                </div>
                <div>
                  <h4 className="text-colorTitle font-medium text-sm mb-1">
                    Description
                  </h4>
                  <p className="text-colorMuted text-sm">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Fugit vel officia maiores!
                  </p>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
      <div className="footer px-5 p-4">
        <Button
          className="bg-primaryColor  text-white w-full font-medium"
          onPress={() => openModal("NewObserv")}
        >
          Laisser un avis
        </Button>
      </div>
    </div>
  );
};

export default TabsInfoRoom;
