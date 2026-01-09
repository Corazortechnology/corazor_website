"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    title: "DKT — AI-Powered CSR & ESG Platform",
    metrics: [
      "70% reduction in reconciliation time",
      "4× faster reporting & audit readiness",
      "Real-time transparency for donors, partners, beneficiaries",
    ],
    features: [
      "Built 5 portals (Donor, Partner, Vendor, School, Admin)",
      "AI Reconciliation Chatbot (Gemini/Dialogflow)",
    ],
    techStack: "React, Node.js, TypeScript, PostgreSQL, Redis, Kafka, Gemini AI",
    image: "/images/case1.jpg",
    layout: "left", // Image on left, text on right
  },
  {
    title: "SpectrAble — Therapy Intelligence Platform",
    metrics: [
      "65% faster therapy data analysis",
      "RAG-based NLP pipeline for smart insights",
      "Caregiver, Therapist & Admin app ecosystem",
    ],
    features: [
      "Progress tracking + analytics dashboards",
      "Compliance: DPDP 2023, HIPAA, GDPR",
    ],
    techStack: "Llama API + FastAPI + MongoDB + Qdrant",
    image: "/images/case2.jpg",
    layout: "right", // Image on right, text on left
  },
  {
    title: "Execute Partners — Digital Program Management Platform",
    metrics: [
      "60% faster execution cycles",
      "Single-pane visibility across 30+ programs",
      "Automated workflows, approvals, resource allocation",
    ],
    features: [],
    techStack: "React.js, Node.js, PostgreSQL, Power BI Embedded",
    image: "/images/case3.jpg",
    layout: "left", // Image on left, text on right
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const caseRowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // GSAP ScrollTrigger animations for each case study
    caseRowsRef.current.forEach((row, index) => {
      if (!row) return;

      const image = row.querySelector(".case-image");
      const content = row.querySelector(".case-content");

      // Determine slide direction based on index
      const isEven = index % 2 === 0;
      const startX = isEven ? -200 : 200;

      // Main row animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "top 20%",
          scrub: 1,
        },
      });

      // Fade in and slide
      tl.fromTo(
        row,
        {
          opacity: 0,
          x: startX,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Parallax effect for image
      gsap.to(image, {
        y: -20,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Content fade in
      gsap.fromTo(
        content,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && caseRowsRef.current.includes(trigger.vars.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding px-4 sm:px-6 lg:px-12 bg-[#0A0F24] text-white overflow-hidden"
    >
      {/* Animated Neon Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-[700px] h-[700px] md:w-[900px] md:h-[900px] rounded-full blur-[200px] opacity-20 z-0"
        style={{ background: "rgba(15,219,179,0.4)" }}
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] rounded-full blur-[220px] opacity-15 z-0"
        style={{ background: "rgba(0,249,218,0.35)" }}
        animate={{
          x: [30, -50, 20, 30],
          y: [-40, 30, -20, -40],
        }}
        transition={{
          repeat: Infinity,
          duration: 35,
          ease: "easeInOut",
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 lg:mb-20 text-center tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Case Studies That Define{" "}
          <span className="neon-gradient-text">
            Innovation
          </span>
        </motion.h2>

        {/* Case Studies */}
        <div className="space-y-32 sm:space-y-40">
          {caseStudies.map((caseStudy, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) caseRowsRef.current[index] = el;
              }}
              className={`case-row flex flex-col ${
                caseStudy.layout === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 lg:gap-12`}
            >
              {/* Image */}
              <motion.div
                className="case-image w-full lg:w-1/2 relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#11172B] to-[#0A0F24] border border-[#0FDBB3]/20 shadow-[0_0_0_rgba(15,219,179,0)] group-hover:shadow-[0_0_8px_rgba(15,219,179,0.7),0_0_22px_rgba(0,249,218,0.4)] transition-all duration-300">
                  {/* Placeholder gradient if image doesn't exist */}
                  <div className="aspect-video bg-gradient-to-br from-[#0FDBB3]/20 via-[#11172B] to-[#00F9DA]/20 flex items-center justify-center">
                    <img
                      src={caseStudy.image}
                      alt={`${caseStudy.title} - Case study screenshot showing the platform interface`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0FDBB3]/10 via-transparent to-[#00F9DA]/10" />
                  </div>
                  {/* Hover glow overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(15,219,179,0.1), transparent)",
                    }}
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="case-content w-full lg:w-1/2 flex flex-col justify-center">
                <motion.h3
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[#0FDBB3] tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {caseStudy.title}
                </motion.h3>

                {/* Neon Divider */}
                <motion.div
                  className="h-1 w-24 mb-6 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #0FDBB3, #00F9DA, #0FDBB3)",
                    backgroundSize: "200% 100%",
                    boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  whileInView={{ width: 96, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    width: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 0%"],
                  }}
                />

                {/* Metrics */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ul className="space-y-3">
                    {caseStudy.metrics.map((metric, metricIndex) => (
                      <motion.li
                        key={metricIndex}
                        className="text-[#D4DFEA] text-base sm:text-lg flex items-start gap-3 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 + metricIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-[#0FDBB3] mt-1.5 font-bold">✓</span>
                        <span>{metric}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Features */}
                {caseStudy.features.length > 0 && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h4 className="text-white font-semibold mb-3 text-lg">Key Features:</h4>
                    <ul className="space-y-2">
                      {caseStudy.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="text-[#D4DFEA] text-sm sm:text-base flex items-start gap-2 leading-relaxed"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.6 + featureIndex * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className="text-[#0FDBB3] mt-1">▹</span>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tech Stack */}
                <motion.div
                  className="mt-4 p-4 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-sm text-[#D4DFEA] mb-2">Tech Stack:</p>
                  <p className="text-[#0FDBB3] font-medium">{caseStudy.techStack}</p>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
