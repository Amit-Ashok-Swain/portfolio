import React, { useRef, useState } from "react";

export default function SystemBlueprint() {
  const container = useRef(null);
  const [activeNode, setActiveNode] = useState(
    "Click a node to inspect system specs",
  );

  const nodeData = {
    gateway:
      "API Gateway: Handles rate limiting, JWT authentication, and request routing across microservices.",
    backend:
      "Spring Boot Cluster: MVC architecture with JPA/HibernateORM, handling high-throughput business logic.",
    cloud:
      "AWS EC2 & S3: Scalable compute instances running Docker containers with automated GitHub Actions CI/CD pipelines.",
    database:
      "MySQL & Vector DB: Optimized relational databases storing relational records alongside high-dimensional embeddings for AI retrieval.",
  };

  return (
    <section className="py-24 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-3 transition-colors duration-500">
            System Architecture{" "}
            <span className="text-orange-600 dark:text-orange-500 transition-colors duration-500">
              Sandbox.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 transition-colors duration-500">
            Interactive Low-Level & High-Level Design (LLD/HLD) topology.
          </p>
        </div>

        <div
          ref={container}
          className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-12 relative min-h-[400px] flex flex-col items-center justify-center shadow-xl dark:shadow-2xl transition-colors duration-500"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] rounded-3xl pointer-events-none transition-colors duration-500"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10 mb-12">
            <div
              onClick={() => setActiveNode(nodeData.gateway)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-lg group"
            >
              <div className="text-orange-600 dark:text-orange-500 font-mono text-xs mb-2 transition-colors duration-500">
                01 // EDGE
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                API Gateway
              </h4>
            </div>

            <div
              onClick={() => setActiveNode(nodeData.backend)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-lg group"
            >
              <div className="text-orange-600 dark:text-orange-500 font-mono text-xs mb-2 transition-colors duration-500">
                02 // COMPUTE
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                Spring Boot
              </h4>
            </div>

            <div
              onClick={() => setActiveNode(nodeData.cloud)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-lg group"
            >
              <div className="text-orange-600 dark:text-orange-500 font-mono text-xs mb-2 transition-colors duration-500">
                03 // INFRASTRUCTURE
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                AWS EC2 / CI/CD
              </h4>
            </div>

            <div
              onClick={() => setActiveNode(nodeData.database)}
              className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 hover:border-orange-500 dark:hover:border-orange-500 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md dark:shadow-lg group"
            >
              <div className="text-orange-600 dark:text-orange-500 font-mono text-xs mb-2 transition-colors duration-500">
                04 // PERSISTENCE
              </div>
              <h4 className="text-slate-900 dark:text-white font-bold text-lg group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-500">
                MySQL & Vector
              </h4>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-2xl p-6 font-mono text-sm text-slate-700 dark:text-slate-300 flex items-center gap-4 relative z-10 shadow-inner transition-colors duration-500">
            <span className="text-orange-600 dark:text-orange-500 font-bold shrink-0 transition-colors duration-500">
              [INSPECTOR]:
            </span>
            <p className="transition-colors duration-500">{activeNode}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
