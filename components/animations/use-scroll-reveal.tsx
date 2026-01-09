'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface UseScrollRevealOptions {
  trigger?: string | HTMLElement
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

/**
 * Hook for creating scroll-triggered animations
 * Perfect for section reveals and scroll-based animations
 */
export function useScrollReveal(
  animation: gsap.core.Tween | gsap.core.Timeline | null,
  options: UseScrollRevealOptions = {}
) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options

  useEffect(() => {
    if (!animation) return

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || undefined,
      start,
      end,
      scrub,
      markers,
      animation,
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
    })

    return () => {
      scrollTrigger.kill()
    }
  }, [animation, trigger, start, end, scrub, markers, onEnter, onLeave, onEnterBack, onLeaveBack])
}

/**
 * Hook for simple fade-in section reveals
 */
export function useFadeInReveal(
  ref: React.RefObject<HTMLElement>,
  options: {
    delay?: number
    duration?: number
    y?: number
  } = {}
) {
  const { delay = 0, duration = 1, y = 50 } = options

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [ref, delay, duration, y])
}

