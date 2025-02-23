import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-bold">ResumeAI</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="#features"
            className="transition-colors hover:text-primary"
          >
            Features
          </Link>
         
          <Link
            href="#pricing"
            className="transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="transition-colors hover:text-primary"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Link
              href="/sign-in"
              className="transition-colors hover:text-primary"
            >
              Sign In
            </Link>
          </Button>
          <Button size="sm" className="bg-primary">
          <Link
              href="/resumes"
              className="transition-colors hover:text-primary"
            >
              Try it Out
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
