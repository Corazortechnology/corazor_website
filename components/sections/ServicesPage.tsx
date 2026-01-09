"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const aiServices = [
  "Custom ML Models",
  "LLM Integrations (Gemini, GPT, LLaMA)",
  "NLP + RAG Pipelines",
  "AI Automation Workflows",
  "Computer Vision Systems",
  "Intelligent Chatbots",
  "Recommendation Engines",
];

const appServices = [
  "Custom Native Apps",
  "UI/UX Design Systems",
  "API Integrations",
  "Scalable App Architecture",
  "Real-time features (chat, maps, streaming)",
  "Deployment & Monitoring",
];

const webServices = [
  "Enterprise Dashboards",
  "Multi-role Admin Panels",
  "Custom Web Applications",
  "Performance Optimization",
  "Secure Authentication Systems",
  "Platform Maintenance",
];

const blockchainServices = [
  "Smart Contract Development",
  "DApp Architecture",
  "Tokenomics & Contract Logic",
  "Blockchain Integrations",
  "Ledger-based Automation",
  "Wallet Integrations",
];

const processSteps = [
  "Discovery & Requirements",
  "Architecture & Planning",
  "UI/UX + Wireframes",
  "Development & Iterations",
  "QA, Testing & Validation",
  "Launch & Optimization",
];

const whyChoosePillars = [
  {
    title: "Speed With Precision",
    description: "50–60% faster execution cycles.",
    icon: "⚡",
  },
  {
    title: "Deep Tech Expertise",
    description: "AI, ML, Web, App, Blockchain under one roof.",
    icon: "🧠",
  },
  {
    title: "Design + Engineering",
    description: "Harmony of UX and technical excellence.",
    icon: "🎨",
  },
  {
    title: "Outcome-Driven Execution",
    description: "Engineering that directly impacts business results.",
    icon: "🎯",
  },
];

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    // Animate sections on scroll
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative z-10">
        {/* SECTION 1: Services Intro Hero */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white overflow-hidden"
        >
          <motion.div
            className="relative z-10 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                transform: "perspective(1000px) rotateX(5deg)",
              }}
            >
              Engineering Intelligence{" "}
              <span className="relative inline-block">
                Into Every Digital Product.
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  style={{
                    boxShadow: "0 0 20px rgba(15,219,179,0.8)",
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[#D4DFEA] max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              At Corazor Technology, we build scalable AI-powered digital ecosystems—web, app,
              blockchain, ML—designed to accelerate your business outcomes.
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 2: AI & Machine Learning */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
                AI & Machine Learning Development
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-[#D4DFEA] mb-12 max-w-4xl mx-auto text-center leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We engineer intelligent systems using custom ML models, NLP-powered workflows, RAG
              pipelines, computer vision and domain-trained solutions. Our AI implementations reduce
              execution cycles, increase accuracy, and automate decision-making.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiServices.map((service, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  glareEnable
                  glareColor="#0FDBB3"
                  className="h-full"
                >
                  <motion.div
                    className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 h-full group relative overflow-hidden"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      boxShadow: "0 0 35px rgba(15,219,179,0.3)",
                    }}
                  >
                    <div className="relative z-10">
                      <div className="text-2xl mb-3">🤖</div>
                      <h3 className="text-xl font-bold text-[#0FDBB3] mb-2">{service}</h3>
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at center, rgba(15,219,179,0.1), transparent)",
                        boxShadow: "0 0 40px rgba(15,219,179,0.2)",
                      }}
                    />
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: App Development */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[2] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
                End-to-End App Development
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-[#D4DFEA] mb-12 max-w-4xl mx-auto text-center leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We build high-performance Android & iOS apps with scalable architectures, optimal UX,
              and robust backend integrations. Designed for reliability, speed, and global users.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {appServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 h-full group"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 0 35px rgba(15,219,179,0.3)",
                  }}
                >
                  <div className="text-2xl mb-3">📱</div>
                  <h3 className="text-xl font-bold text-[#0FDBB3] mb-2">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Web Development */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[3] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
                Custom Web Platform Development
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-[#D4DFEA] mb-12 max-w-4xl mx-auto text-center leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We build enterprise-grade platforms, dashboards, and web systems that power daily
              operations for startups and enterprises across industries.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {webServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 h-full group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    transform: "translateZ(0)",
                  }}
                >
                  <div className="text-2xl mb-3">🌐</div>
                  <h3 className="text-xl font-bold text-[#0FDBB3] mb-2">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Blockchain Development */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[4] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] bg-clip-text text-transparent">
                Blockchain & Smart Contract Development
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-[#D4DFEA] mb-12 max-w-4xl mx-auto text-center leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We help companies leverage decentralized systems with secure smart contracts, scalable
              dApps, and blockchain-enabled automation.
            </motion.p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blockchainServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 h-full group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    boxShadow: "0 0 35px rgba(15,219,179,0.3)",
                  }}
                >
                  <div className="text-2xl mb-3">⛓️</div>
                  <h3 className="text-xl font-bold text-[#0FDBB3] mb-2">{service}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Execution Process */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[5] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              How We Build Your Product
            </motion.h2>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0FDBB3] to-[#00F9DA] transform -translate-x-1/2" />

              <div className="space-y-16">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative flex flex-col md:flex-row items-center gap-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className={`flex-1 max-w-md ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8 md:order-2"}`}>
                      <div className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-full bg-[#0FDBB3] flex items-center justify-center text-xl font-bold text-[#0A0F24] relative z-10 flex-shrink-0"
                            style={{
                              boxShadow: "0 0 20px rgba(15,219,179,0.6)",
                            }}
                          >
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-[#0FDBB3]">{step}</h3>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div className="hidden md:block absolute left-1/2 w-4 h-4 rounded-full bg-[#0FDBB3] border-4 border-[#0A0F24] transform -translate-x-1/2 z-10" />

                    <div className={`flex-1 ${index % 2 === 0 ? "md:order-2" : ""}`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Why Choose Corazor */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[6] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Why Choose Corazor
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChoosePillars.map((pillar, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  glareEnable
                  glareColor="#0FDBB3"
                  className="h-full"
                >
                  <motion.div
                    className="p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 h-full group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 0 35px rgba(15,219,179,0.3)",
                    }}
                  >
                    <div className="text-4xl mb-4">{pillar.icon}</div>
                    <h3 className="text-2xl font-bold text-[#0FDBB3] mb-3">{pillar.title}</h3>
                    <p className="text-[#D4DFEA] leading-relaxed">{pillar.description}</p>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: CTA Section */}
        <section
          ref={(el) => {
            if (el) sectionsRef.current[7] = el;
          }}
          className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Build Your Product?
            </motion.h2>

            <motion.button
              className="px-12 py-6 rounded-full border-2 border-[#0FDBB3] text-[#0FDBB3] font-bold text-lg magnetic relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(15,219,179,0.4)",
                  "0 0 35px rgba(15,219,179,0.7)",
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
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ filter: "blur(15px)" }}
              />
            </motion.button>
          </div>
        </section>
      </div>
  );
}

