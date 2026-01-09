"use client";

import { useEffect } from "react";



export default function MagneticCursor() {

  useEffect(() => {

    const cursor = document.createElement("div");

    cursor.id = "magneticCursor";

    cursor.style.position = "fixed";

    cursor.style.width = "30px";

    cursor.style.height = "30px";

    cursor.style.borderRadius = "999px";

    cursor.style.background = "#0FDBB3";

    cursor.style.opacity = "0.4";

    cursor.style.pointerEvents = "none";

    cursor.style.transition = "transform 0.15s";

    cursor.style.zIndex = "99999";

    document.body.appendChild(cursor);



    let isHovering = false;
    let currentX = 0;
    let currentY = 0;

    const updateTransform = () => {

      const scale = isHovering ? 2 : 1;

      cursor.style.transform = `translate(${currentX - 15}px, ${currentY - 15}px) scale(${scale})`;

    };



    const handleMouseMove = (e: MouseEvent) => {

      currentX = e.clientX;

      currentY = e.clientY;

      updateTransform();

    };



    const handleMagneticEnter = () => {

      isHovering = true;

      updateTransform();

    };



    const handleMagneticLeave = () => {

      isHovering = false;

      updateTransform();

    };



    document.addEventListener("mousemove", handleMouseMove);



    const magneticElements = document.querySelectorAll(".magnetic");

    magneticElements.forEach((el) => {

      el.addEventListener("mouseenter", handleMagneticEnter);

      el.addEventListener("mouseleave", handleMagneticLeave);

    });



    // Cleanup

    return () => {

      document.removeEventListener("mousemove", handleMouseMove);

      magneticElements.forEach((el) => {

        el.removeEventListener("mouseenter", handleMagneticEnter);

        el.removeEventListener("mouseleave", handleMagneticLeave);

      });

      if (cursor.parentNode) {

        cursor.parentNode.removeChild(cursor);

      }

    };

  }, []);



  return null;

}

