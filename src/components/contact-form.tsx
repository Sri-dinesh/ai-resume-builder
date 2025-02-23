"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const target = e.currentTarget;
    if (!(target instanceof HTMLFormElement)) {
      console.error("Unexpected event target type");
      setStatus("error");
      return;
    }

    // Use FormData to extract form values
    const formData = new FormData(target);
    const data = {
      firstName: formData.get("first-name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      company: formData.get("company"),
      // interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setStatus("success");
        target.reset(); // Safe to call reset here
        // setInterestValue("");
      } else {
        console.error("Error response:", json.error);
        setStatus("error");
      }
    } catch (error) {
      console.error("Client side error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    name="first-name"
                    placeholder="Enter your first name"
                  required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    name="last-name"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                />
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="interest">Interest</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your area of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume-builder" onClick={() => {}}>
                      Resume Builder
                    </SelectItem>
                    <SelectItem value="cover-letter" onClick={() => {}}>
                      Cover Letter Service
                    </SelectItem>
                    <SelectItem value="career-coaching" onClick={() => {}}>
                      Career Coaching
                    </SelectItem>
                    <SelectItem value="enterprise" onClick={() => {}}>
                      Enterprise Solutions
                    </SelectItem>
                    <SelectItem value="other" onClick={() => {}}>
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                To capture the value from the Select,
                    you might want to add a hidden input or use a controlled component.
                    For simplicity, you can add a hidden input that gets updated with the select value 
                <input type="hidden" name="interest" />
              </div> */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your project and requirements..."
                  className="min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {status === "success" && (
                <p className="text-green-600">Your message has been sent.</p>
              )}
              {status === "error" && (
                <p className="text-red-600">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
