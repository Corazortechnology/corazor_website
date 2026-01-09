"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import dynamic from "next/dynamic";


gsap.registerPlugin(ScrollTrigger);

// Particle System Component
function ParticleSystem() {
  const ref = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 1000 : 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const neonColor = new THREE.Color("#0FDBB3");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 50 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const colorVariation = 0.4 + Math.random() * 0.6;
      colors[i3] = neonColor.r * colorVariation;
      colors[i3 + 1] = neonColor.g * colorVariation;
      colors[i3 + 2] = neonColor.b * colorVariation;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      ref.current.rotation.x = Math.sin(time * 0.05) * 0.1;
      ref.current.rotation.y = Math.cos(time * 0.08) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0FDBB3"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        opacity={0.18}
      />
    </Points>
  );
}

const trustPillars = [
  {
    title: "Fast, Precise Execution",
    description: "We compress development cycles by 50–60%.",
    icon: "⚡",
  },
  {
    title: "Full-Stack Engineering Strength",
    description: "AI, App, Web & Blockchain under one execution engine.",
    icon: "🧠",
  },
  {
    title: "Outcome-Driven Work",
    description: "Everything is designed to deliver measurable business impact.",
    icon: "🎯",
  },
  {
    title: "Zero Communication Gaps",
    description: "Clean, transparent, engineering-first workflows.",
    icon: "💬",
  },
];

const budgetOptions = [
  "Under $50K",
  "$50K - $100K",
  "$100K - $250K",
  "$250K - $500K",
  "$500K+",
];

