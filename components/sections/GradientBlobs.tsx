"use client";

import { motion } from "framer-motion";



export default function GradientBlobs() {

  return (

    <>

      <motion.div

        className="blob absolute top-40 left-10 w-96 h-96 bg-[#0FDBB3] blur-[140px] opacity-20 rounded-full"

        animate={{ x: [0, 80, 0], y: [0, -80, 0] }}

        transition={{ repeat: Infinity, duration: 12 }}

      />



      <motion.div

        className="blob absolute bottom-40 right-10 w-[500px] h-[500px] bg-[#00F9DA] blur-[180px] opacity-10 rounded-full"

        animate={{ x: [50, 0, 50], y: [-40, 40, -40] }}

        transition={{ repeat: Infinity, duration: 15 }}

      />

    </>

  );

}

