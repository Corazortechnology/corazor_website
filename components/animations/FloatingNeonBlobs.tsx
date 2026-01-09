"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface FloatingNeonBlobsProps {
  children: React.ReactNode;
}

export default function FloatingNeonBlobs({ children }: FloatingNeonBlobsProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scrollYValue = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothScrollY = useSpring(scrollYValue, springConfig);

  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = (e.clientX / window.innerWidth - 0.5) * 5;
      lastY = (e.clientY / window.innerHeight - 0.5) * 5;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          mouseX.set(lastX);
          mouseY.set(lastY);
          rafId = 0;
        });
      }
    };

    let scrollRafId: number;
    const handleScroll = () => {
      if (!scrollRafId) {
        scrollRafId = requestAnimationFrame(() => {
          const y = window.scrollY * 0.1;
          scrollYValue.set(y);
          scrollRafId = 0;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, scrollYValue]);

  // Transform parallax values for each blob - simplified to avoid TypeScript issues
  const blob1X = useTransform(smoothMouseX, (x) => x);
  const blob1Y = useTransform(smoothScrollY, (scroll) => scroll);

  const blob2X = useTransform(smoothMouseX, (x) => x * 0.8);
  const blob2Y = useTransform(smoothScrollY, (scroll) => scroll * 1.1);

  const blob3X = useTransform(smoothMouseX, (x) => x * 1.2);
  const blob3Y = useTransform(smoothScrollY, (scroll) => scroll * 0.9);

  const blob4X = useTransform(smoothMouseX, (x) => x * 0.7);
  const blob4Y = useTransform(smoothScrollY, (scroll) => scroll * 1.2);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Deep Layer Blobs - Background Atmospheric */}
      <motion.div
        className="absolute top-20 left-10 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-[50%] blur-[240px] opacity-[0.12] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,219,179,0.4) 0%, rgba(0,249,218,0.2) 50%, transparent 100%)",
          x: blob1X,
          y: blob1Y,
        }}
        animate={{
          x: [-50, 80, -30, 0],
          y: [20, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] rounded-[50%] blur-[220px] opacity-[0.15] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,249,218,0.35) 0%, rgba(15,219,179,0.25) 50%, transparent 100%)",
          x: blob2X,
          y: blob2Y,
        }}
        animate={{
          x: [30, -60, 40, 30],
          y: [-30, 50, -20, -30],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 28,
          ease: "easeInOut",
        }}
      />

      {/* Foreground Layer Blobs - Brighter, More Visible */}
      <motion.div
        className="absolute top-40 right-20 w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-[50%] blur-[200px] opacity-[0.18] z-1 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(15,219,179,0.5) 0%, rgba(15,219,179,0.2) 40%, transparent 80%)",
          x: blob3X,
          y: blob3Y,
        }}
        animate={{
          x: [0, 60, -40, 0],
          y: [-20, 30, -10, -20],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-40 left-20 w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-[50%] blur-[180px] opacity-[0.16] z-1 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,249,218,0.45) 0%, rgba(0,249,218,0.15) 40%, transparent 80%)",
          x: blob4X,
          y: blob4Y,
        }}
        animate={{
          x: [-40, 50, -20, -40],
          y: [30, -50, 40, 30],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
