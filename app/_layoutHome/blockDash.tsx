import React, { useEffect, useState } from "react";
import {
  Mic,
  ArrowUpToLine,
  FileText,
  EllipsisVertical,
  Search,
  Printer,
} from "lucide-react";
import { Button, Input } from "@heroui/react";

import Image from "next/image";
import { useSession } from "next-auth/react";

const BlockDash = () => {
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
    <div className="container-fluid lg:px-7 px-2">
      <div
        className="banner bg-primaryColor lg:p-[22px] rounded-xl relative z-10 overflow-hidden"
        // style={{
        //   background: "linear-gradient(to right, var(--primaryColor), #cd2efa)",
        // }}
      >
        <div className="w-full h-full absolute top-0 left-0 -z-10 opacity-40">
          <Image
            src={"/images/img.png"}
            layout="responsive"
            alt="image"
            width={0}
            height={0}
            className="w-full h-[100%!important] object-cover scale-[.8] relative -right-40"
          />
        </div>
        <div className="circle absolute w-[350px] h-[350px] -z-10 bg-white rounded-full opacity-40 blur-[100px] -left-[100px] -top-[250px]"></div>
        <div className="circle absolute w-[350px] h-[350px] -z-10 bg-white rounded-full opacity-40 blur-[100px] -right-[100px] -bottom-[250px]"></div>
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6">
            <h1 className="lg:text-[28px] text-white font-bold">
              {greeting}, {session?.user?.name}
            </h1>
            <p className="text-white/80">
              Bienvenu sur Julia, votre assistante virtuelle
            </p>
          </div>
        </div>
      </div>
      <div className="block-action-rapide lg:mt-4 mt-3">
        <h2 className="text-colorTitle font-semibold lg:mb-3 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-5 gap-3 lg:gap-4">
          <div className="col-span-6 lg:col-span-1">
            <div className="card flex flex-col gap-2 cursor-pointer group">
              <div className="content-icon aspect-1/1 bg-[#f7f7f7]  transition-background duration-300 rounded-xl flex flex-col items-center justify-center">
                <div className="icon w-[60px] h-[60px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#ff4949] text-white rounded-full flex justify-center items-center">
                  <Mic size={28}></Mic>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-colorTitle font-semibold text-sm">
                  Enregistrer une réunion
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-1">
            <div className="card flex flex-col gap-2 cursor-pointer group">
              <div className="content-icon aspect-1/1 bg-[#f7f7f7]   transition-background duration-300 rounded-xl flex flex-col items-center justify-center">
                <div className="icon w-[60px] h-[60px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-primaryColor text-white rounded-full flex justify-center items-center">
                  <ArrowUpToLine size={28}></ArrowUpToLine>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-colorTitle font-semibold text-sm">
                  Uploader et transcrire
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-1">
            <div className="card flex flex-col gap-2 cursor-pointer group">
              <div className="content-icon aspect-1/1 bg-[#f7f7f7]   transition-background duration-300 rounded-xl flex flex-col items-center justify-center">
                <div className="icon w-[60px] h-[60px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#494cff] text-white rounded-full flex justify-center items-center">
                  <Printer size={28}></Printer>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-colorTitle font-semibold text-sm">
                  Numériser un document
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-1">
            <div className="card flex flex-col gap-2 cursor-pointer group">
              <div className="content-icon aspect-1/1 bg-[#f7f7f7]   transition-background duration-300 rounded-xl flex flex-col items-center justify-center">
                <div className="icon w-[60px] h-[60px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#39ceb2] text-white rounded-full flex justify-center items-center">
                  <Mic size={28}></Mic>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-colorTitle font-semibold text-sm">
                  Demarrer un réunion
                </h4>
              </div>
            </div>
          </div>
          <div className="col-span-6 lg:col-span-1">
            <div className="card flex flex-col gap-2 cursor-pointer group">
              <div className="content-icon aspect-1/1 bg-[#f7f7f7] rounded-xl flex flex-col items-center justify-center">
                <div className="icon w-[60px] h-[60px] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 bg-[#ffa351] text-white rounded-full flex justify-center items-center">
                  <ArrowUpToLine size={28}></ArrowUpToLine>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-colorTitle font-semibold text-sm">
                  Uploader et transcrire
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="block-file-recents lg:mt-8 mt-3">
        <div className="card border border-colorBorder rounded-xl">
          <div className="flex items-center justify-between lg:mb-4 mb-6 px-4 pt-4">
            <h2 className="text-colorTitle font-semibold">Fichiers recents</h2>
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
  );
};

export default BlockDash;
