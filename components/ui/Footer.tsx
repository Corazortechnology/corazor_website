"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Case Studies", path: "/case-studies" },
  { name: "Contact", path: "/contact" },
];

const servicesLinks = [
  { name: "AI & Machine Learning", path: "/services#ai" },
  { name: "App Development", path: "/services#app" },
  { name: "Web Development", path: "/services#web" },
  { name: "Blockchain Development", path: "/services#blockchain" },
];

const socialLinks = [
  { name: "LinkedIn", icon: "💼", url: "#" },
  { name: "Instagram", icon: "📷", url: "#" },
  { name: "GitHub", icon: "💻", url: "#" },
  { name: "Email", icon: "✉️", url: "mailto:contact@corazor.com" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Subtle glow pulse for footer background
    if (footerRef.current) {
      gsap.to(footerRef.current, {
        background: "linear-gradient(180deg, rgba(10,15,36,0.95) 0%, rgba(10,15,36,1) 100%)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-4 sm:px-6 lg:px-10 bg-[#0A0F24] text-white border-t border-[#0FDBB3]/10"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0FDBB3]/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-14 mb-12">
          {/* SECTION 1: Brand Block */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3
              className="text-3xl font-bold mb-3 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="neon-gradient-text">
                Corazor Technology
              </span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5"
                style={{
                  background: "linear-gradient(90deg, #0FDBB3, #00F9DA, #0FDBB3)",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  scaleX: { duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </motion.h3>

            <motion.p
              className="text-[#0FDBB3] font-semibold mb-4 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                textShadow: "0 0 10px rgba(15,219,179,0.4)",
              }}
            >
              Where Innovation Meets Execution.
            </motion.p>

            <motion.p
              className="text-[#D4DFEA] text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              We help startups and enterprises build intelligent, scalable, future-ready digital
              ecosystems powered by AI, Web, App & Blockchain.
            </motion.p>
          </motion.div>

          {/* SECTION 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6 text-[#0FDBB3]">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className="text-[#D4DFEA] hover:text-[#0FDBB3] transition-colors duration-200 relative group magnetic inline-block"
                    aria-label={`Navigate to ${link.name}`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5"
                      style={{
                        background: "linear-gradient(90deg, #0FDBB3, #00F9DA, #0FDBB3)",
                        backgroundSize: "200% 100%",
                        boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                      }}
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      animate={{
                        backgroundPosition: ["0% 0%", "200% 0%"],
                      }}
                      transition={{
                        width: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                        backgroundPosition: {
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                    <motion.span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        textShadow: "0 0 12px #0FDBB3",
                      }}
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SECTION 3: Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6 text-[#0FDBB3]">Services</h4>
            <ul className="space-y-3">
              {servicesLinks.map((service, index) => (
                <motion.li
                  key={service.path}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href={service.path}
                    className="text-[#D4DFEA] hover:text-[#0FDBB3] transition-all duration-200 relative group inline-block"
                    aria-label={`View ${service.name} services`}
                  >
                    <motion.span
                      className="relative z-10"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.name}
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        boxShadow: "0 0 18px rgba(15,219,179,0.3)",
                        background: "rgba(15,219,179,0.05)",
                      }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* SECTION 4: Social Icons Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6 text-[#0FDBB3]">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                  <motion.a
                  key={social.name}
                  href={social.url}
                  target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={social.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="w-12 h-12 rounded-full bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] flex items-center justify-center text-2xl magnetic group relative overflow-hidden transition-all duration-200"
                  aria-label={`Visit our ${social.name} profile`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                  }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    opacity: { duration: 0.5, delay: 0.4 + index * 0.1 },
                    scale: { duration: 0.5, delay: 0.4 + index * 0.1 },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    },
                  }}
                >
                  <span className="relative z-10">{social.icon}</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ filter: "blur(8px)" }}
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* SECTION 5: Copyright & Legal Strip */}
        <motion.div
          className="pt-8 border-t border-[#0FDBB3]/10 flex flex-col sm:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-[#D4DFEA] text-sm">
            © 2025 Corazor Technology. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-[#D4DFEA] hover:text-[#0FDBB3] text-sm transition-colors duration-200 relative group"
              aria-label="View Privacy Policy"
            >
              Privacy Policy
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-[#0FDBB3] w-0 group-hover:w-full transition-all duration-300"
              />
            </Link>
            <Link
              href="/terms"
              className="text-[#D4DFEA] hover:text-[#0FDBB3] text-sm transition-colors duration-200 relative group"
              aria-label="View Terms and Conditions"
            >
              Terms & Conditions
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-[#0FDBB3] w-0 group-hover:w-full transition-all duration-300"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

