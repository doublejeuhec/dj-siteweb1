import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promotions - DOUBLE JEU",
  description:
    "Découvrez les membres qui ont fait partie de notre troupe au fil des années",
};

export default function PromosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 
        In App Router, we can't use <Head> for preloading images.
        Next.js automatically optimizes images with the Image component.
        The priority, quality, and sizes attributes we added will help with performance.
      */}
      {children}
    </>
  );
}
