'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function GlowingCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let rafId: number;
    let lastX = 0;
    let lastY = 0;

    const updateMousePosition = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY });
          rafId = 0;
        });
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener('mousemove', updateMousePosition, { passive: true })
    
    // Check for hoverable elements
    const hoverableElements = document.querySelectorAll('a, button, [role="button"]')
    hoverableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', updateMousePosition)
      hoverableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-neon-accent pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Glowing ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-neon-accent pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        style={{
          boxShadow: `0 0 20px ${isHovering ? '#0FDBB3' : '#0FDBB3'}, 0 0 40px ${isHovering ? '#0FDBB3' : 'transparent'}`,
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-40 opacity-30"
        animate={{
          x: mousePosition.x - 48,
          y: mousePosition.y - 48,
          scale: isHovering ? 1.2 : 0.8,
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        style={{
          background: `radial-gradient(circle, #0FDBB3 0%, transparent 70%)`,
        }}
      />
    </>
  )
}

