"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Contact", path: "/contact" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Fade-in from top on initial load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-[12px]"
        style={{
          background: "rgba(10,15,36,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-white magnetic" aria-label="Corazor Technology Home">
            <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
              Corazor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path === "/" && pathname === "/");
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative text-white font-semibold text-sm magnetic group"
                  onClick={closeMenu}
                  aria-label={`Navigate to ${item.name}`}
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {item.name}
                  </motion.span>

                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5"
                    style={{
                      background: "linear-gradient(90deg, #0FDBB3, #00F9DA, #0FDBB3)",
                      backgroundSize: "200% 100%",
                      boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    }}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    animate={{
                      backgroundPosition: ["0% 0%", "200% 0%"],
                    }}
                  />

                  {/* Active underline with animated gradient */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-full"
                      style={{
                        background: "linear-gradient(90deg, #0FDBB3, #00F9DA, #0FDBB3)",
                        backgroundSize: "200% 100%",
                        boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                      }}
                      animate={{
                        backgroundPosition: ["0% 0%", "200% 0%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  )}

                  {/* Active glow behind text */}
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 blur-sm opacity-50"
                      style={{
                        textShadow: "0 0 12px #0FDBB3",
                      }}
                    />
                  )}

                  {/* Hover glow */}
                  <motion.span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      textShadow: "0 0 12px #0FDBB3",
                    }}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA Button - Desktop */}
          <motion.button
            className="hidden md:flex px-6 py-3 rounded-full border-2 border-[#0FDBB3] text-[#0FDBB3] font-semibold text-sm magnetic relative overflow-hidden group"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: [
                "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                "0 0 12px rgba(15,219,179,0.8), 0 0 28px rgba(0,249,218,0.5)",
                "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="relative z-10">Book Strategy Call</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              style={{ filter: "blur(10px)" }}
            />
          </motion.button>

          {/* Hamburger Menu - Mobile */}
          <button
            className="md:hidden flex flex-col gap-1.5 z-50 relative"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="w-6 h-0.5 bg-[#0FDBB3]"
              animate={{
                rotate: isMenuOpen ? 45 : 0,
                y: isMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#0FDBB3]"
              animate={{
                opacity: isMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#0FDBB3]"
              animate={{
                rotate: isMenuOpen ? -45 : 0,
                y: isMenuOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
              style={{
                background: "rgba(10,15,36,0.95)",
                backdropFilter: "blur(12px)",
              }}
            />

            {/* Floating Neon Blobs Behind Menu */}
            <motion.div
              className="fixed top-20 left-10 w-[400px] h-[400px] rounded-full blur-[200px] opacity-20 z-41"
              style={{ background: "rgba(15,219,179,0.4)" }}
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -30, 20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "easeInOut",
              }}
            />

            <motion.div
              className="fixed bottom-20 right-10 w-[500px] h-[500px] rounded-full blur-[220px] opacity-15 z-41"
              style={{ background: "rgba(0,249,218,0.35)" }}
              animate={{
                x: [20, -30, 10, 20],
                y: [-20, 30, -10, -20],
              }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "easeInOut",
              }}
            />

            {/* Menu Content */}
            <motion.div
              className="fixed inset-0 z-50 flex flex-col items-center justify-center md:hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path || (item.path === "/" && pathname === "/");
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={item.path}
                        className={`text-2xl font-semibold magnetic ${
                          isActive ? "text-[#0FDBB3]" : "text-white"
                        }`}
                        onClick={closeMenu}
                        style={{
                          textShadow: isActive ? "0 0 20px rgba(15,219,179,0.8)" : "none",
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: navItems.length * 0.1, duration: 0.3 }}
                >
                  <motion.button
                    className="px-8 py-4 rounded-full border-2 border-[#0FDBB3] text-[#0FDBB3] font-semibold text-lg magnetic"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      boxShadow: "0 0 25px rgba(15,219,179,0.4)",
                    }}
                  >
                    Book Strategy Call
                  </motion.button>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

