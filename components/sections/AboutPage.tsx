"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const values = [
  "Innovation",
  "Ownership",
  "Quality",
  "Speed",
  "Transparency",
  "Continuous Learning",
];

const stats = [
  { label: "AI-driven products delivered", value: 35, suffix: "+" },
  { label: "Fully deployed platforms", value: 20, suffix: "+" },
  { label: "Proprietary AI models integrated", value: 10, suffix: "+" },
  { label: "Countries served", value: 4, suffix: "+" },
];

const timeline = [
  { year: "2021", event: "Corazor Technology founded" },
  { year: "2022", event: "Built first enterprise platform" },
  { year: "2023", event: "Delivered 15+ AI-driven systems" },
  { year: "2024", event: "Expanded AI, ML & Blockchain teams" },
  { year: "2025", event: "35+ intelligent digital ecosystems delivered" },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const philosophyRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Animate sections on scroll
    const sections = [
      { ref: missionRef, delay: 0 },
      { ref: storyRef, delay: 0.1 },
      { ref: philosophyRef, delay: 0.2 },
      { ref: timelineRef, delay: 0.3 },
      { ref: valuesRef, delay: 0.4 },
      { ref: statsRef, delay: 0.5 },
    ];

    sections.forEach(({ ref, delay }) => {
      if (ref.current) {
        gsap.fromTo(
          ref.current,
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
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay,
          }
        );
      }
    });

    // Timeline line animation
    const timelineLine = document.querySelector(".timeline-line");
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
            trigger: timelineRef.current,
            start: "top 70%",
          },
        }
      );
    }

    // Timeline items animation
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Stats count-up animation
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target") || "0");
      const suffix = stat.getAttribute("data-suffix") || "";

      ScrollTrigger.create({
        trigger: stat,
        start: "top 85%",
        onEnter: () => {
          gsap.to(stat, {
            innerHTML: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerHTML: 1 },
            onUpdate: function () {
              stat.innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
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
        {/* SECTION 1: Cinematic About Hero */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white overflow-hidden"
        >
          {/* Particle Background */}
          <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0FDBB3] rounded-full blur-sm animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-[#00F9DA] rounded-full blur-sm animate-pulse" style={{ animationDelay: "0.5s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-[#0FDBB3] rounded-full blur-sm animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <motion.div
            className="relative z-10 text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Driven by Innovation.{" "}
              <span className="relative inline-block">
                Powered by Execution.
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    boxShadow: "0 0 15px rgba(15,219,179,0.6)",
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[#D4DFEA] max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Corazor Technology helps businesses build intelligent, scalable, future-ready digital
              ecosystems using AI, Web, App & Blockchain.
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 2: Mission & Vision */}
        <section
          ref={missionRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
              whileHover={{ scale: 1.02, y: -4, boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-[#0FDBB3]">Mission</h3>
              <p className="text-[#D4DFEA] text-lg leading-relaxed">
                To help businesses build intelligent, scalable digital platforms that create
                real-world impact.
              </p>
            </motion.div>

            <motion.div
              className="p-8 rounded-xl bg-[#11172B] border border-[#00F9DA]/20 hover:border-[#00F9DA] transition-all duration-200 group"
              whileHover={{ scale: 1.02, y: -4, boxShadow: "0 0 8px rgba(0,249,218,0.7), 0 0 22px rgba(0,249,218,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-3xl font-bold mb-4 text-[#00F9DA]">Vision</h3>
              <p className="text-[#D4DFEA] text-lg leading-relaxed">
                To be the global leader in future-ready technology execution — AI, automation, web,
                mobile & blockchain.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: The Corazor Story */}
        <section
          ref={storyRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 text-center tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              The Corazor Story
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6 text-[#D4DFEA] text-lg leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <p>
                  Corazor Technology was founded with a mission to streamline execution for ideas
                  with real impact. We recognized that great ideas often fail not because they lack
                  vision, but because they lack the right execution engine.
                </p>
                <p>
                  Today, we help startups and enterprises reduce execution cycles by up to 60%,
                  building intelligent digital ecosystems that drive measurable results. Our
                  approach combines deep technical expertise with a relentless focus on outcomes.
                </p>
                <p>
                  We specialize in delivering AI-driven solutions across sectors, from healthcare and
                  education to finance and social impact. With over 35 AI-powered systems delivered,
                  we've proven that intelligent technology can transform how businesses operate and
                  scale.
                </p>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-square rounded-xl bg-gradient-to-br from-[#0FDBB3]/20 via-[#11172B] to-[#00F9DA]/20 border border-[#0FDBB3]/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-[#D4DFEA]">Corazor Technology</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Execution Philosophy */}
        <section
          ref={philosophyRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Why Companies Trust Corazor
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Speed With Precision",
                  description: "We reduce execution cycles by 50–60% without compromising quality.",
                  icon: "⚡",
                },
                {
                  title: "Deep Tech Expertise",
                  description: "AI, LLMs, ML, Mobile, Web, Blockchain — all under one execution engine.",
                  icon: "🧠",
                },
                {
                  title: "Design + Engineering Together",
                  description: "User-first design merged with scalable engineering.",
                  icon: "🎨",
                },
                {
                  title: "Commitment to Outcomes",
                  description: "We don't just build products — we build impact.",
                  icon: "🎯",
                },
              ].map((pillar, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-[#0FDBB3]">{pillar.title}</h3>
                  <p className="text-[#D4DFEA] text-sm leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Animated Timeline */}
        <section
          ref={timelineRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Journey
            </motion.h2>

            <div className="relative">
              {/* Timeline Line */}
              <div
                className="timeline-line absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0FDBB3] to-[#00F9DA] origin-top"
                style={{ transform: "translateX(-50%)" }}
              />

              {/* Timeline Items */}
              <div className="space-y-16">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="timeline-item relative flex flex-col md:flex-row items-start md:items-center gap-6"
                  >
                    <div
                      className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8 md:order-2"}`}
                    >
                      <div className="inline-block p-6 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group">
                        <div className="text-2xl font-bold text-[#0FDBB3] mb-2">{item.year}</div>
                        <div className="text-[#D4DFEA]">{item.event}</div>
                      </div>
                    </div>

                    {/* Timeline Node */}
                    <div
                      className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-[#0FDBB3] border-4 border-[#0A0F24] z-10"
                      style={{
                        transform: "translateX(-50%)",
                        boxShadow: "0 0 20px rgba(15,219,179,0.6)",
                      }}
                    />

                    <div className={`flex-1 ${index % 2 === 0 ? "md:order-2" : ""}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Team Values Grid */}
        <section
          ref={valuesRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Values
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{
                      y: -4,
                      scale: 1.02,
                      boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-2xl font-bold text-[#0FDBB3] mb-3">{value}</h3>
                    <motion.div
                      className="h-0.5 w-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] group-hover:w-full transition-all duration-500"
                      style={{
                        boxShadow: "0 0 10px rgba(15,219,179,0.6)",
                      }}
                    />
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Stats + Achievements */}
        <section
          ref={statsRef}
            className="section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl sm:text-5xl font-bold mb-12 sm:mb-16 text-center tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              Our Impact
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.03,
                    y: -2,
                    boxShadow: "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
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
      </div>
  );
}

