import { Metadata } from "next";
import PageTransitionWrapper from "@/components/ui/PageTransitionWrapper";
import ContactPage from "@/components/sections/ContactPage";
import { generatePageMetadata } from "@/app/metadata";

export const revalidate = 60;

export const metadata: Metadata = generatePageMetadata({
  title: "Contact — Corazor Technology",
  description: "Get in touch with Corazor Technology to build intelligent digital products powered by AI, ML, mobile, web, and blockchain.",
  path: "/contact",
});

export default function Page() {
  return (
    <PageTransitionWrapper>
      <ContactPage />
    </PageTransitionWrapper>
  );
}

