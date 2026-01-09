"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    if (process.env.NEXT_PUBLIC_DEPLOY_ENV === "production") {
      // Example: Send to error tracking service
      // logErrorToService(error);
    } else {
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0F24] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[200px] opacity-20"
          style={{ background: "rgba(15,219,179,0.4)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[200px] opacity-20"
          style={{ background: "rgba(0,249,218,0.4)" }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error code */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-4"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
              500
            </span>
          </motion.h1>

          {/* Error message */}
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Something went wrong
          </motion.h2>

          <motion.p
            className="text-[#CBD5E1] mb-8 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            We encountered an unexpected error. Our team has been notified and is working on a fix.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.button
              onClick={reset}
              className="px-8 py-4 bg-[#0FDBB3] text-[#0A0F24] font-bold rounded-xl magnetic relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(15,219,179,0.4)",
                  "0 0 40px rgba(15,219,179,0.6)",
                  "0 0 20px rgba(15,219,179,0.4)",
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <span className="relative z-10">Try Again</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ filter: "blur(15px)" }}
              />
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="px-8 py-4 border-2 border-[#0FDBB3] text-[#0FDBB3] font-bold rounded-xl hover:bg-[#0FDBB3]/10 transition-colors duration-300 magnetic inline-block"
              >
                Go Home
              </Link>
            </motion.div>
          </motion.div>

          {/* Error details (only in development) */}
          {process.env.NEXT_PUBLIC_DEPLOY_ENV !== "production" && error.message && (
            <motion.div
              className="mt-8 p-4 bg-[#11172B] rounded-lg border border-[#0FDBB3]/20 text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-sm text-[#D4DFEA] font-mono break-all">
                {error.message}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

