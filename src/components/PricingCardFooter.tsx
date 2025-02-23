//// filepath: /c:/Users/ADMIN/Desktop/Development/Coding/ai-resume-builder/src/components/PricingCardFooter.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";

interface PricingCardFooterProps {
  cta: string;
}

export default function PricingCardFooter({ cta }: PricingCardFooterProps) {
  const { setOpen } = usePremiumModal();

  if (cta === "Start Free Trial") {
    return (
      <Link href="/billing" className="block w-full">
        <Button className="w-full">{cta}</Button>
      </Link>
    );
  }
  // For "Get Started" and "Contact Sales", open the modal
  return (
    <Button className="w-full text-black" onClick={() => setOpen(true)}>
      {cta}
    </Button>
  );
}
