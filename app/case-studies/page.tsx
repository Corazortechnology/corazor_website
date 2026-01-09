import { Metadata } from "next";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import dynamic from "next/dynamic";
import { generatePageMetadata } from "@/app/metadata";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "Case Studies — Corazor Technology",
  description: "See how we delivered 35+ intelligent digital ecosystems across AI, healthcare, CSR, education, logistics, and enterprise tech.",
  path: "/case-studies",
});

// Dynamically import CaseStudiesPage to avoid SSR issues with R3F
const CaseStudiesPage = dynamic(() => import("@/components/sections/CaseStudiesPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0A0F24] flex items-center justify-center">
      <div className="text-[#0FDBB3] text-xl">Loading...</div>
    </div>
  ),
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <CaseStudiesPage />
    </PageTransitionWrapper>
  );
}

