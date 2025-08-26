"use client";
import { addToast, Button } from "@heroui/react";
import { InputOtp } from "@heroui/input-otp";
import { Loader2, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRequestOtp } from "@/hooks/features/auth/hook.request-otp";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const FormLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<"login" | "verification">(
    "login"
  );
  const [username, setUsername] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [isVerifying, startVerification] = useTransition();
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes en secondes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const { mutate: requestOtp, isPending: isRequestingOtp } = useRequestOtp({
    onSuccessCallback: () => {
      setCurrentStep("verification");
      setTimeLeft(120); // Reset timer à 2 minutes
      setIsTimerRunning(true);
    },
  });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const error = searchParams.get("error");

  // Gestion du timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  // Formatage du temps en MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleLoginClick = async () => {
    if (isSubmitting || !username.trim()) return;
    setIsSubmitting(true);
    try {
      requestOtp({ username: username.trim() });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep("login");
  };

  const handleInputOtp = (value?: string) => {
    setOtp(value || "");
  };

  const handleVerifyOtp = () => {
    startVerification(async () => {
      try {
        const requestLogin = await signIn("credentials", {
          redirect: false,
          username: username,
          otp: otp,
        });

        if (
          requestLogin?.error &&
          requestLogin.error !== "no_session" &&
          requestLogin.error !== "session_expired"
        ) {
          addToast({
            title: "Échec de la connexion",
            description:
              "Le code de vérification est incorrect. Veuillez réessayer.",
            color: "danger",
          });
        } else {
          window.location.assign(callbackUrl);
        }
      } catch {
        addToast({
          title: "Une erreur s'est produite",
          description:
            "Une erreur s'est produite lors de la connexion. Veuillez réessayer.",
          color: "danger",
        });
      }
    });
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

  useEffect(() => {
    if (error === "session_expired") {
      const timeoutId = setTimeout(() => {
        addToast({
          title: "Votre session a expiré",
          description: "Veuillez vous reconnecter.",
          color: "warning",
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    if (error === "AccessDenied") {
      const timeoutId = setTimeout(() => {
        addToast({
          title: "Il semble que vous n'ayez encore pas de compte",
          description: "Veuillez vous inscrire pour continuer.",
          color: "warning",
        });
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  return (
    <div className="card-login backdrop-blur-[34px] rounded-[24px] relative z-10 lg:p-[40px] border border-t-0 border-[#ffffff0f] bg-[#b1aaaa17]">
      <div className="absolute -z-[1] w-full h-full top-0 left-0 rounded-[24px] border-t-[2px] border-[#ffffff2a]"></div>
      <div className="flex justify-center lg:mt-[-74px] lg:mb-3">
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
                        className="lg:h-[52px] relative z-20 border-0 outline-none w-full rounded-xl bg-[#ffffff00]  border-[#ffffff10] focus-visible:ring-[0px] focus-visible:border-[#ffffff10] text-white pl-12"
                        type="text"
                        placeholder="Entrez votre pseudo"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleLoginClick();
                          }
                        }}
                      />
                      {/* <div className="line -z-[1] bg-white w-[0%] h-[7px] bottom-[-1px] rounded-[100%] blur-[1px] absolute transition-all duration-300"></div> */}
                      <div className="fake-input z-10 top-0 absolute left-0 w-full h-full rounded-xl bg-[#ffffff12] backdrop-blur-[34px] border border-[#ffffff10]"></div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      onPress={handleLoginClick}
                      disabled={
                        isSubmitting || isRequestingOtp || !username.trim()
                      }
                      className={`text-white ${
                        isSubmitting || isRequestingOtp
                          ? "lg:w-[52px] p-0 lg:h-[52px] rounded-full"
                          : "w-full lg:h-[52px]"
                      }  placeholder:text-white shadow-none bg-[#782efa] rounded-xl mt-2 cursor-pointer hover:bg-[#782efa] disabled:opacity-70 disabled:pointer-events-none transition-all duration-300`}
                    >
                      {isSubmitting || isRequestingOtp ? (
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
              <div>
                <h1 className="text-center text-white font-medium lg:text-[36px] mb-1">
                  Vérification du code
                </h1>
                <p className="text-center text-white opacity-80 lg:mb-3">
                  Nous vous avons envoyé un code à 6 chiffres à votre adresse
                  e‑mail
                </p>
                <span className="text-center text-sm block text-white/80">
                  {formatTime(timeLeft)}
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
                    onComplete={handleInputOtp}
                  />
                </div>
                <p className="text-center text-white/80 lg:mb-6 lg:mt-4">
                  {"Vous n'avez pas reçu le code ?"}{" "}
                  <Link
                    href={"#"}
                    className={`font-medium ${
                      timeLeft === 0
                        ? "text-[#782efa]"
                        : "text-white/50 cursor-not-allowed"
                    }`}
                    onClick={(e) => {
                      if (timeLeft > 0) {
                        e.preventDefault();
                      }
                    }}
                  >
                    {timeLeft === 0 ? "Revoyez le code" : "Revoyez le code"}
                  </Link>
                </p>
                <div className="flex gap-3">
                  <Button
                    onPress={handleBackToLogin}
                    className="text-white flex-1 lg:h-[52px] placeholder:text-white shadow-none bg-[#ffffff12] border border-[#ffffff10] rounded-xl mt-2 cursor-pointer hover:bg-[#ffffff20]"
                  >
                    Retour
                  </Button>
                  <Button
                    onPress={handleVerifyOtp}
                    isLoading={isVerifying}
                    isDisabled={otp.length !== 6}
                    className="text-white flex-1 lg:h-[52px] placeholder:text-white shadow-none bg-[#782efa] rounded-xl mt-2 cursor-pointer hover:bg-[#782efa]"
                  >
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
