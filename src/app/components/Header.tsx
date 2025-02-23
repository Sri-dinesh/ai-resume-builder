import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white px-6 py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          StreamLine
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="#features" className="text-gray-600 hover:text-primary">
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-600 hover:text-primary"
          >
            Testimonials
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-primary">
            Pricing
          </Link>
        </nav>
        <Button>Get Started</Button>
      </div>
    </header>
  );
}
