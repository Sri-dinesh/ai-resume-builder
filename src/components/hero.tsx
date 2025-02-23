import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Resume Builder
          </span>
        </div>
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Create an Outstanding Resume
          <br />
          in Minutes with AI
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Stand out from the crowd with professionally crafted resumes. Our
          AI-powered platform helps you build ATS-friendly resumes tailored to
          your dream job.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" className="bg-primary">
          <Link href="/resumes">Build Your Resume</Link>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        {/* <Button variant="outline" size="lg">
          View Examples
        </Button> */}
      </div>
      <div className="relative mt-8 w-full max-w-5xl">
        <div className="relative rounded-lg border bg-background/50 shadow-2xl">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent" />
          <Image
            src="https://img.freepik.com/free-photo/resume-apply-work-form-concept_53876-148017.jpg?t=st=1740221483~exp=1740225083~hmac=1f1d4de341e05340af9e19e4fa8b4aa120a9e0f083b461f23428625a2767da5d&w=900"
            width={1200}
            height={600}
            alt="AI Resume Builder Interface"
            className="rounded-lg"
            priority
          />
        </div>
        {/* Decorative elements */}
        <div className="absolute -left-4 top-1/2 h-[200px] w-[200px] bg-primary/20 blur-[100px]" />
        <div className="absolute -right-4 top-1/2 h-[200px] w-[200px] bg-primary/20 blur-[100px]" />
      </div>
    </section>
  );
}
