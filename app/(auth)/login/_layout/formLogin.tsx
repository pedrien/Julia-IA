"use client";
import { Button } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { Loader2, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FormLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<"login" | "verification">(
    "login"
  );

  const handleLoginClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      // Remplacer par votre logique de connexion (appel API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Passer à l'étape de vérification après la connexion
      setCurrentStep("verification");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep("login");
  };

  const slideVariants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      zIndex: 0,
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="card-login backdrop-blur-[34px] rounded-[24px] relative z-10 lg:p-[40px] border border-t-0 border-[#ffffff0f] bg-[#b1aaaa17]">
      <div className="absolute -z-[1] w-full h-full top-0 left-0 rounded-[24px] border-t-[2px] border-[#ffffff2a]"></div>
      <div className="content-form relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {currentStep === "login" && (
            <motion.div
              key="login"
              custom="right"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <div className="flex justify-center lg:mt-[-70px] lg:mb-3">
                <div className="icon flex items-center justify-center bg-[#782efa] rounded-full w-[70px] h-[70px]">
                  <Image
                    src={"/images/logos/icon.png"}
                    className="w-[100px!important] max-w-[max-content]"
                    layout={"responsive"}
                    alt="icon julia"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-center text-white font-medium lg:text-[36px] mb-1">
                  Bienvenu sur Jul<span className="text-[#782efa]">ia</span>
                </h1>
                <p className="text-center text-white opacity-80 lg:mb-6">
                  Veuillez saisir votre pseudo pour vous connecter
                </p>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label
                      htmlFor="pseudo"
                      className="text-white mb-2 block text-sm font-medium"
                    >
                      Pseudo
                    </label>
                    <div className="relative block-login z-10 flex justify-center items-center">
                      <div className="icon absolute z-10 left-4 text-white">
                        <UserRound size={22} />
                      </div>
                      <input
                        className="lg:h-[52px] border outline-none w-full rounded-xl bg-[#ffffff12] backdrop-blur-[34px] border-[#ffffff10] focus-visible:ring-[0px] focus-visible:border-[#ffffff10] text-white pl-12"
                        type="text"
                        placeholder="Entrez votre pseudo"
                      />
                      <div className="line -z-[1] bg-white w-[0%] h-[7px] bottom-[-1px] rounded-[100%] blur-[1px] absolute transition-all duration-300"></div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onPress={handleLoginClick}
                      disabled={isSubmitting}
                      className={`text-white ${
                        isSubmitting
                          ? "lg:w-[52px] p-0 lg:h-[52px] rounded-full"
                          : "w-full lg:h-[52px]"
                      }  placeholder:text-white shadow-none bg-[#782efa] rounded-xl mt-2 cursor-pointer hover:bg-[#782efa] disabled:opacity-70 transition-all duration-300`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "verification" && (
            <motion.div
              key="verification"
              custom="left"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="w-full"
            >
              <div className="flex justify-center lg:mt-[-70px] lg:mb-3">
                <div className="icon flex items-center justify-center bg-[#782efa] rounded-full w-[70px] h-[70px]">
                  <Image
                    src={"/images/logos/icon.png"}
                    className="w-[100px!important] max-w-[max-content]"
                    layout={"responsive"}
                    alt="icon julia"
                    width={0}
                    height={0}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-center text-white font-medium lg:text-[36px] mb-1">
                  Vérification du code
                </h1>
                <p className="text-center text-white opacity-80 lg:mb-3">
                  Nous vous avons envoyé un code à 6 chiffres à votre adresse
                  e‑mail
                </p>
                <span className="text-center text-sm block text-white/80">
                  00:00
                </span>
                <div className="flex flex-col">
                  <InputOtp
                    length={6}
                    variant="bordered"
                    classNames={{
                      base: "w-full",
                      segmentWrapper: "w-full gap-2",
                      segment:
                        "w-[calc(100%/6)] lg:h-[52px] rounded-[12px] bg-[#ffffff12] backdrop-blur-[34px] border-[#ffffff10] border-1 text-[#fff!important]",
                    }}
                  />
                </div>
                <p className="text-center text-white/80 lg:mb-6 lg:mt-4">
                  {"Vous n'avez pas reçu le code ?"}{" "}
                  <Link href={"#"} className="font-medium text-[#782efa]">
                    Revoyez le code
                  </Link>
                </p>
                <div className="flex gap-3">
                  <Button
                    onPress={handleBackToLogin}
                    className="text-white flex-1 lg:h-[52px] placeholder:text-white shadow-none bg-[#ffffff12] border border-[#ffffff10] rounded-xl mt-2 cursor-pointer hover:bg-[#ffffff20]"
                  >
                    Retour
                  </Button>
                  <Button className="text-white flex-1 lg:h-[52px] placeholder:text-white shadow-none bg-[#782efa] rounded-xl mt-2 cursor-pointer hover:bg-[#782efa]">
                    Valider
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FormLogin;
