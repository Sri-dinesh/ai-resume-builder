import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Ready to Build Your Perfect Resume?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Join thousands of job seekers who have successfully landed their dream
          jobs using our AI-powered resume builder.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link href="/resumes">Get Started</Link>
        </Button>
        {/* <p className="text-sm text-muted-foreground">No credit card required</p> */}
      </div>
    </section>
  );
}
