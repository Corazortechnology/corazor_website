"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "AI & Machine Learning",
    items: [
      "Machine learning models",
      "RAG/NLP pipelines",
      "Computer vision solutions",
      "AI chatbots",
    ],
  },
  {
    title: "Blockchain Development",
    items: [
      "Smart contract development",
      "DApp development",
      "Blockchain consulting",
      "Real-world blockchain integrations",
    ],
  },
  {
    title: "App Development",
    items: [
      "Custom Android & iOS development",
      "Third-party API integrations",
      "UI/UX design",
      "Scalable mobile systems",
    ],
  },
  {
    title: "Web Development",
    items: [
      "Custom platforms",
      "Responsive design",
      "Enterprise dashboards",
      "Maintenance & support",
    ],
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 80,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              toggleActions: "play none none reverse",
            },
            delay: index * 0.1,
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger && cardsRef.current.includes(trigger.vars.trigger as HTMLDivElement)) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding px-4 sm:px-6 lg:px-12 bg-[#0A0F24] text-white"
    >
      <motion.h2
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold mb-12 sm:mb-16 tracking-tight"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        What We Build at{" "}
        <span className="neon-gradient-text">
          Corazor Technology
        </span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="service-card-wrapper"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#0FDBB3"
              glarePosition="all"
              glareBorderRadius="24px"
              transitionSpeed={1000}
              className="h-full"
            >
              <motion.div
                className="relative p-6 sm:p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 h-full flex flex-col group cursor-pointer"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  boxShadow: "0 0 0 rgba(15, 219, 179, 0)",
                }}
                onHoverStart={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 0 8px rgba(15, 219, 179, 0.7), 0 0 22px rgba(0, 249, 218, 0.4)",
                    duration: 0.2,
                    ease: "power2.out",
                  });
                }}
                onHoverEnd={(e) => {
                  gsap.to(e.currentTarget, {
                    boxShadow: "0 0 0 rgba(15, 219, 179, 0)",
                    duration: 0.25,
                    ease: "power2.out",
                  });
                }}
              >
                {/* Animated Neon Border */}
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.span
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "linear-gradient(90deg, transparent, #0FDBB3, #00F9DA, #0FDBB3, transparent)",
                      backgroundSize: "200% 100%",
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
                </div>

                {/* Glow Ring on Hover */}
                <motion.div
                  className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, #0FDBB3, #00F9DA, #0FDBB3)",
                    backgroundSize: "200% 200%",
                    filter: "blur(8px)",
                    zIndex: -1,
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "200% 200%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#0FDBB3]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {service.title}
                  </motion.h3>

                  <ul className="space-y-3 sm:space-y-4 flex-1">
                    {service.items.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="text-[#D4DFEA] text-sm sm:text-base flex items-start gap-2 leading-relaxed"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + itemIndex * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className="text-[#0FDBB3] mt-1.5">▹</span>
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Subtle inner glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-200"
                  style={{
                    background: "radial-gradient(circle at center, rgba(15,219,179,0.3), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
              </motion.div>
            </Tilt>
          </div>
        ))}
      </div>
    </section>
  );
}
