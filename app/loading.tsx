"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0A0F24] flex items-center justify-center z-50 backdrop-blur-sm">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-[#0A0F24]/80 backdrop-blur-md" />
      
      <div className="text-center relative z-10">
        <div className="relative">
          {/* Neon pulse glow effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-32 h-32 rounded-full bg-[#0FDBB3] blur-3xl" />
          </motion.div>

          {/* Logo with smooth fade-in */}
          <motion.div
            className="text-4xl md:text-5xl font-bold mb-6 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: [0.6, 1, 0.6],
              y: 0,
            }}
            transition={{
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 0.6,
                ease: "easeOut",
              },
            }}
          >
            <span className="bg-gradient-to-r from-[#0FDBB3] via-[#00F9DA] to-[#0FDBB3] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]">
              Corazor
            </span>
          </motion.div>

          {/* Loading dots with neon glow */}
          <div className="flex gap-3 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full bg-[#0FDBB3] relative"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                style={{
                  boxShadow: "0 0 10px rgba(15, 219, 179, 0.8)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

