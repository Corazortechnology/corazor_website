import { Metadata } from "next";

export const siteConfig = {
  name: "Corazor Technology",
  description: "Where Innovation Meets Execution. Building intelligent, scalable digital ecosystems powered by AI, Web, App & Blockchain.",
  url: "https://corazor.com",
  ogImage: "/og-image.jpg",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI development",
    "Machine Learning",
    "Web Development",
    "App Development",
    "Blockchain",
    "Digital Transformation",
    "Enterprise Software",
    "Custom Software Development",
  ],
  authors: [{ name: "Corazor Technology" }],
  creator: "Corazor Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
  },
};

export function generatePageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description,
      url: `${siteConfig.url}${path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}${path}`,
    },
  };
}

