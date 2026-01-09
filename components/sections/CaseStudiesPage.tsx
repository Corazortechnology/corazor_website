"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";


gsap.registerPlugin(ScrollTrigger);

// 3D Phone Model Component
function PhoneModel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 0.1]} />
      <meshStandardMaterial
        color="#0FDBB3"
        emissive="#0FDBB3"
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// 3D Dashboard Panel Component
function DashboardPanel() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[3, 2, 0.1]} />
      <meshStandardMaterial
        color="#11172B"
        emissive="#0FDBB3"
        emissiveIntensity={0.2}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

const caseStudies = [
  {
    title: "DKT — Intelligent CSR & ESG Platform",
    image: "/images/dkt.png",
    metrics: [
      "70% faster reconciliation",
      "4× faster audit readiness",
      "5 role-based portals: Donor, Partner, Vendor, School, Admin",
      "AI chatbot for reconciliation (Gemini/Dialogflow)",
      "Automated fund + program tracking",
      "Real-time dashboards for transparency",
    ],
    layout: "left",
  },
  {
    title: "SpectrAble — Therapy Intelligence Platform",
    image: "/images/spectrable.png",
    metrics: [
      "65% faster therapy analysis",
      "RAG + LLM powered insights",
      "Caregiver, Therapist & Admin app ecosystem",
      "Real-time tracking, behavior analytics, reports",
      "Tech: LLaMA API, FastAPI, Qdrant, MongoDB",
    ],
    layout: "right",
  },
  {
    title: "Execute Partners — Digital Program Execution Platform",
    image: "/images/execute.png",
    metrics: [
      "60% faster execution cycles",
      "30+ programs managed",
      "Automated workflows, reviews, approvals",
      "Unified analytics dashboard",
      "Tech: React, Node, PostgreSQL, Power BI Embedded",
    ],
    layout: "left",
  },
];

const impactMetrics = [
  { label: "Faster execution cycles", value: 60, suffix: "%" },
  { label: "Faster audit readiness", value: 4, suffix: "×" },
  { label: "Reduction in manual workload", value: 70, suffix: "%" },
  { label: "Efficiency boost from AI", value: 65, suffix: "%" },
  { label: "AI-powered ecosystems delivered", value: 35, suffix: "+" },
];

