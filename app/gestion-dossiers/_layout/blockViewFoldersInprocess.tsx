import React from "react";
import { Folder, Search } from "lucide-react";
import { Input } from "@heroui/react";

import Link from "next/link";

const blockViewFoldersInprocess = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-3 mb-3 lg:mb-4 lg:mt-4">
        <div className="col-span-12 lg:col-span-5">
          <h4 className="text-colorTitle font-semibold">Dossiers en cours</h4>
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
      </div>
    </div>
  );
};

export default blockViewFoldersInprocess;
