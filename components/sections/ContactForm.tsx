"use client";

import { useEffect } from "react";

import gsap from "gsap";



export default function ContactForm() {

  useEffect(() => {

    gsap.from(".contact-input", {

      opacity: 0,

      y: 30,

      duration: 0.8,

      stagger: 0.1,

      ease: "power3.out",

    });

  }, []);



  return (

    <section className="py-32 px-12 bg-[#0A0F24] text-white">

      <h2 className="text-5xl font-bold mb-10">Let's Build Something Intelligent</h2>



      <form className="max-w-2xl flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>

        <input 

          type="text" 

          className="contact-input p-4 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 focus:border-[#0FDBB3] focus:outline-none text-white placeholder-gray-400 transition-colors" 

          placeholder="Your Name" 

          required

        />

        <input 

          type="email" 

          className="contact-input p-4 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 focus:border-[#0FDBB3] focus:outline-none text-white placeholder-gray-400 transition-colors" 

          placeholder="Email" 

          required

        />

        <input 

          type="tel" 

          className="contact-input p-4 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 focus:border-[#0FDBB3] focus:outline-none text-white placeholder-gray-400 transition-colors" 

          placeholder="Phone" 

        />

        <textarea 

          className="contact-input p-4 rounded-xl bg-[#11172B] border border-[#0FDBB3]/20 focus:border-[#0FDBB3] focus:outline-none text-white placeholder-gray-400 transition-colors resize-none" 

          rows={4} 

          placeholder="Project Details"

          required

        ></textarea>



        <button 

          type="submit"

          className="contact-input p-4 bg-[#0FDBB3] text-black font-bold rounded-xl magnetic hover:bg-[#0bc99d] transition-colors cursor-pointer"

        >

          Submit Inquiry

        </button>

      </form>

    </section>

  );

}

