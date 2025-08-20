"use client";
import { useEffect, useRef, useState } from "react";
import FormLogin from "./formLogin";

// Permet de contrôler la vitesse de la vidéo du login sans UI (en arrière-plan)
export function setLoginVideoSpeed(rate: number) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent<number>("loginVideo:setSpeed", { detail: rate })
    );
  }
}

// Optionnel: accélère temporairement puis remet à 1x après `durationMs`
export function boostLoginVideoSpeedTemporarily(
  rate: number,
  durationMs = 5000
) {
  setLoginVideoSpeed(rate);
  if (typeof window !== "undefined") {
    window.setTimeout(() => setLoginVideoSpeed(1), durationMs);
  }
}

const Container = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(.4);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Écoute un événement global pour modifier la vitesse sans interface
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<number>;
      if (typeof ce.detail === "number") {
        setPlaybackRate(ce.detail);
      }
    };
    window.addEventListener("loginVideo:setSpeed", handler as EventListener);
    return () => {
      window.removeEventListener(
        "loginVideo:setSpeed",
        handler as EventListener
      );
    };
  }, []);

  return (
    <div className="block-login min-h-screen relative z-1">
      <div className="block-video fixed top-0 left-0 w-full h-full -z-[1]">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <video
          src="/videos/1.mp4"
          className="w-full h-full object-cover"
          playsInline
          loop
          autoPlay
          muted
          ref={videoRef}
        ></video>
      </div>
      {/* Contrôle en arrière-plan: utiliser setLoginVideoSpeed(...) depuis n'importe où */}
      <div className="content-form min-h-screen py-10 flex flex-col">
        <div className="m-auto 2xl:w-[28%]">
          <FormLogin />
          <p className="text-white text-center lg:mt-8 text-sm">©Julia 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Container;
