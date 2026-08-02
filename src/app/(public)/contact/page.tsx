"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  Sparkles,
  MessageSquare,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 sm:p-12 text-white shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium border border-white/20 mx-auto">
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>We&apos;re Here to Help</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Get in Touch with Us
        </h1>
        <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Have questions about equipment rentals, provider accounts, or platform
          support? Drop us a message and our team will respond promptly.
        </p>
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4 lg:col-span-1">
          <Card className="border-border shadow-sm rounded-3xl p-6 bg-card">
            <CardContent className="p-0 space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    Email Support
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Our support team is online 24/7.
                  </p>
                  <p className="text-sm font-medium text-primary pt-1">
                    support@gearrental.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    Phone Helpline
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Mon-Fri from 9am to 6pm.
                  </p>
                  <p className="text-sm font-medium text-primary pt-1">
                    +1 (555) 234-5678
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 shadow-inner">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    Headquarters
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Visit our main office.
                  </p>
                  <p className="text-sm font-medium text-foreground pt-1">
                    100 Innovation Drive, Suite 400
                    <br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-2 border-t border-border">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">
                    Response Time
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    We typically respond within
                  </p>
                  <p className="text-sm font-medium text-foreground pt-1">
                    2 to 4 business hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="border-border shadow-sm rounded-3xl overflow-hidden lg:col-span-2 bg-card">
          <CardHeader className="bg-muted/30 border-b border-border px-6 py-6 sm:px-8">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" /> Send Us a
              Message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we&apos;ll get back to your registered
              email.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl bg-background/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-11 rounded-xl bg-background/50 border-border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <Input
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-11 rounded-xl bg-background/50 border-border"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Type your message or inquiry here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="flex w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all shadow-xs resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-md transition-all gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending
                    Message...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