export default function CaseStudiesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Hero parallax
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }

    // Section animations
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.fromTo(
          section,
          {
            opacity: 0,
            x: direction,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      }
    });

    // Horizontal parallax slider
    if (sliderRef.current) {
      const slider = sliderRef.current;
      const panels = slider.querySelectorAll(".slider-panel");

      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider,
          start: "top top",
          end: () => `+=${slider.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
        },
      });
    }

    // Metrics count-up
    const metricNumbers = document.querySelectorAll(".metric-number");
    metricNumbers.forEach((metric) => {
      const target = parseFloat(metric.getAttribute("data-target") || "0");
      const suffix = metric.getAttribute("data-suffix") || "";

      ScrollTrigger.create({
        trigger: metric,
        start: "top 85%",
        onEnter: () => {
          gsap.to(metric, {
            innerHTML: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              const value = this.targets()[0].innerHTML;
              metric.innerHTML = suffix === "×" 
                ? Math.ceil(value) + suffix
                : suffix === "+"
                ? Math.ceil(value) + suffix
                : Math.ceil(value) + suffix;
            },
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative z-10">
        {/* SECTION 1: Cinematic Hero */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white overflow-hidden"
        >
          {/* Particle Background */}
          <div className="absolute inset-0 z-0 opacity-20">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#0FDBB3" intensity={0.5} />
                <mesh>
                  <sphereGeometry args={[0.5, 32, 32]} />
                  <meshStandardMaterial color="#0FDBB3" emissive="#0FDBB3" emissiveIntensity={0.5} />
                </mesh>
              </Suspense>
            </Canvas>
          </div>

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
            >
              Case Studies That Define{" "}
              <span className="relative inline-block">
                Innovation
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
              Our execution-first engineering has powered intelligent digital ecosystems across
              sectors — AI, healthcare, CSR, education, governance, automation, and more.
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 2-4: Featured Case Studies */}
        {caseStudies.map((study, index) => (
          <section
            key={index}
            ref={(el) => {
              if (el) sectionsRef.current[index] = el;
            }}
            className={`py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white ${
              index % 2 === 0 ? "" : "bg-[#0A0F24]/95"
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  study.layout === "right" ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  className={`relative ${study.layout === "right" ? "md:col-start-2" : ""}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#11172B] to-[#0A0F24] border border-[#0FDBB3]/20 group">
                    <div className="aspect-video bg-gradient-to-br from-[#0FDBB3]/10 via-[#11172B] to-[#00F9DA]/10 flex items-center justify-center">
                      <img
                        src={study.image}
                        alt={study.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#0FDBB3]/5 via-transparent to-[#00F9DA]/5" />
                    </div>
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at center, rgba(15,219,179,0.1), transparent)",
                        boxShadow: "0 0 40px rgba(15,219,179,0.3)",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  className={`${study.layout === "right" ? "md:col-start-1 md:row-start-1" : ""}`}
                  initial={{ opacity: 0, x: study.layout === "right" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#0FDBB3]">
                    {study.title}
                  </h2>
                  <ul className="space-y-4">
                    {study.metrics.map((metric, metricIndex) => (
                      <motion.li
                        key={metricIndex}
                        className="text-[#D4DFEA] text-lg flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: metricIndex * 0.1 }}
                      >
                        <span className="text-[#0FDBB3] mt-1.5 font-bold">✓</span>
                        <span>{metric}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* SECTION 5: Before → After Metrics */}
        <section
          ref={metricsRef}
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
              The Impact We Create
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 0 35px rgba(15,219,179,0.3)",
                  }}
                >
                  <div
                    className="metric-number text-5xl font-bold text-[#0FDBB3] mb-4"
                    data-target={metric.value}
                    data-suffix={metric.suffix}
                  >
                    0{metric.suffix}
                  </div>
                  <div className="text-[#D4DFEA] text-sm">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: Horizontal Parallax Slider */}
        <section className="py-32 bg-[#0A0F24] text-white overflow-hidden">
          <div ref={sliderRef} className="flex w-[300%]">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="slider-panel w-1/3 flex-shrink-0 px-8 flex items-center justify-center"
              >
                <div className="max-w-4xl text-center">
                  <h3 className="text-4xl font-bold mb-6 text-[#0FDBB3]">{study.title}</h3>
                  <p className="text-[#D4DFEA] text-lg leading-relaxed">
                    {study.metrics.slice(0, 3).join(" • ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: AI 3D Mockups */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Designed For Real-World Impact
                </h2>
                <p className="text-lg text-[#D4DFEA] leading-relaxed">
                  Every product we build is engineered with precision, scalability, and intelligence.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {/* 3D Phone */}
                <motion.div
                  className="relative h-64 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{
                    boxShadow: "0 0 30px rgba(15,219,179,0.2)",
                  }}
                >
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[5, 5, 5]} color="#0FDBB3" intensity={1} />
                      <pointLight position={[-5, -5, -5]} color="#00F9DA" intensity={0.5} />
                      <PhoneModel />
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    </Suspense>
                  </Canvas>
                </motion.div>

                {/* 3D Dashboard */}
                <motion.div
                  className="relative h-64 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{
                    boxShadow: "0 0 30px rgba(15,219,179,0.2)",
                  }}
                >
                  <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
                    <Suspense fallback={null}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[5, 5, 5]} color="#0FDBB3" intensity={1} />
                      <pointLight position={[-5, -5, -5]} color="#00F9DA" intensity={0.5} />
                      <DashboardPanel />
                      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
                    </Suspense>
                  </Canvas>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: CTA Section */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to Build an Intelligent Digital Product?
            </motion.h2>

            <motion.button
              className="px-12 py-6 rounded-full border-2 border-[#0FDBB3] text-[#0FDBB3] font-bold text-lg magnetic relative overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 0.8, delay: 0.2 },
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

