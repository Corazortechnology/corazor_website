'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ScrollTriggerInit() {
  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Set default ScrollTrigger settings for premium feel
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    })

    // Refresh ScrollTrigger on resize for responsive behavior
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      ScrollTrigger.clearScrollMemory()
    }
  }, [])

  return null
}

