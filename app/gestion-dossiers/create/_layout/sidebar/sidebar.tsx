import React from "react";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Button, Input, Textarea } from "@heroui/react";

const Sidebar = () => {
  return (
    <div className="bg-bgCard lg:w-[450px] h-full fixed top-0 left-0 flex flex-col">
      <div className="header p-3 border-b border-colorBorder">
        <div className="flex items-center">
          <Link
            href={"/gestion-dossiers/"}
            className="w-[36px] h-[36px] flex justify-center items-center text-colorTitle"
          >
            <ArrowLeft size={20}></ArrowLeft>
          </Link>
          <h3 className="text-colorTitle font-semibold text-[18px]">
            Nouveau dossier
          </h3>
        </div>
      </div>
      <div className="body flex-grow overflow-y-auto p-3 px-5">
        <form action="">
          <div className="grid gap-3 grid-cols-12">
            <div className="col-span-12">
              <label className="text-[14px] text-colorTitle block mb-1">
                Fichier
              </label>
              <div className="blockUploadeFile p-4 border border-dashed border-colorBorder rounded-xl relative hover:border-colorMuted">
                <input
                  type="file"
                  className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer z-10"
                  accept=".pdf"
                />
                <div className="content-block flex items-center gap-2 flex-col justify-center">
                  <Upload className="text-colorTitle" />
                  <p className="text-colorMuted text-sm">
                    Importer un fichier (PDF uniquement)
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <label className="text-[14px] text-colorTitle block mb-1">
                Nom
              </label>
              <Input
                type="text"
                placeholder="Nom du dossier"
                id="name"
                labelPlacement="outside"
                variant="bordered"
                classNames={{
                  inputWrapper:
                    "bg-transparent border-colorBorder h-[42px] border-[1px] shadow-none",
                  input:
                    "text-colorTitle placeholder:text-colorMuted placeholder:opacity-70",
                }}
              />
            </div>
            <div className="col-span-12">
            <label className="text-[14px] text-colorTitle block mb-1">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Description de la réunion"
                variant="bordered"
                minRows={5}
                classNames={{
                  inputWrapper:
                    "bg-transparent border-colorBorder border-[1px] shadow-none ",
                  input:
                    "text-colorTitle placeholder:text-colorMuted placeholder:opacity-70",
                }}
                // {...register("description")}
                // errorMessage={errors.description?.message}
                // isInvalid={!!errors.description}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="footer px-5 p-4">
        <div className="flex gap-2">
          <Button
            className="bg-[#f5f7fb] text-colorTitle w-1/2"
            as={Link}
            href="/gestion-dossiers/"
          >
            Annuler
          </Button>
          <Button className="bg-primaryColor text-white w-1/2">Créer</Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
