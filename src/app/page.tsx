// import logo from "@/images/logo.png";
// import resumePreview from "@/images/resume-preview.jpg";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
//       <div className="max-w-prose space-y-3">
//         <Image
//           src={logo}
//           alt="Logo"
//           width={150}
//           height={150}
//           className="mx-auto md:ms-0"
//         />
//         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//           Create the{" "}
//           <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
//             Perfect Resume
//           </span>{" "}
//           in Minutes
//         </h1>
//         <p className="text-lg text-gray-500">
//           Our <span className="font-bold">AI resume builder</span> helps you
//           design a professional resume, even if you&apos;re not very smart.
//         </p>
//         <Button asChild size="lg" variant="premium">
//           <Link href="/resumes">Get Started</Link>
//         </Button>
//       </div>
//       <div>
//         <Image
//           src={resumePreview}
//           alt="Resume preview"
//           width={600}
//           className="shadow-md lg:rotate-[1.5deg]"
//         />
//       </div>
//     </main>
//   );
// }

import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import ContactForm from "@/components/contact-form";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <Navbar />
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <ContactForm />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}
