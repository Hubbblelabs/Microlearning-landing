"use client";

import { useState, useRef, useEffect } from "react";
import { Target, CircleDollarSign, Handshake, Check } from "lucide-react";

const trustPoints = [
    {
        icon: <Target className="w-6 h-6 text-teal-600" />,
        title: "7-day Pilot",
        description: "Free validation with your real workers and content",
    },
    {
        icon: <CircleDollarSign className="w-6 h-6 text-teal-600" />,
        title: "₹75L Seed Round",
        description: "Raising funds to scale operations nationally",
    },
    {
        icon: <Handshake className="w-6 h-6 text-teal-600" />,
        title: "Partnerships",
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
    const [isVisible, setIsVisible] = useState(false);
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
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
        }, 2000);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="section bg-gradient-to-b from-slate-50 to-white"
        >
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left - Trust Points */}
                    <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
                        <span className="inline-block px-4 py-1.5 bg-amber-50 text-amber-600 text-sm font-medium rounded-full mb-4">
                            Partner With Us
                        </span>
                        <h2 className="mb-6">
                            Ready to <span className="text-gradient">Transform</span> Your Workforce?
                        </h2>
                        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                            Join the pilot program and see the difference AI-powered microlearning
                            can make for your frontline teams.
                        </p>

                        {/* Trust Points */}
                        <div className="space-y-4 mb-10">
                            {trustPoints.map((point, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl ${isVisible ? "animate-fade-in-up" : "opacity-0"
                                        }`}
                                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-2xl shrink-0">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{point.title}</h4>
                                        <p className="text-slate-600 text-sm">{point.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="p-6 bg-slate-900 rounded-2xl">
                            <p className="text-slate-300 text-sm mb-4">
                                Prefer to reach out directly?
                            </p>
                            <a
                                href="mailto:hello@micro-learning.app"
                                className="text-white font-semibold text-lg hover:text-teal-400 transition-colors"
                            >
                                hello@micro-learning.app
                            </a>
                        </div>
                    </div>

                    {/* Right - Lead Capture Form */}
                    <div
                        className={`bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xl ${isVisible ? "animate-slide-right stagger-2" : "opacity-0"
                            }`}
                    >
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Get Your Pilot Proposal
                        </h3>
                        <p className="text-slate-600 text-sm mb-6">
                            Fill in the details and we&apos;ll get back within 24 hours.
                        </p>

                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                                    <Check className="w-8 h-8 text-teal-600" />
                                </div>
                                <h4 className="text-xl font-semibold text-slate-900 mb-2">
                                    Thank you!
                                </h4>
                                <p className="text-slate-600">
                                    We&apos;ll send your pilot proposal within 24 hours.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
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

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn btn-primary w-full mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Get Pilot Proposal
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </>
                                    )}
                                </button>

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
                    </div>
                </div>
            </div>
        </section>
    );
}
