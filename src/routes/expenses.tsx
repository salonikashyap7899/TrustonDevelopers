import { createFileRoute } from "@tanstack/react-router";
import { PlotTracker } from "@/components/PlotTracker";
import { WealthCalculator } from "@/components/WealthCalculator";
import { GallerySection } from "@/components/GallerySection";
import { InnerHero } from "@/components/InnerHero";
import lucknowAerialImg from "@/assets/lucknow-aerial.jpg";

export const Route = createFileRoute("/expenses")({
  head: () => ({
    meta: [
      { title: "Expenses — TrustOn" },
      {
        name: "description",
        content: "Explore TrustOn's transparent cost structures and expenses. Every detail, captured.",
      },
    ],
  }),
  component: ExpensesPage,
});

function ExpensesPage() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <InnerHero
        eyebrow="TrustOn"
        title={<span>Expenses</span>}
        subtitle="Transparent costs, zero hidden charges. Experience clarity in every rupee."
        poster={lucknowAerialImg}
        alt="Luxury lifestyle interior"
      />

      <div className="py-12">
        <PlotTracker />
      </div>

      <GallerySection />

      <div className="py-12">
        <WealthCalculator />
      </div>
    </div>
  );
}
