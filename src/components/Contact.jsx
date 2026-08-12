import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

const getSavedDraft = () => {
  if (typeof window === "undefined") return { email: "", message: "" };
  try {
    const draft = localStorage.getItem("amitOS_contact_draft");
    return draft ? JSON.parse(draft) : { email: "", message: "" };
  } catch {
    return { email: "", message: "" };
  }
};

export default function Contact() {
  const profile = useSelector((state) => state.portfolio.profile);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const [status, setStatus] = useState("IDLE");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: getSavedDraft(),
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.email || value.message) {
        localStorage.setItem("amitOS_contact_draft", JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    audio.playClick();
    setStatus("SENDING");

    setTimeout(() => {
      setStatus("SENT");
      reset({ email: "", message: "" });
      localStorage.removeItem("amitOS_contact_draft");

      setTimeout(() => setStatus("IDLE"), 5000);
    }, 1500);
  };

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseMove = contextSafe((e) => {
    if (!buttonRef.current || status === "SENT") return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.4;

    gsap.to(buttonRef.current, {
      x: x,
      y: y,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1.2, 0.3)",
    });
  });

  const currentMessage = watch("message");

  return (
    <footer
      id="contact-section"
      ref={containerRef}
      className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-between p-6 sm:p-16 relative overflow-hidden transition-colors duration-500"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none transition-colors duration-500"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-between items-start mt-8">
        <div>
          <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500 font-mono text-xs tracking-[0.3em] uppercase mb-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            System Ready
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm transition-colors">
            Open for deployment & 0→1 builds.
          </p>
        </div>
        <div className="hidden sm:block text-slate-400 dark:text-slate-600 font-mono text-xs transition-colors">
          COORD: 19.0330° N, 73.0297° E // NAVI MUMBAI
        </div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto flex-1 py-16 gap-12">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
          <h2 className="text-[15vw] lg:text-[8vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 dark:from-white dark:to-slate-600 hover:to-orange-500 dark:hover:to-orange-500 transition-colors duration-700 cursor-default select-none">
            INITIATE.
          </h2>
        </div>

        <div className="w-full lg:w-1/2 max-w-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl transition-colors duration-500"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-mono text-xs tracking-widest text-slate-500 dark:text-slate-400">
                SECURE COMMLINK
              </span>
              {currentMessage && (
                <span className="font-mono text-[10px] text-orange-500 animate-pulse">
                  DRAFT SAVED LATERALLY
                </span>
              )}
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="YOUR_EMAIL@DOMAIN.COM"
                {...register("email", {
                  required: "Email identity required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid domain format",
                  },
                })}
                className={`w-full bg-slate-100 dark:bg-slate-950 border ${errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-800"} rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600`}
              />
              {errors.email && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-mono">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="relative mt-2">
              <textarea
                rows="4"
                placeholder="ENCRYPTED MESSAGE PROTOCOL..."
                {...register("message", {
                  required: "Payload cannot be empty",
                })}
                className={`w-full bg-slate-100 dark:bg-slate-950 border ${errors.message ? "border-red-500" : "border-slate-200 dark:border-slate-800"} rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-white outline-none focus:border-orange-500 dark:focus:border-orange-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none`}
              />
              {errors.message && (
                <span className="absolute -bottom-5 left-2 text-[10px] text-red-500 font-mono">
                  {errors.message.message}
                </span>
              )}
            </div>

            <div
              className="mt-6 p-4 -m-4"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={buttonRef}
                type="submit"
                disabled={status !== "IDLE"}
                className={`w-full py-4 rounded-xl font-bold tracking-widest uppercase text-sm transition-all duration-300 ${
                  status === "SENT"
                    ? "bg-emerald-500 text-slate-950 border-emerald-500"
                    : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent hover:bg-orange-500 dark:hover:bg-orange-500 hover:text-white shadow-[0_0_20px_rgba(249,115,22,0)] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                }`}
              >
                {status === "IDLE"
                  ? "TRANSMIT SIGNAL"
                  : status === "SENDING"
                    ? "ROUTING..."
                    : "SIGNAL RECEIVED"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-end border-t border-slate-200 dark:border-slate-800 pt-8 pb-20 sm:pb-8 gap-6 sm:gap-0 transition-colors duration-500">
        <div className="flex gap-6 sm:gap-8">
          {profile.socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => audio.playClick()}
              className="text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 font-mono text-xs sm:text-sm uppercase tracking-widest transition-colors relative group"
            >
              {social.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-orange-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        <div className="text-slate-400 dark:text-slate-600 font-mono text-[10px] sm:text-xs tracking-widest text-center sm:text-right transition-colors">
          © {new Date().getFullYear()} AMIT ASHOK SWAIN{" "}
          <br className="sm:hidden" />
          <span className="hidden sm:inline"> // </span> ALL SYSTEMS NOMINAL
        </div>
      </div>
    </footer>
  );
}
