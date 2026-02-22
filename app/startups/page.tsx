import type { Metadata } from "next";
import BrandsClient from "@/components/brands/BrandsClient";

export const metadata: Metadata = {
  title: "Startups - William Armstrong | Mod Brew, Happy Mile, Drifters, Club Pack",
  description:
    "Explore William Armstrong's entrepreneurial ventures and startups: Mod Brew coffee pop-up, Happy Mile running club, Drifters outdoor apparel, and Club Pack student organization platform.",
  alternates: { canonical: "/startups" },
};

const Startups = () => {
  return <BrandsClient />;
};

export default Startups;
