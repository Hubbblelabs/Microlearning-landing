"use client";

import { useState } from "react";
import { Target, Handshake, Check, Mail, ArrowRight, Loader2 } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { ScrollReveal } from "./animations/ScrollAnimations";

const trustPoints = [
    {
        icon: <Target className="w-6 h-6" />,
        title: "7-Day Free Pilot",
        description: "Free validation with your real workers and content",
    },
    {
        icon: <Handshake className="w-6 h-6" />,
        title: "Strategic Partnerships",
        description: "Seeking mentorship & pilot partnerships",
    },
];

const industries = [
    "Manufacturing",
    "Logistics & Warehousing",
    "Quick Service Restaurants",
    "Retail",
    "Healthcare",
    "Construction",
    "Field Services",
    "Other",
];

const workerCounts = [
    "50 - 500",
    "500 - 2,000",
    "2,000 - 10,000",
    "10,000+",
];

export default function TrustSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        workerCount: "",
        phone: "",
        industry: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after showing success
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                company: "",
                workerCount: "",
                phone: "",
                industry: "",
            });
            setIsSubmitted(false);
        }, 3000);
    };

    return (
        <Section id="contact" spacing="xl" className="bg-gradient-to-b from-slate-50 to-white">
            <Container>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left - Trust Points */}
                    <div>
                        <ScrollReveal direction="right">
                            <Badge variant="warning" size="md" className="mb-4 bg-amber-50 text-amber-700 border-amber-200">
                                Partner With Us
                            </Badge>
                            <h2 className="mb-6 text-slate-900">
                                Ready to <span className="text-gradient">Transform</span> Your Workforce?
                            </h2>
                            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                                Join the pilot program and see the difference AI-powered microlearning
                                can make for your frontline teams.
                            </p>

                            {/* Trust Points */}
                            <div className="space-y-4 mb-10">
                                {trustPoints.map((point, index) => (
                                    <ScrollReveal key={index} direction="right" delay={0.1 * index}>
                                        <Card hover={false} className="group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-teal-600 shrink-0 group-hover:scale-110 transition-transform duration-[var(--transition-base)]">
                                                    {point.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-slate-900 mb-1">{point.title}</h4>
                                                    <p className="text-slate-600 text-sm">{point.description}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </ScrollReveal>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <div className="p-6 bg-slate-900 rounded-2xl">
                                <p className="text-slate-300 text-sm mb-4">
                                    Prefer to reach out directly?
                                </p>
                                <a
                                    href="mailto:hello@micro-learning.app"
                                    className="inline-flex items-center gap-2 text-white font-semibold text-lg hover:text-teal-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
                                >
                                    <Mail className="w-5 h-5" />
                                    hello@micro-learning.app
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Right - Lead Capture Form */}
                    <ScrollReveal direction="left">
                        <Card variant="elevated" hover={false} className="shadow-[var(--shadow-2xl)]">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                Get Your Pilot Proposal
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Fill in the details and we'll get back within 24 hours.
                            </p>

                            {isSubmitted ? (
                                <div className="text-center py-12">
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
                                        <Check className="w-10 h-10 text-teal-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-2">
                                        Thank you!
                                    </h4>
                                    <p className="text-slate-600 text-lg">
                                        We'll send your pilot proposal within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">
                                                Work Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="you@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="company" className="form-label">
                                            Company Name
                                        </label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="form-input"
                                            placeholder="Your company"
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="form-group">
                                            <label htmlFor="workerCount" className="form-label">
                                                Worker Count
                                            </label>
                                            <select
                                                id="workerCount"
                                                name="workerCount"
                                                value={formData.workerCount}
                                                onChange={handleChange}
                                                className="form-select"
                                            >
                                                <option value="">Select range</option>
                                                {workerCounts.map((count) => (
                                                    <option key={count} value={count}>
                                                        {count}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="form-input"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="industry" className="form-label">
                                            Industry
                                        </label>
                                        <select
                                            id="industry"
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            className="form-select"
                                        >
                                            <option value="">Select industry</option>
                                            {industries.map((industry) => (
                                                <option key={industry} value={industry}>
                                                    {industry}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        variant="primary"
                                        size="lg"
                                        className="w-full mt-6"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                Get Pilot Proposal
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-slate-500 text-xs text-center mt-4">
                                        By submitting, you agree to our{" "}
                                        <a href="#" className="text-teal-600 hover:underline">
                                            Privacy Policy
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-teal-600 hover:underline">
                                            Terms of Service
                                        </a>
                                    </p>
                                </form>
                            )}
                        </Card>
                    </ScrollReveal>
                </div>
            </Container>
        </Section>
    );
}
