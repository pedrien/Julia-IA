import React from "react";
import { Folder, Search, ChevronDown } from "lucide-react";
import {
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import Link from "next/link";

const BlockViewFolders = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-3 lg:mb-4 lg:mt-6">
        <div className="col-span-12 lg:col-span-5">
          <h4 className="text-colorTitle font-semibold">Dossiers</h4>
        </div>
        <div className="col-span-12 lg:col-span-7">
          <div className="flex gap-2 lg:justify-end">
            <div className="lg:w-[320px] max-w-full">
              <Input
                type="text"
                placeholder="
                      Rechercher.."
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "bg-bgCard border-colorBorder h-[36px] border-none shadow-none",
                  input: "text-colorTitle, placeholder:text-colorMuted",
                }}
                startContent={
                  <div className="text-colorTitle pr-1">
                    <Search className="w-[18px]" />
                  </div>
                }
              />
            </div>
            <Dropdown
              classNames={{
                content: "min-w-[150px] shadow-[0_5px_18px_#00000009]",
              }}
            >
              <DropdownTrigger>
                <Button
                  className="min-w-0 bg-bgCard hidden sm:flex text-colorTitle py-2 px-3 h-auto"
                  endContent={<ChevronDown className="w-[16]" />}
                >
                  Statut
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownSection title={"Statut"}>
                  <DropdownItem
                    key={1}
                    classNames={{
                      base: "data-[hover=true]:bg-bgFond data-[hover=true]:text-colorTitle text-[14px] text-colorTitle",
                    }}
                  >
                    <span className="flex items-center gap-2">En cours</span>
                  </DropdownItem>
                  <DropdownItem
                    key={2}
                    classNames={{
                      base: "data-[hover=true]:bg-bgFond data-[hover=true]:text-colorTitle text-[14px] text-colorTitle",
                    }}
                  >
                    <span className="flex items-center gap-2">Traité</span>
                  </DropdownItem>
                  <DropdownItem
                    key={3}
                    classNames={{
                      base: "data-[hover=true]:bg-bgFond data-[hover=true]:text-colorTitle text-[14px] text-colorTitle",
                    }}
                  >
                    <span className="flex items-center gap-2">Réjeté</span>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 lg:gap-4">
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#ee8539] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  En cours
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#ee8539] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  En cours
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#ee8539] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  En cours
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#ee8539] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  En cours
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 lg:col-span-3 2xl:col-span-2">
          <div className="card shadow-[0_5px_18px_#00000005] cursor-pointer group bg-bgCard p-[18px] rounded-xl relative z-10">
            <Link
              href={"/gestion-dossiers/1"}
              className="absolute w-full h-full top-0 left-0 z-10"
            ></Link>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="bg-[#22c66a] w-[7px] h-[7px] rounded-full"></div>
                <span className="text-colorTitle text-xs font-medium">
                  Traité
                </span>
              </div>
            </div>
            <div
              className="absolute -z-10 h-[24px] w-[60%] bg-background right-0 top-[-10px]"
              style={{ transform: "skew(45deg)" }}
            ></div>
            <div className="bubble w-[24px] h-[24px] absolute bg-transparent rounded-full right-0 shadow-[10px_-10px_0_var(--background)] top-[14px]"></div>
            <div className="content-card flex flex-col gap-2 items-center justify-center mt-2">
              <Folder size={44} className="text-colorMuted opacity-40"></Folder>
              <div className="w-full text-center">
                <h6 className="text-sm font-medium text-colorTitle mb-1">
                  Contrat de travail
                </h6>
                <p className="text-xs text-colorMuted">1 fichier</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockViewFolders;
