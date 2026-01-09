"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Footer from "@/components/ui/Footer";

gsap.registerPlugin(ScrollTrigger);

const miniCaseStudies = [
  {
    title: "DKT — AI-Powered CSR Platform",
    summary: "70% faster reconciliation • 4× faster audit readiness • 5 role-based portals",
    link: "/case-studies#dkt",
  },
  {
    title: "SpectrAble — Therapy Intelligence",
    summary: "65% faster analysis • RAG + LLM insights • Multi-app ecosystem",
    link: "/case-studies#spectrable",
  },
  {
    title: "Execute Partners — Program Management",
    summary: "60% faster execution • 30+ programs • Automated workflows",
    link: "/case-studies#execute",
  },
];

const processSteps = [
  "Discovery & Requirements",
  "Architecture & Planning",
  "UI/UX & Wireframes",
  "Development Cycles",
  "QA & Testing",
  "Launch & Monitoring",
];

const stats = [
  { label: "AI-driven products delivered", value: 35, suffix: "+" },
  { label: "Platforms launched", value: 20, suffix: "+" },
  { label: "Proprietary AI models integrated", value: 10, suffix: "+" },
  { label: "Countries served", value: 4, suffix: "+" },
];

export default function HomePage() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero fade-in wrapper
    if (heroWrapperRef.current) {
      gsap.fromTo(
        heroWrapperRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    }

    // Case studies animation
    if (caseStudiesRef.current) {
      const cards = caseStudiesRef.current.querySelectorAll(".case-card");
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: caseStudiesRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    // Process timeline line draw
    if (processRef.current) {
      const timelineLine = processRef.current.querySelector(".timeline-line");
      if (timelineLine) {
        gsap.fromTo(
          timelineLine,
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }

    // Stats count-up
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const target = parseFloat(stat.getAttribute("data-target") || "0");
      const suffix = stat.getAttribute("data-suffix") || "";

      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
          gsap.to(stat, {
            innerHTML: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              const value = this.targets()[0].innerHTML;
              stat.innerHTML = suffix === "+" 
                ? Math.ceil(value) + suffix
                : Math.ceil(value) + suffix;
            },
          });
        },
      });
    });

    // CTA slide-up
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return (
    <div className="relative">
      {/* SECTION 1: Hero with fade-in wrapper */}
      <div ref={heroWrapperRef} className="relative">
        {/* Neon glow layer behind hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0FDBB3]/10 via-transparent to-transparent pointer-events-none z-0" />
        <Hero />
      </div>

      {/* Content sections */}
      <div className="relative z-10">
          {/* Section Divider */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-[#0FDBB3] to-transparent opacity-30" />

          {/* SECTION 3: Services Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ServicesGrid />
          </motion.div>

          {/* Section Divider */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-[#0FDBB3] to-transparent opacity-30" />

          {/* SECTION 4: Mini Case Studies Highlight */}
          <section
            ref={caseStudiesRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                Case Studies That{" "}
                <span className="neon-gradient-text">
                  Drive Impact
                </span>
              </motion.h2>

              <div className="grid md:grid-cols-3 gap-8">
                {miniCaseStudies.map((study, index) => (
                  <motion.div
                    key={index}
                    className="case-card p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group cursor-pointer"
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-2xl font-bold mb-4 text-[#0FDBB3]">{study.title}</h3>
                    <p className="text-[#D4DFEA] mb-6 leading-relaxed">{study.summary}</p>
                    <Link
                      href={study.link}
                      className="text-[#0FDBB3] font-semibold hover:text-[#00F9DA] transition-colors duration-200 inline-flex items-center gap-2 group/link"
                      aria-label={`Read full case study: ${study.title}`}
                    >
                      Read full case study
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: Execution Process */}
          <section
            ref={processRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                How We Bring Ideas to Life
              </motion.h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0FDBB3] to-[#00F9DA] transform -translate-x-1/2 timeline-line origin-top" />

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
                        <motion.div
                          className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
                          whileHover={{
                            y: -4,
                            scale: 1.02,
                            boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="w-12 h-12 rounded-full bg-[#0FDBB3] flex items-center justify-center text-xl font-bold text-[#0A0F24] flex-shrink-0"
                              style={{
                                boxShadow: "0 0 20px rgba(15,219,179,0.6)",
                              }}
                            >
                              {index + 1}
                            </div>
                            <h3 className="text-xl font-bold text-[#0FDBB3]">{step}</h3>
                          </div>
                        </motion.div>
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

          {/* SECTION 6: Stats & Achievements */}
          <section
            ref={statsRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
          >
            <div className="max-w-7xl mx-auto">
              <motion.h2
                className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Our Impact in Numbers
              </motion.h2>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                      boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(15,219,179,0)",
                        "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                        "0 0 0 rgba(15,219,179,0)",
                      ],
                    }}
                    transition={{
                      opacity: { duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] },
                      boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5,
                      },
                    }}
                  >
                    <div
                      className="stat-number text-5xl font-bold text-[#0FDBB3] mb-4"
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </div>
                    <div className="text-[#D4DFEA] text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: CTA Section */}
          <section
            ref={ctaRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
          >
            <div className="max-w-5xl mx-auto text-center">
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Ready to Build Something{" "}
                <span className="neon-gradient-text">
                  Intelligent?
                </span>
              </motion.h2>

              <motion.button
                className="px-12 py-6 rounded-xl border-2 border-[#0FDBB3] text-[#0FDBB3] font-bold text-lg magnetic relative overflow-hidden group"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Book a strategy call with Corazor Technology"
                animate={{
                  boxShadow: [
                    "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    "0 0 12px rgba(15,219,179,0.8), 0 0 28px rgba(0,249,218,0.5)",
                    "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <span className="relative z-10">Book Strategy Call</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ filter: "blur(15px)" }}
                />
              </motion.button>
          </div>
        </section>
      </div>

      {/* SECTION 8: Footer */}
      <Footer />
    </div>
  );
}

