import {
  Sparkles,
  Target,
  FileText,
  Layout,
  PenTool,
  Clock,
  CheckCircle,
  Palette,
} from "lucide-react";

const features = [
  {
    name: "AI-Powered Content Generation",
    description:
      "Transform your experience into compelling bullet points with our advanced AI technology.",
    icon: Sparkles,
  },
  {
    name: "ATS-Friendly Templates",
    description:
      "Ensure your resume gets past Applicant Tracking Systems with our optimized templates.",
    icon: CheckCircle,
  },
  {
    name: "Job-Specific Targeting",
    description:
      "Customize your resume for specific job descriptions with AI keyword optimization.",
    icon: Target,
  },
  {
    name: "Multiple Format Export",
    description:
      "Export your resume in PDF, Word, or plain text formats for any application requirement.",
    icon: FileText,
  },
  {
    name: "Smart Layout System",
    description:
      "Automatically organize your content with intelligent space management.",
    icon: Layout,
  },
  {
    name: "Real-Time Editing",
    description:
      "Edit and see changes in real-time with our interactive builder.",
    icon: PenTool,
  },
  {
    name: "Quick Generation",
    description: "Create a professional resume in less than 10 minutes.",
    icon: Clock,
  },
  {
    name: "Custom Styling",
    description:
      "Personalize colors, fonts, and layouts to match your personal brand.",
    icon: Palette,
  },
];

export default function Features() {
  return (
    <section className="container space-y-16 py-24 md:py-32" id="features">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Everything You Need for a Winning Resume
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Our AI-powered platform provides all the tools and features you need
          to create professional, ATS-friendly resumes that get you noticed.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.name}
            className="relative overflow-hidden rounded-lg border bg-background p-8"
          >
            <div className="flex flex-col gap-4">
              <feature.icon className="h-8 w-8 text-primary" />
              <h3 className="font-bold">{feature.name}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
