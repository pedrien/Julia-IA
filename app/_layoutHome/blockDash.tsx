import React, { useEffect, useState } from "react";
import {
  Mic,
  ArrowUpToLine,
  FileText,
  EllipsisVertical,
  Search,
  Folder,
} from "lucide-react";
import { Button, Input } from "@heroui/react";
import { useModalContext } from "@/contexts/Modal/ModalContext";
import BlockCardWidget from "./blockCardWidget";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NewRoom from "@/components/features/room/newRoom";
import NewUser from "@/components/features/room/newUser";

const BlockDash = () => {
  const { openModal } = useModalContext();
  const { data: session } = useSession();
  const [greeting, setGreeting] = useState("");

  // Fonction qui met à jour le salut
  const updateGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
      setGreeting("Bonjour");
    } else if (hours >= 12 && hours < 16) {
      setGreeting("Bon après-midi");
    } else {
      setGreeting("Bonsoir");
    }
  };

  useEffect(() => {
    updateGreeting(); // initialisation
    const interval = setInterval(updateGreeting, 60 * 1000); // vérifie chaque minute

    return () => clearInterval(interval); // nettoyage
  }, []);

  return (
    <div>
      <div className="container-fluid lg:px-7 px-2">
        <div
          className="banner bg-primaryColor lg:py-[30px] px-4 py-5 lg:px-6 relative z-10 overflow-hidden rounded-2xl"
          style={{
            background:
              "linear-gradient(to right, var(--primaryColor), #d72efa)",
          }}
        >
          <div className="w-full h-full absolute top-0 left-0 -z-10 overflow-hidden">
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[120px!important] absolute top-[-86px] right-[-5px] opacity-20"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[100px!important] absolute bottom-[-10px] right-[130px] opacity-50"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[60px!important] absolute bottom-[-40px] right-[350px] opacity-10"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[60px!important] absolute top-[-40px] right-[420px] opacity-20"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[60px!important] absolute top-[20px] right-[520px] opacity-10"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[60px!important] absolute top-[0px] right-[270px] opacity-20"
            />
            <Image
              src={"/images/star.png"}
              layout="responsive"
              alt="image"
              width={0}
              height={0}
              className="w-[80px!important] absolute bottom-[-50px] right-[-5px] opacity-10"
            />
          </div>
          <div className="circle absolute lg:w-[350px] w-[150px] lg:h-[350px] h-[150px] -z-10 bg-white rounded-full opacity-40 blur-[100px] lg:-left-[100px] -left-[50px] lg:-top-[250px] -top-[90px]"></div>
          <div className="circle absolute w-[350px] h-[350px] -z-10 bg-white rounded-full opacity-40 blur-[100px] -right-[100px] -bottom-[250px]"></div>
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-6">
              <h1 className="lg:text-[28px] text-white font-bold text-[20px]">
                {greeting}, {session?.user?.name}
              </h1>
              <p className="text-white/80 text-sm lg:text-[16px]">
                Bienvenu sur Julia, votre assistante virtuelle
              </p>
            </div>
          </div>
        </div>
        <BlockCardWidget />
        <div className="block-action-rapide mt-3 lg:mt-3">
          <h3 className="text-colorTitle font-semibold text-[16px] mb-3">
            Actions rapides
          </h3>
          <div className="grid lg:grid-cols-5 grid-cols-12 gap-3 lg:gap-3">
            <div className="col-span-4 lg:col-span-1">
              <div
                className="card flex flex-col gap-2 cursor-pointer group"
                onClick={() => openModal("ModalNewRoom")}
              >
                <div className="content-icon gap-3 shadow-[0_5px_18px_#00000005] bg-bgCard transition-background duration-300 rounded-3xl flex flex-col lg:flex-row items-center p-3">
                  <div className="icon lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] flex-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#ff4949] text-white dark:bg-[#ff494930] dark:text-[#ff4949] rounded-full flex justify-center items-center">
                    <Mic size={24}></Mic>
                  </div>
                  <h4 className="text-colorTitle font-semibold lg:text-sm text-xs text-center lg:text-left">
                    Enregistrer une réunion
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1">
              <div className="card flex flex-col gap-2 cursor-pointer group">
                <div className="content-icon shadow-[0_5px_18px_#00000005]  bg-bgCard  transition-background duration-300 rounded-3xl flex flex-col lg:flex-row items-center gap-3 p-3">
                  <div className="icon  lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] flex-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-primaryColor text-white dark:bg-[#8b5cf645] dark:text-[#8b5cf6] rounded-full flex justify-center items-center">
                    <ArrowUpToLine size={24}></ArrowUpToLine>
                  </div>
                  <h4 className="text-colorTitle font-semibold lg:text-sm text-xs text-center lg:text-left">
                    Uploader et transcrire
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1">
              <div className="card flex flex-col gap-2 cursor-pointer group">
                <div className="content-icon shadow-[0_5px_18px_#00000005] p-3 gap-3 bg-bgCard  transition-background duration-300 rounded-2xl flex flex-col lg:flex-row items-center">
                  <div className="icon lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] flex-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#494cff] text-white dark:bg-[#494cff47] dark:text-[#494cff] rounded-full flex justify-center items-center">
                    <Folder size={24}></Folder>
                  </div>
                  <h4 className="text-colorTitle font-semibold lg:text-sm text-xs text-center lg:text-left">
                    Créer un dossier
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1">
              <div className="card flex flex-col gap-2 cursor-pointer group">
                <div className="content-icon shadow-[0_5px_18px_#00000005]  bg-bgCard  transition-background duration-300 rounded-3xl flex flex-col lg:flex-row items-center p-3 gap-3">
                  <div className="icon lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] flex-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#27c683] text-white dark:bg-[#27c6832e] dark:text-[#27c683] rounded-full flex justify-center items-center">
                    <Mic size={24}></Mic>
                  </div>
                  <h4 className="text-colorTitle font-semibold lg:text-sm text-xs text-center lg:text-left">
                    Demarrer un réunion
                  </h4>
                </div>
                <div className="text-center"></div>
              </div>
            </div>
            <div className="col-span-4 lg:col-span-1">
              <div className="card flex flex-col gap-2 cursor-pointer group">
                <div className="content-icon shadow-[0_5px_18px_#00000005]  bg-bgCard rounded-3xl flex flex-col lg:flex-row items-center gap-3 p-3">
                  <div className="icon lg:w-[50px] lg:h-[50px] w-[40px] h-[40px] flex-none group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#ffa351] text-white dark:bg-[#ffa3513b] dark:text-[#ffa351] rounded-full flex justify-center items-center">
                    <ArrowUpToLine size={24}></ArrowUpToLine>
                  </div>
                  <h4 className="text-colorTitle font-semibold lg:text-sm text-xs text-center lg:text-left">
                    Uploader et transcrire
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block-file-recents lg:mt-6 mt-3">
          <div className="card bg-bgCard shadow-[0_5px_18px_#00000005]  rounded-2xl">
            <div className="flex items-center justify-between lg:mb-4 mb-6 px-4 pt-4">
              <h2 className="text-colorTitle font-semibold">
                Fichiers recents
              </h2>
              <div>
                <Input
                  type="text"
                  variant="bordered"
                  placeholder="Trouvez un fichier"
                  classNames={{
                    inputWrapper:
                      "bg-transparent border-colorBorder border-[1px] shadow-none",
                  }}
                  startContent={<Search size={20} />}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="table w-full table-bordered">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date de création</th>
                    <th>Service</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="icon text-colorMuted">
                          <FileText size={18} />
                        </div>
                        <span className="text-colorTitle">
                          Recording - 19 August 2025
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>19/08/2025</span>
                    </td>
                    <td>
                      <span>Transcription</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                          <EllipsisVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="icon text-colorMuted">
                          <FileText size={18} />
                        </div>
                        <span className="text-colorTitle">
                          Recording - 19 August 2025
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>19/08/2025</span>
                    </td>
                    <td>
                      <span>Transcription</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                          <EllipsisVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="icon text-colorMuted">
                          <FileText size={18} />
                        </div>
                        <span className="text-colorTitle">
                          Recording - 19 August 2025
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>19/08/2025</span>
                    </td>
                    <td>
                      <span>Transcription</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                          <EllipsisVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex items-center gap-1">
                        <div className="icon text-colorMuted">
                          <FileText size={18} />
                        </div>
                        <span className="text-colorTitle">
                          Recording - 19 August 2025
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>19/08/2025</span>
                    </td>
                    <td>
                      <span>Transcription</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Button className="min-w-0 bg-transparent hover:bg-bgGray text-colorTitle p-0 w-[32px] h-[32px]">
                          <EllipsisVertical size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <NewRoom />
        <NewUser />
      </div>
    </div>
  );
};

export default BlockDash;
