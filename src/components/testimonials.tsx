import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Thanks to this AI resume builder, I landed my dream job at a top tech company. The ATS-friendly templates and AI suggestions made all the difference.",
    author: "David Chen",
    title: "Software Engineer",
    company: "Tech Giant Corp",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "As a career coach, I recommend this platform to all my clients. The AI-powered content suggestions are spot-on and save hours of work.",
    author: "Sarah Thompson",
    title: "Career Coach",
    company: "Career Accelerator",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The resume I created got me interviews at multiple Fortune 500 companies. The AI helped me highlight my achievements perfectly.",
    author: "James Wilson",
    title: "Marketing Director",
    company: "Global Brands Inc",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="container space-y-16 py-24 md:py-32" id="testimonials">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Trusted by Industry Leaders</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          See what our clients have to say about their experience with Amane Soft.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, i) => (
          <Card key={i} className="relative overflow-hidden">
            <CardContent className="space-y-4 p-6">
              <Quote className="h-8 w-8 text-primary/20" />
              <p className="text-lg">{testimonial.quote}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title}, {testimonial.company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

