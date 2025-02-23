// import { Check } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import PremiumModal from "@/components/premium/PremiumModal";
// import PricingCardFooter from "./PricingCardFooter";

// interface PricingCardFooterProps {
//   tier: {
//     name: string;
//     id: string;
//     price: string;
//     description: string;
//     features: string[];
//     cta: string;
//   };
// }

// const tiers = [
//   {
//     name: "Free",
//     id: "tier-free",
//     price: "$0",
//     description: "Perfect for trying out our platform.",
//     features: [
//       "1 Resume Template",
//       "Basic AI Writing Assistance",
//       "PDF Export",
//       "ATS-Friendly Format",
//       "24-hour Support",
//     ],
//     cta: "Get Started",
//   },
//   {
//     name: "Premium",
//     id: "tier-pro",
//     price: "$9.99",
//     description: "Best for job seekers and professionals.",
//     features: [
//       "All Free Features",
//       "20+ Premium Templates",
//       "Advanced AI Content Generation",
//       "Multiple Resume Versions",
//       "Cover Letter Builder",
//       "Priority Support",
//       "LinkedIn Profile Optimization",
//     ],
//     cta: "Start Free Trial",
//     // featured: true,
//   },
//   {
//     name: "Premium Plus",
//     id: "tier-enterprise",
//     price: "$19.99",
//     description: "For organizations and career services.",
//     features: [
//       "All Pro Features",
//       "Custom Branded Templates",
//       "Team Management",
//       "API Access",
//       "Bulk Resume Generation",
//       "Advanced Analytics",
//       "Dedicated Account Manager",
//       "Custom Integration",
//     ],
//     cta: "Contact Sales",
//   },
// ];

// export default function Pricing() {
//   return (
//     <section id="pricing" className="container space-y-16 py-24 md:py-32">
//       <div className="mx-auto max-w-[58rem] text-center">
//         <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
//           Simple, Transparent Pricing
//         </h2>
//         <p className="mt-4 text-muted-foreground sm:text-lg">
//           Choose the perfect plan for your need.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
//         {tiers.map((tier, index) => (
//           <Card
//             key={tier.id}
//             className={`flex flex-col ${
//               tier.features
//                 ? "relative scale-105 border-primary shadow-lg before:absolute before:inset-0 before:scale-105 before:rounded-lg before:border before:border-primary before:opacity-10"
//                 : ""
//             }`}
//           >
//             {tier.features && (
//               <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
//                 Popular
//               </div>
//             )}
//             <CardHeader>
//               <CardTitle>{tier.name}</CardTitle>
//               <CardDescription>{tier.description}</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-1">
//               <div className="mb-4">
//                 <span className="text-4xl font-bold">{tier.price}</span>
//                 {tier.price !== "Custom" && (
//                   <span className="text-muted-foreground">/month</span>
//                 )}
//               </div>
//               <ul className="space-y-2 text-sm">
//                 {tier.features.map((feature) => (
//                   <li key={feature} className="flex items-center gap-2">
//                     <Check className="h-4 w-4 text-primary" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <PricingCardFooter cta={tier.cta} />
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       {/* Include the PremiumModal so it can be rendered/popped-up */}
//       <PremiumModal />
//     </section>
//   );
// }

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PremiumModal from "@/components/premium/PremiumModal";
import PricingCardFooter from "./PricingCardFooter";

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "$0",
    description: "Perfect for trying out our platform.",
    features: [
      "1 Resume Template",
      "Basic AI Writing Assistance",
      "PDF Export",
      "ATS-Friendly Format",
      "24-hour Support",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    id: "tier-pro",
    price: "$9.99",
    description: "Best for job seekers and professionals.",
    features: [
      "All Free Features",
      "20+ Premium Templates",
      "Advanced AI Content Generation",
      "Multiple Resume Versions",
      "Cover Letter Builder",
      "Priority Support",
      "LinkedIn Profile Optimization",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Premium Plus",
    id: "tier-enterprise",
    price: "$19.99",
    description: "For organizations and career services.",
    features: [
      "All Pro Features",
      "Custom Branded Templates",
      "Team Management",
      "API Access",
      "Bulk Resume Generation",
      "Advanced Analytics",
      "Dedicated Account Manager",
      "Custom Integration",
    ],
    cta: "Contact Sales",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Choose the perfect plan for your need.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <Card key={tier.id} className="rounded-lg p-8 shadow-md">
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.price !== "Custom" && (
                  <span className="text-muted-foreground">/month</span>
                )}
              </div>
              <ul className="space-y-2 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <PricingCardFooter cta={tier.cta} />
            </CardFooter>
          </Card>
        ))}
      </div>
      <PremiumModal />
    </section>
  );
}
