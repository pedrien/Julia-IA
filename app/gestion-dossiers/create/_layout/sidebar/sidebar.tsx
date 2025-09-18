"use client";
import React, { useCallback, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, X } from "lucide-react";
import { Button, Input, Textarea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateFolderSchema,
  createFolderSchema,
} from "@/validators/folders/validator.create-folder";
import { useCreateFolder } from "@/hooks/features/folders/hook.create-folder";
import { useFolderCreation } from "@/contexts/features/folder/context.folder-creation";
import ModalConfirmation from "@/components/common/modals/ModalConfirmation/ModalConfirmation";
const Sidebar = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPendingFolder, startTransition] = useTransition();
  const [isModalOpenConfirmation, setIsModalOpenConfirmation] =
    useState<boolean>(false);
  const {
    selectedFile,
    setSelectedFile,
    removeFile: removeFileFromContext,
  } = useFolderCreation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    trigger,
  } = useForm<CreateFolderSchema>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      nom_dossier: "",
      description: "",
      fichier: undefined,
      size: 0,
    },
    mode: "all",
  });

  const { mutate: createFolder } = useCreateFolder({
    onSuccessCallback: () => {
      reset();
      removeFileFromContext();
    },
  });

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
        setValue("fichier", file);
        setValue("size", file.size);
        await trigger(["fichier", "size"]);
      }
    },
    [setSelectedFile, setValue, trigger]
  );

  const removeFile = useCallback(async () => {
    removeFileFromContext();
    reset({
      nom_dossier: "",
      description: "",
      fichier: undefined,
      size: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    await trigger(["fichier", "size"]);
  }, [removeFileFromContext, reset, trigger]);

  const onSubmit = useCallback(
    async (data: CreateFolderSchema) => {
      startTransition(async () => {
        createFolder(data);
      });
    },
    [createFolder]
  );

  return (
    <>
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
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-3 grid-cols-12">
              <div className="col-span-12">
                <label className="text-[14px] text-colorTitle block mb-1">
                  Fichier
                </label>
                {selectedFile ? (
                  <div className="blockUploadeFile p-4 border border-solid border-colorBorder rounded-xl relative">
                    <div className="content-block flex items-center gap-3">
                      <FileText className="text-primaryColor" size={20} />
                      <div className="flex-grow">
                        <p className="text-colorTitle text-sm font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-colorMuted text-xs">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={removeFile}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X size={16} className="text-colorMuted" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="blockUploadeFile p-4 border border-dashed border-colorBorder rounded-xl relative hover:border-colorMuted">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer z-10"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                    <div className="content-block flex items-center gap-2 flex-col justify-center">
                      <Upload className="text-colorTitle" />
                      <p className="text-colorMuted text-sm">
                        Importer un fichier (PDF uniquement)
                      </p>
                    </div>
                  </div>
                )}
                {errors.fichier && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fichier.message
                      ? errors.fichier.message === "Input not instance of File"
                        ? "Veuillez sélectionner un fichier"
                        : errors.fichier.message
                      : ""}
                  </p>
                )}
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
                  {...register("nom_dossier")}
                  errorMessage={errors.nom_dossier?.message}
                  isInvalid={!!errors.nom_dossier}
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
                  {...register("description")}
                  errorMessage={errors.description?.message}
                  isInvalid={!!errors.description}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="footer px-5 p-4">
          <div className="flex gap-2">
            <Button
              className="bg-bgGray text-colorTitle w-1/2"
              as={Link}
              href="/gestion-dossiers/"
              isDisabled={isPendingFolder}
            >
              Annuler
            </Button>
            <Button
              className="bg-primaryColor text-white w-1/2"
              isLoading={isPendingFolder}
              isDisabled={!isValid}
              onPress={() => setIsModalOpenConfirmation(true)}
            >
              Créer
            </Button>
          </div>
        </div>
      </div>

      <ModalConfirmation
        isOpen={isModalOpenConfirmation}
        onCancel={() => setIsModalOpenConfirmation(false)}
        onConfirm={() => {
          formRef.current?.requestSubmit();
          setIsModalOpenConfirmation(false);
        }}
        title="Confirmation"
        message="Voulez-vous vraiment créer ce dossier ?"
      />
    </>
  );
};

export default Sidebar;
