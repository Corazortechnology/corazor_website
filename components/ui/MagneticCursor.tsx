"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const isHovering = useRef(false);
  const isDistorting = useRef(false);
  const currentTarget = useRef<HTMLElement | null>(null);
  const currentDistortTarget = useRef<HTMLElement | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const trailX = useRef(0);
  const trailY = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on mobile/touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Create cursor element
    const cursor = document.createElement("div");
    cursor.id = "corazor-cursor";
    cursor.className = "fixed pointer-events-none z-[99999]";
    cursor.style.cssText = `
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(15, 219, 179, 0.4);
      border: 1px solid #0FDBB3;
      box-shadow: 0 0 35px #0FDBB3;
      transform: translate3d(-50%, -50%, 0);
      transition: width 0.3s ease-out, height 0.3s ease-out, box-shadow 0.3s ease-out;
      will-change: transform;
    `;
    document.body.appendChild(cursor);
    cursorRef.current = cursor;

    // Create trail element
    const trail = document.createElement("div");
    trail.id = "corazor-cursor-trail";
    trail.className = "fixed pointer-events-none z-[99998]";
    trail.style.cssText = `
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(0, 249, 218, 0.3);
      box-shadow: 0 0 20px rgba(0, 249, 218, 0.4);
      transform: translate3d(-50%, -50%, 0);
      will-change: transform;
    `;
    document.body.appendChild(trail);
    trailRef.current = trail;

    // Update cursor position smoothly
    const updateCursor = () => {
      if (!cursorRef.current) return;

      // Smooth cursor movement
      cursorX.current += (mouseX.current - cursorX.current) * 0.15;
      cursorY.current += (mouseY.current - cursorY.current) * 0.15;

      gsap.to(cursorRef.current, {
        x: cursorX.current,
        y: cursorY.current,
        duration: 0.1,
        ease: "power2.out",
      });

      // Trail follows with delay
      if (trailRef.current) {
        trailX.current += (cursorX.current - trailX.current) * 0.1;
        trailY.current += (cursorY.current - trailY.current) * 0.1;

        gsap.to(trailRef.current, {
          x: trailX.current,
          y: trailY.current,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;

      if (!isHovering.current && !isDistorting.current && cursorRef.current) {
        // Normal cursor size
        gsap.to(cursorRef.current, {
          width: 22,
          height: 22,
          boxShadow: "0 0 35px #0FDBB3",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Magnetic hover effect
    const handleMouseEnter = (e: MouseEvent) => {
      let target = e.target;
      // Traverse up to find an Element if target is a Text node
      while (target && !(target instanceof Element)) {
        target = (target as any).parentNode;
      }
      if (!target || !(target instanceof Element)) return;
      const magneticElement = target.closest(".magnetic, .button-primary, .button-secondary, .card, .service-card, .cta-button");

      if (magneticElement && cursorRef.current) {
        isHovering.current = true;
        currentTarget.current = magneticElement as HTMLElement;

        // Grow cursor
        gsap.to(cursorRef.current, {
          width: 45,
          height: 45,
          boxShadow: "0 0 60px #00F9DA",
          duration: 0.3,
          ease: "power2.out",
        });

        // Scale element
        gsap.to(magneticElement, {
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMoveOnMagnetic = (e: MouseEvent) => {
      if (!isHovering.current || !currentTarget.current || !cursorRef.current) return;

      const rect = currentTarget.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate attraction
      const deltaX = centerX - e.clientX;
      const deltaY = centerY - e.clientY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 150;
      // Reduce magnetic strength on smaller screens
      const isMobile = window.innerWidth < 768;
      const strength = isMobile ? 8 : 15;

      if (distance < maxDistance) {
        const attractionX = (deltaX / maxDistance) * strength;
        const attractionY = (deltaY / maxDistance) * strength;

        // Move cursor toward element
        cursorX.current = e.clientX + attractionX;
        cursorY.current = e.clientY + attractionY;

        // Move element slightly toward cursor
        const elementMoveX = (e.clientX - centerX) * 0.02;
        const elementMoveY = (e.clientY - centerY) * 0.02;

        gsap.to(currentTarget.current, {
          x: elementMoveX,
          y: elementMoveY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      let target = e.target;
      // Traverse up to find an Element if target is a Text node
      while (target && !(target instanceof Element)) {
        target = (target as any).parentNode;
      }
      if (!target || !(target instanceof Element)) return;
      const magneticElement = target.closest(".magnetic, .button-primary, .button-secondary, .card, .service-card, .cta-button");

      if (magneticElement && cursorRef.current) {
        isHovering.current = false;

        // Reset cursor
        gsap.to(cursorRef.current, {
          width: 22,
          height: 22,
          boxShadow: "0 0 35px #0FDBB3",
          duration: 0.3,
          ease: "power2.out",
        });

        // Reset element
        gsap.to(magneticElement, {
          scale: 1,
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        currentTarget.current = null;
      }
    };

    // Distortion effect
    const handleDistortEnter = (e: MouseEvent) => {
      let target = e.target;
      // Traverse up to find an Element if target is a Text node
      while (target && !(target instanceof Element)) {
        target = (target as any).parentNode;
      }
      if (!target || !(target instanceof Element)) return;
      const distortElement = target.closest(".distort, .hero-title, .neon-heading");

      if (distortElement && cursorRef.current) {
        isDistorting.current = true;
        currentDistortTarget.current = distortElement as HTMLElement;
      }
    };

    const handleDistortMove = (e: MouseEvent) => {
      if (!isDistorting.current || !cursorRef.current || !currentDistortTarget.current) return;

      // Get mouse velocity for distortion direction
      const rect = currentDistortTarget.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height) / 2;

      const intensity = Math.min(distance / maxDistance, 1) * 0.4;
      const scaleX = 1 + Math.cos(angle) * intensity;
      const scaleY = 1 + Math.sin(angle) * intensity;

      // Stretch cursor
      gsap.to(cursorRef.current, {
        scaleX: scaleX,
        scaleY: scaleY,
        duration: 0.15,
        ease: "power2.out",
      });

      // Occasional ripple effect
      if (Math.random() > 0.95) {
        const ripple = document.createElement("div");
        ripple.style.cssText = `
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid #00F9DA;
          opacity: 0.6;
          transform: scale(1);
          pointer-events: none;
        `;
        cursorRef.current.appendChild(ripple);

        gsap.to(ripple, {
          scale: 2.5,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        });
      }
    };

    const handleDistortLeave = (e: MouseEvent) => {
      let target = e.target;
      // Traverse up to find an Element if target is a Text node
      while (target && !(target instanceof Element)) {
        target = (target as any).parentNode;
      }
      if (!target || !(target instanceof Element)) return;
      const distortElement = target.closest(".distort, .hero-title, .neon-heading");

      if (distortElement && cursorRef.current) {
        isDistorting.current = false;
        currentDistortTarget.current = null;

        // Return to circle
        gsap.to(cursorRef.current, {
          scaleX: 1,
          scaleY: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    // Hide cursor on window leave
    const handleMouseLeaveWindow = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.2,
        });
      }
      if (trailRef.current) {
        gsap.to(trailRef.current, {
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseEnterWindow = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.2,
        });
      }
      if (trailRef.current) {
        gsap.to(trailRef.current, {
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    // Attach event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleMouseMoveOnMagnetic);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseenter", handleDistortEnter, true);
    document.addEventListener("mousemove", handleDistortMove);
    document.addEventListener("mouseleave", handleDistortLeave, true);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Hide default cursor
    document.body.style.cursor = "none";

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleMouseMoveOnMagnetic);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseenter", handleDistortEnter, true);
      document.removeEventListener("mousemove", handleDistortMove);
      document.removeEventListener("mouseleave", handleDistortLeave, true);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);

      if (cursorRef.current) {
        cursorRef.current.remove();
      }
      if (trailRef.current) {
        trailRef.current.remove();
      }

      document.body.style.cursor = "";
    };
  }, []);

  return null;
}

