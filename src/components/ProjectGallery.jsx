import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGallery() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);
  const projects = useSelector((state) => state.portfolio.projects);

  useGSAP(
    () => {
      if (!galleryRef.current || !sectionRef.current) return;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const getScrollAmount = () => {
          const galleryWidth = galleryRef.current?.scrollWidth || 0;
          return Math.max(
            0,
            galleryWidth - window.innerWidth + window.innerWidth * 0.15,
          );
        };

        const tween = gsap.to(galleryRef.current, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          animation: tween,
          invalidateOnRefresh: true,
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="work-section"
      ref={sectionRef}
      className="h-auto md:h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden flex flex-col justify-center relative border-t border-slate-200 dark:border-slate-900 py-24 md:py-0 transition-colors duration-500"
    >
      <div className="w-full px-6 sm:px-16 md:absolute md:top-12 md:left-0 z-10 mb-12 md:mb-0">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
          Shipped <span className="text-orange-500">Products.</span>
        </h2>
      </div>

      <div
        ref={galleryRef}
        className="flex flex-col md:flex-row h-auto md:h-[75vh] w-full md:w-max items-center gap-12 md:gap-16 px-6 sm:px-16 md:pr-[15vw] md:mt-20 [perspective:2000px]"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
