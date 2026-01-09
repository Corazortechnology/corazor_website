import { Metadata } from "next";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import HomePage from "@/components/sections/HomePage";
import { generatePageMetadata } from "@/app/metadata";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "Corazor Technology — AI, Web, App, Blockchain Engineering",
  description: "We build intelligent, scalable digital ecosystems for startups and enterprises using AI, Web, App, and Blockchain.",
  path: "/",
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <HomePage />
    </PageTransitionWrapper>
  );
}

