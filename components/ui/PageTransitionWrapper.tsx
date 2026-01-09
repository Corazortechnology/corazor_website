"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface PageTransitionWrapperProps {
  children: ReactNode;
}

export default function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  const pathname = usePathname();

  // Fallback if pathname is not available
  if (!pathname) {
    return <div>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          initial: {
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
          },
          animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 0.55,
              ease: "easeInOut",
            },
          },
          exit: {
            opacity: 0,
            x: -30,
            scale: 0.97,
            transition: {
              duration: 0.55,
              ease: "easeInOut",
            },
          },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

