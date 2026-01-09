export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  slideLeft: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  slideRight: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  staggerContainer: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

