import React, { useEffect, useRef } from "react";

export default function NeuralCursor({ isLightMode }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let points = [];
    let mouse = { x: -100, y: -100 };

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", updateSize);
    updateSize();

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      points.push({ x: mouse.x, y: mouse.y, age: 0 });
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = isLightMode
        ? "rgba(249, 115, 22, 0.8)"
        : "rgba(249, 115, 22, 0.4)";
      ctx.lineWidth = isLightMode ? 2 : 1.5;

      ctx.beginPath();
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;
        if (p.age > 25) {
          points.splice(i, 1);
          i--;
          continue;
        }
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9998] pointer-events-none mix-blend-multiply dark:mix-blend-screen transition-opacity duration-500"
    />
  );
}
