import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseMove = contextSafe((e) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    cardRef.current.style.setProperty("--mouse-x", `${localX}px`);
    cardRef.current.style.setProperty("--mouse-y", `${localY}px`);

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      ease: "power3.out",
      duration: 0.4,
      transformPerspective: 1500,
      force3D: true,
    });

    gsap.to(imageRef.current, {
      x: -x * 15,
      y: -y * 15,
      scale: 1.1,
      ease: "power3.out",
      duration: 0.4,
      force3D: true,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    if (!cardRef.current || !imageRef.current) return;
    gsap.to([cardRef.current, imageRef.current], {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      scale: 1,
      ease: "elastic.out(1, 0.3)",
      duration: 1,
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col h-full w-[85vw] sm:w-[600px] rounded-[2rem] border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative [transform-style:preserve-3d] will-change-transform shrink-0 transition-colors duration-500"
    >
      <div className="h-[45%] w-full overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-black rounded-t-[2rem] relative transition-colors duration-500">
        <img
          ref={imageRef}
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover will-change-transform"
        />

        <div
          className="absolute inset-0 z-20 bg-slate-950/95 p-6 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            WebkitMaskImage:
              "radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
            maskImage:
              "radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)",
          }}
        >
          <div className="text-orange-500 font-mono text-[10px] mb-2 border-b border-slate-800 pb-1 w-max">
            SYSTEM_OVERRIDE // SOURCE_CODE_REVEAL
          </div>
          <pre className="text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed shadow-[0_0_15px_rgba(52,211,153,0.2)]">
            {project.codeSnippet}
          </pre>
        </div>
      </div>

      <div className="flex flex-col justify-between p-8 flex-1 relative z-20 bg-white dark:bg-slate-900 rounded-b-[2rem] [transform:translateZ(40px)] transition-colors duration-500">
        <div>
          <h4 className="text-orange-600 dark:text-orange-400 font-bold tracking-widest text-xs mb-3 uppercase transition-colors duration-500">
            {project.tagline}
          </h4>
          <h3 className="text-3xl sm:text-4xl font-black mb-4 text-slate-900 dark:text-white tracking-tight transition-colors duration-500">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-3 transition-colors duration-500">
            {project.description}
          </p>
        </div>

        <div className="mt-6">
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="text-slate-900 dark:text-white w-max font-bold uppercase tracking-wider text-sm border-b-2 border-orange-500 pb-1 hover:text-orange-600 dark:hover:text-orange-400 transition-colors inline-flex items-center gap-2 duration-300"
          >
            Explore Platform <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
