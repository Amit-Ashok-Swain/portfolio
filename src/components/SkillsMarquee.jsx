import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SkillsMarquee = () => {
  const container = useRef(null);
  const marqueeRef = useRef(null);

  const skills = useSelector((state) => state.portfolio.skills);
  const duplicatedSkills = [...skills, ...skills];

  useGSAP(
    () => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "none",
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      ref={container}
      className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 py-24 border-y border-slate-200 dark:border-slate-900 transition-colors duration-500"
    >
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent transition-colors duration-500"></div>
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent transition-colors duration-500"></div>

      <div ref={marqueeRef} className="flex w-max items-center">
        {duplicatedSkills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <span className="text-6xl sm:text-8xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800 px-8 whitespace-nowrap transition-colors duration-500">
              {skill}
            </span>
            <span className="text-orange-500 dark:text-orange-600 text-4xl transition-colors duration-500">
              ✦
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;