const projectTypes = [
  "AI & Machine Learning",
  "Web Development",
  "App Development",
  "Blockchain",
  "Enterprise Platform",
  "Custom Solution",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  projectTypes: string[];
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    projectTypes: [],
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<(HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero parallax tilt
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50, rotationX: 5 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 80%",
          },
        }
      );
    }

    // Trust section animation
    if (trustRef.current) {
      gsap.fromTo(
        trustRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 85%",
          },
        }
      );
    }

    // Form inputs stagger
    if (inputsRef.current.length > 0) {
      gsap.fromTo(
        inputsRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleFocus = (fieldName: string, input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    setFocusedField(fieldName);
    const label = input.previousElementSibling as HTMLElement;
    if (label && label.classList.contains("floating-label")) {
      gsap.to(label, {
        y: -14,
        scale: 0.85,
        color: "#0FDBB3",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    gsap.to(input, {
      boxShadow: "0 0 20px rgba(15,219,179,0.4)",
      borderColor: "#0FDBB3",
      duration: 0.3,
    });

    gsap.to(input, {
      boxShadow: "0 0 25px rgba(15,219,179,0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  };

  const handleBlur = (fieldName: string, input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
    setFocusedField(null);
    const label = input.previousElementSibling as HTMLElement;
    const value = input.value;

    if (!value && label && label.classList.contains("floating-label")) {
      gsap.to(label, {
        y: 8,
        scale: 1,
        color: "#D4DFEA",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    gsap.killTweensOf(input);
    gsap.to(input, {
      boxShadow: "0 0 0 rgba(15,219,179,0)",
      borderColor: "rgba(255,255,255,0.1)",
      duration: 0.3,
    });
  };

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const input = inputsRef.current.find((inp) => inp.name === field);
    const label = input?.previousElementSibling as HTMLElement;

    if (value && label && label.classList.contains("floating-label") && !focusedField) {
      gsap.to(label, {
        y: -14,
        scale: 0.85,
        color: "#0FDBB3",
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (!value && label && label.classList.contains("floating-label") && !focusedField) {
      gsap.to(label, {
        y: 8,
        scale: 1,
        color: "#D4DFEA",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const toggleProjectType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter((t) => t !== type)
        : [...prev.projectTypes, type],
    }));
  };

  const createConfetti = () => {
    if (!confettiContainerRef.current) return;

    const colors = ["#0FDBB3", "#00F9DA"];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px ${color};
        left: 50%;
        top: 50%;
        pointer-events: none;
        z-index: 1000;
      `;

      confettiContainerRef.current.appendChild(particle);

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 250 + Math.random() * 100;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      gsap.to(particle, {
        x: x,
        y: y,
        opacity: 0,
        scale: 0,
        duration: 2,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.2,
        ease: "power2.out",
      });
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      setIsSuccess(true);
      createConfetti();

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          backgroundColor: "#0FDBB3",
          duration: 0.5,
          ease: "power2.out",
        });
      }

      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          budget: "",
          projectTypes: [],
          message: "",
        });
        setIsSuccess(false);
        setIsSubmitting(false);

        inputsRef.current.forEach((input) => {
          const label = input.previousElementSibling as HTMLElement;
          if (label && label.classList.contains("floating-label")) {
            gsap.to(label, {
              y: 8,
              scale: 1,
              color: "#D4DFEA",
              duration: 0.3,
            });
          }
        });

        if (buttonRef.current) {
          gsap.to(buttonRef.current, {
            backgroundColor: "transparent",
            duration: 0.5,
          });
        }
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
        });
      }
    }
  };

  const InputField = ({
    name,
    label,
    type = "text",
    required = false,
    isTextarea = false,
    isSelect = false,
    options = [],
  }: {
    name: keyof FormData;
    label: string;
    type?: string;
    required?: boolean;
    isTextarea?: boolean;
    isSelect?: boolean;
    options?: string[];
  }) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputsRef.current.push(inputRef.current);
      }
    }, []);

    const value = formData[name];
    const isFocused = focusedField === name;
    const hasValue = typeof value === "string" ? value.length > 0 : Array.isArray(value) ? value.length > 0 : false;
    const labelActive = isFocused || hasValue;

    return (
      <div className="relative mb-6">
        <label
          className={`floating-label absolute left-4 transition-colors duration-200 ${
            labelActive ? "text-[#0FDBB3]" : "text-[#D4DFEA]"
          }`}
          style={{
            top: labelActive ? "-14px" : "8px",
            transform: labelActive ? "scale(0.85)" : "scale(1)",
            transformOrigin: "left top",
          }}
        >
          {label} {required && <span className="text-[#0FDBB3]">*</span>}
        </label>
        {isTextarea ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            value={value as string}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => handleFocus(name, e.target)}
            onBlur={(e) => handleBlur(name, e.target)}
            required={required}
            rows={5}
            className="w-full px-4 pt-8 pb-4 rounded-xl bg-[#11172B] border border-white/10 text-white placeholder-transparent focus:outline-none transition-all duration-200 resize-none"
            style={{
              boxShadow: isFocused ? "0 0 20px rgba(15,219,179,0.4)" : "none",
              borderColor: isFocused ? "#0FDBB3" : "rgba(255,255,255,0.1)",
            }}
          />
        ) : isSelect ? (
          <select
            ref={inputRef as React.RefObject<HTMLSelectElement>}
            name={name}
            value={value as string}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => handleFocus(name, e.target)}
            onBlur={(e) => handleBlur(name, e.target)}
            required={required}
            className="w-full px-4 pt-8 pb-4 rounded-xl bg-[#11172B] border border-white/10 text-white focus:outline-none transition-all duration-200"
            style={{
              boxShadow: isFocused ? "0 0 20px rgba(15,219,179,0.4)" : "none",
              borderColor: isFocused ? "#0FDBB3" : "rgba(255,255,255,0.1)",
            }}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            name={name}
            value={value as string}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => handleFocus(name, e.target)}
            onBlur={(e) => handleBlur(name, e.target)}
            required={required}
            className="w-full px-4 pt-8 pb-4 rounded-xl bg-[#11172B] border border-white/10 text-white placeholder-transparent focus:outline-none transition-all duration-200"
            style={{
              boxShadow: isFocused ? "0 0 20px rgba(15,219,179,0.4)" : "none",
              borderColor: isFocused ? "#0FDBB3" : "rgba(255,255,255,0.1)",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="relative z-10">
        {/* SECTION 1: Cinematic Contact Hero */}
        <section
          ref={heroRef}
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
            >
              Let's Build Something{" "}
              <span className="relative inline-block">
                Extraordinary Together.
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
              We help startups and enterprises turn ideas into intelligent, scalable, future-ready
              digital products.
            </motion.p>
          </motion.div>
        </section>

        {/* SECTION 2: Why Reach Out? */}
        <section
          ref={trustRef}
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
              Why Work With Corazor
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustPillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="p-8 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 hover:border-[#0FDBB3] transition-all duration-200 group"
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
                  <h3 className="text-xl font-bold text-[#0FDBB3] mb-3">{pillar.title}</h3>
                  <p className="text-[#D4DFEA] leading-relaxed">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Animated Contact Form */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white overflow-hidden">
          {/* 3D Background Particles */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Canvas camera={{ position: [0, 0, 50], fov: 75 }} dpr={[1, 1.5]}>
              <Suspense fallback={null}>
                <ParticleSystem />
              </Suspense>
            </Canvas>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative p-8 sm:p-10 rounded-xl backdrop-blur-md border border-white/5 bg-[#11172B]/80"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Confetti Container */}
              <div ref={confettiContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" />

              <InputField name="fullName" label="Full Name" required />
              <InputField name="email" label="Email" type="email" required />
              <InputField name="phone" label="Phone" type="tel" required />
              <InputField name="company" label="Company Name" />
              <InputField name="budget" label="Budget Estimate" isSelect options={budgetOptions} />

              {/* Project Types Multi-Select */}
              <div className="mb-6">
                <label className="block text-[#D4DFEA] mb-3 text-sm">Project Type (Select all that apply)</label>
                <div className="flex flex-wrap gap-3">
                  {projectTypes.map((type) => (
                    <motion.button
                      key={type}
                      type="button"
                      onClick={() => toggleProjectType(type)}
                      className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                        formData.projectTypes.includes(type)
                          ? "border-[#0FDBB3] bg-[#0FDBB3]/10 text-[#0FDBB3]"
                          : "border-[#0FDBB3]/20 text-[#D4DFEA] hover:border-[#0FDBB3]/40"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              <InputField name="message" label="Project Description" isTextarea required />

              {error && (
                <motion.div
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {isSuccess && (
                <motion.div
                  className="mb-6 p-6 rounded-xl bg-[#0FDBB3]/10 border border-[#0FDBB3] text-[#0FDBB3] text-center font-bold text-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    boxShadow: "0 0 30px rgba(15,219,179,0.4)",
                  }}
                >
                  Message Sent Successfully! 🎉
                </motion.div>
              )}

              <motion.button
                ref={buttonRef}
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 px-8 rounded-xl border-2 border-[#0FDBB3] text-[#0FDBB3] font-semibold text-lg magnetic relative overflow-hidden group"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: isSubmitting
                    ? "0 0 18px rgba(15,219,179,0.4)"
                    : [
                        "0 0 18px rgba(15,219,179,0.6)",
                        "0 0 25px rgba(15,219,179,0.8)",
                        "0 0 18px rgba(15,219,179,0.6)",
                      ],
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: isSubmitting ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <span className="relative z-10">
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#0FDBB3] border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : isSuccess ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                  style={{ filter: "blur(10px)" }}
                />
              </motion.button>
            </motion.form>
          </div>
        </section>

        {/* SECTION 5: CTA Banner */}
        <section className="py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white">
          <motion.div
            className="max-w-5xl mx-auto text-center p-12 rounded-xl border-2 border-[#0FDBB3] bg-[#11172B]/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            animate={{
              boxShadow: [
                "0 0 30px rgba(15,219,179,0.3)",
                "0 0 50px rgba(15,219,179,0.5)",
                "0 0 30px rgba(15,219,179,0.3)",
              ],
            }}
            transition={{
              opacity: { duration: 0.8 },
              y: { duration: 0.8 },
              boxShadow: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">We're Ready When You Are.</h2>
            <motion.button
              className="px-12 py-6 rounded-full border-2 border-[#0FDBB3] text-[#0FDBB3] font-bold text-lg magnetic relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: "0 0 25px rgba(15,219,179,0.4)",
              }}
            >
              <span className="relative z-10">Start Your Project</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-20 transition-opacity duration-200"
                style={{ filter: "blur(15px)" }}
              />
            </motion.button>
          </motion.div>
        </section>
      </div>
  );
}

