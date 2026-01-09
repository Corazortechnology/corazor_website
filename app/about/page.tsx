import { Metadata } from "next";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import AboutPage from "@/components/sections/AboutPage";
import { generatePageMetadata } from "@/app/metadata";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "About Us — Corazor Technology",
  description: "Driven by innovation, powered by execution. Learn about Corazor Technology's mission, vision, and engineering culture.",
  path: "/about",
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <AboutPage />
    </PageTransitionWrapper>
  );
}

