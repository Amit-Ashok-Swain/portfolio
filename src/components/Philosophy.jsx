import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  const text =
    "Great AI isn't just about training models. It's about orchestrating data, ruthless execution, and user psychology to build systems that scale from zero to one.";
  const words = text.split(" ");

  useGSAP(
    () => {
      const wordElements = gsap.utils.toArray(".reveal-word");

      gsap.fromTo(
        wordElements,
        { opacity: 0.1, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "bottom 50%",
            scrub: 1,
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center px-6 sm:px-16 border-t border-slate-200 dark:border-slate-900 py-32 transition-colors duration-500"
    >
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-[0.3em] text-orange-600 dark:text-orange-500 uppercase transition-colors duration-500">
          The Engineering Manifesto
        </h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-x-6 sm:gap-y-4">
        {words.map((word, index) => (
          <span
            key={index}
            className="reveal-word text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tight transition-colors duration-500"
          >
            {["AI", "models.", "data,", "execution,", "scale"].includes(
              word,
            ) ? (
              <span className="text-orange-600 dark:text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.2)] dark:drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-colors duration-500">
                {word}
              </span>
            ) : (
              word
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
