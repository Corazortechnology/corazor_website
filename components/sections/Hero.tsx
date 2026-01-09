"use client";

import { useEffect, useMemo, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import dynamic from "next/dynamic";

// Dynamically import Lottie for client-side only
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// Particle System Component
function ParticleSystem() {
  const ref = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const particles = useMemo(() => {
    // Further reduce on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 1500 : 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const neonColor = new THREE.Color("#0FDBB3");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Create a more distributed particle field
      const radius = Math.random() * 60 + 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Neon color variation
      const colorVariation = 0.4 + Math.random() * 0.6;
      colors[i3] = neonColor.r * colorVariation;
      colors[i3 + 1] = neonColor.g * colorVariation;
      colors[i3 + 2] = neonColor.b * colorVariation;

      sizes[i] = Math.random() * 0.3 + 0.1;
    }

    return { positions, colors, sizes };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      // Reduced rotation for better performance
      ref.current.rotation.x = Math.sin(time * 0.08) * 0.08;
      ref.current.rotation.y = Math.cos(time * 0.12) * 0.08;

      // Mouse-driven parallax (reduced intensity)
      ref.current.rotation.x += mouse.y * 0.02;
      ref.current.rotation.y += mouse.x * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} sizes={particles.sizes} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0FDBB3"
        size={0.12}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.6}
      />
    </Points>
  );
}

// Scroll Indicator Component
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
    >
      <span className="text-xs text-[#0FDBB3]/60 font-light tracking-wider uppercase">Scroll</span>
      <motion.div
        className="w-6 h-10 border-2 border-[#0FDBB3]/40 rounded-full flex justify-center p-2"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="w-1.5 h-3 bg-[#0FDBB3] rounded-full"
          animate={{
            y: [0, 12, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <motion.div
        className="absolute -bottom-2 w-1 h-1 bg-[#0FDBB3] rounded-full"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}

// Magnetic Button Component
function MagneticButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  [key: string]: any;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = 120;

    if (distance < maxDistance) {
      const moveX = (distanceX / maxDistance) * 15;
      const moveY = (distanceY / maxDistance) * 15;
      ref.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
    }
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0) scale(1)";
    }
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseClasses =
    variant === "primary"
      ? "px-10 py-4 text-[#0A0F24] font-bold bg-[#0FDBB3] rounded-xl shadow-[0_0_8px_rgba(15,219,179,0.7),0_0_22px_rgba(0,249,218,0.4)] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden group"
      : "px-10 py-4 text-white font-bold bg-transparent border-2 border-[#0FDBB3] rounded-xl hover:bg-[#0FDBB3]/10 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden group";

  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${className} magnetic`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            filter: "blur(20px)",
          }}
        />
      )}
      {isHovered && variant === "secondary" && (
        <motion.div
          className="absolute inset-0 border-2 border-[#0FDBB3] rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{
            boxShadow: `0 0 20px #0FDBB3`,
          }}
        />
      )}
    </motion.button>
  );
}

export default function Hero() {
  const [animationData, setAnimationData] = useState<any>(null);

  // Load Lottie animation
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const response = await fetch("/animations/tech.json");
        if (response.ok) {
          const data = await response.json();
          setAnimationData(data);
        }
      } catch (e) {
        // Animation file doesn't exist, skip silently
      }
    };
    loadAnimation();
  }, []);

  // Split headline for animation
  const headlineWords = "Where Innovation Meets Execution".split(" ");

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0A0F24] text-white">
      {/* 3D PARTICLE SYSTEM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          gl={{ 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false
          }}
          dpr={[1, 1.5]}
          performance={{ min: 0.5 }}
        >
          <Suspense fallback={null}>
            <ParticleSystem />
            <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0A0F24]/90 via-[#0A0F24]/70 to-[#0A0F24]/90" />

      {/* FLOATING NEON BLOBS */}
      <motion.div
        className="absolute top-20 left-10 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[200px] opacity-30 z-5"
        style={{ background: "rgba(15,219,179,0.4)" }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full blur-[220px] opacity-25 z-5"
        style={{ background: "rgba(0,249,218,0.35)" }}
        animate={{
          x: [20, -40, 10, 20],
          y: [-30, 20, -10, -30],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut",
        }}
      />

      {/* Mobile blob adjustments */}
      <motion.div
        className="absolute top-40 right-20 w-[400px] h-[400px] md:hidden rounded-full blur-[150px] opacity-20 z-5"
        style={{ background: "rgba(15,219,179,0.3)" }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      {/* CENTER CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* HEADLINE ANIMATION */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-3 sm:mr-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3 + i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {i === 2 || i === 3 ? (
                <span
                  className="neon-gradient-text"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(15,219,179,0.7)) drop-shadow(0 0 22px rgba(0,249,218,0.4))",
                  }}
                >
                  {word}
                </span>
              ) : (
                <span className="text-white">{word}</span>
              )}
            </motion.span>
          ))}
        </motion.h1>

        {/* SUBHEAD DESCRIPTION */}
        <motion.p
          className="mt-6 sm:mt-8 max-w-3xl text-base sm:text-lg md:text-xl text-[#D4DFEA] font-light leading-relaxed px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          We build intelligent, scalable digital ecosystems that accelerate business outcomes. 
          Smart engineering. Efficient execution. Outcome-driven results.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <MagneticButton variant="primary">Book Strategy Call</MagneticButton>
          <MagneticButton variant="secondary">Explore Our Work</MagneticButton>
        </motion.div>
      </div>

      {/* LOTTIE MOTION GRAPHIC */}
      {animationData && typeof window !== "undefined" && (
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-32 sm:w-40 md:w-48 opacity-60 z-15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Lottie animationData={animationData} loop={true} />
        </motion.div>
      )}

      {/* SCROLL INDICATOR */}
      <ScrollIndicator />
    </section>
  );
}
