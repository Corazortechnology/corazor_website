import { Metadata } from "next";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import ServicesPage from "@/components/sections/ServicesPage";
import { generatePageMetadata } from "@/app/metadata";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "Services — Corazor Technology",
  description: "Explore our AI, Web, App, and Blockchain development services designed for modern, scalable digital products.",
  path: "/services",
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <ServicesPage />
    </PageTransitionWrapper>
  );
}

