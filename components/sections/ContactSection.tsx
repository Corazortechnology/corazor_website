"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputsRef = useRef<(HTMLInputElement | HTMLTextAreaElement)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate inputs on load
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
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, []);

  const handleFocus = (fieldName: string, input: HTMLInputElement | HTMLTextAreaElement) => {
    setFocusedField(fieldName);
    const label = input.previousElementSibling as HTMLElement;
    if (label) {
      gsap.to(label, {
        y: -14,
        scale: 0.85,
        color: "#0FDBB3",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Add neon glow to input
    gsap.to(input, {
      boxShadow: "0 0 20px rgba(15,219,179,0.4)",
      borderColor: "#0FDBB3",
      duration: 0.3,
    });

    // Pulse glow animation
    gsap.to(input, {
      boxShadow: "0 0 25px rgba(15,219,179,0.6)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  };

  const handleBlur = (fieldName: string, input: HTMLInputElement | HTMLTextAreaElement) => {
    setFocusedField(null);
    const label = input.previousElementSibling as HTMLElement;
    const value = input.value;

    if (!value && label) {
      gsap.to(label, {
        y: 8,
        scale: 1,
        color: "#D4DFEA",
        duration: 0.3,
        ease: "power2.out",
      });
    }

    // Remove glow
    gsap.killTweensOf(input);
    gsap.to(input, {
      boxShadow: "0 0 0 rgba(15,219,179,0)",
      borderColor: "rgba(255,255,255,0.1)",
      duration: 0.3,
    });
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    const input = inputsRef.current.find((inp) => inp.name === field);
    const label = input?.previousElementSibling as HTMLElement;

    if (value && label && !focusedField) {
      gsap.to(label, {
        y: -14,
        scale: 0.85,
        color: "#0FDBB3",
        duration: 0.3,
        ease: "power2.out",
      });
    } else if (!value && label && !focusedField) {
      gsap.to(label, {
        y: 8,
        scale: 1,
        color: "#D4DFEA",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const createConfetti = () => {
    if (!confettiContainerRef.current) return;

    const colors = ["#0FDBB3", "#00F9DA"];
    const particleCount = 30;

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
      const velocity = 200 + Math.random() * 100;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      gsap.to(particle, {
        x: x,
        y: y,
        opacity: 0,
        scale: 0,
        duration: 1.5,
        ease: "power3.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Button compression animation
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message");
      }

      // Success animation
      setIsSuccess(true);
      createConfetti();

      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 1,
          backgroundColor: "#0FDBB3",
          duration: 0.5,
          ease: "power3.out",
        });
      }

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setIsSuccess(false);
        setIsSubmitting(false);

        // Reset all labels
        inputsRef.current.forEach((input) => {
          const label = input.previousElementSibling as HTMLElement;
          if (label) {
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
  }: {
    name: keyof FormData;
    label: string;
    type?: string;
    required?: boolean;
    isTextarea?: boolean;
  }) => {
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputsRef.current.push(inputRef.current);
      }
    }, []);

    const value = formData[name];
    const isFocused = focusedField === name;
    const hasValue = value.length > 0;
    const labelActive = isFocused || hasValue;

    return (
      <div className="relative mb-6">
        <label
          className={`absolute left-4 transition-colors duration-300 ${
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
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => handleFocus(name, e.target)}
            onBlur={(e) => handleBlur(name, e.target)}
            required={required}
            rows={5}
            className="w-full px-4 pt-8 pb-4 rounded-xl bg-[#11172B] border border-white/10 text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none"
            style={{
              boxShadow: isFocused ? "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)" : "none",
              borderColor: isFocused ? "#0FDBB3" : "rgba(255,255,255,0.1)",
            }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type}
            name={name}
            value={value}
            onChange={(e) => handleChange(name, e.target.value)}
            onFocus={(e) => handleFocus(name, e.target)}
            onBlur={(e) => handleBlur(name, e.target)}
            required={required}
            className="w-full px-4 pt-8 pb-4 rounded-xl bg-[#11172B] border border-white/10 text-white placeholder-transparent focus:outline-none transition-all duration-300"
            style={{
              boxShadow: isFocused ? "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)" : "none",
              borderColor: isFocused ? "#0FDBB3" : "rgba(255,255,0.1)",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
          className="relative min-h-screen section-padding px-4 sm:px-6 lg:px-8 bg-[#0A0F24] text-white flex items-center justify-center"
    >
      {/* Background Blobs */}
      <motion.div
        className="absolute top-20 left-10 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10 z-0"
        style={{ background: "rgba(15,219,179,0.4)" }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-[700px] h-[700px] rounded-full blur-[220px] opacity-10 z-0"
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

      <div className="relative z-10 max-w-3xl w-full">
        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Let's Build Something{" "}
          <span className="relative inline-block">
            <span className="neon-gradient-text">Intelligent</span>
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1"
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
                scaleX: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                backgroundPosition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-center text-[#D4DFEA] text-lg mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Tell us about your idea, and we'll help you turn it into a scalable digital product.
        </motion.p>

        {/* Form Container */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative p-8 sm:p-10 rounded-xl backdrop-blur-md border border-white/5 bg-[#11172B]/80"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{
            boxShadow: "0 0 8px rgba(15,219,179,0.2), 0 0 22px rgba(0,249,218,0.1)",
          }}
        >
          {/* Confetti Container */}
          <div ref={confettiContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl" />

          <InputField name="name" label="Your Name" required />
          <InputField name="email" label="Email" type="email" required />
          <InputField name="phone" label="Phone" type="tel" required />
          <InputField name="company" label="Company" />
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

          {/* Submit Button */}
          <motion.button
            ref={buttonRef}
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="w-full py-4 px-8 rounded-xl border-2 border-[#0FDBB3] text-[#0FDBB3] font-semibold text-lg magnetic relative overflow-hidden group"
            whileHover={{ scale: isSubmitting ? 1 : 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            animate={{
              boxShadow: isSubmitting
                ? "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)"
                : [
                    "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
                    "0 0 12px rgba(15,219,179,0.8), 0 0 28px rgba(0,249,218,0.5)",
                    "0 0 8px rgba(15,219,179,0.7), 0 0 22px rgba(0,249,218,0.4)",
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
              {isSubmitting ? "Sending..." : isSuccess ? "Message Sent!" : "Send Message"}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0FDBB3] to-[#00F9DA] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{ filter: "blur(10px)" }}
            />
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

