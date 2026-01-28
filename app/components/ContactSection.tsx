"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Handshake, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import Container from "./ui/Container";
import Section from "./ui/Section";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        workerCount: "",
        phone: "",
        industry: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        // Create message from form data
        const message = `Company: ${formData.company}
Worker Count: ${formData.workerCount}
Phone: ${formData.phone}
Industry: ${formData.industry}

Request for pilot proposal.`;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit form");
            }

            setStatus("success");
            setFormData({ 
                name: "", 
                email: "", 
                company: "",
                workerCount: "",
                phone: "",
                industry: "",
            });

            // Reset success state after 5 seconds
            setTimeout(() => {
                setStatus("idle");
            }, 5000);
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
            
            // Reset error state after 5 seconds
            setTimeout(() => {
                setStatus("idle");
                setErrorMessage("");
            }, 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Section id="contact" className="bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.3) 0%, transparent 50%)`
                }} />
            </div>

            <Container className="relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block mb-6">
                            <span className="px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium border border-amber-200">
                                Partner With Us
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Ready to <span className="text-gradient">Transform</span> Your Workforce?
                        </h2>
                        <p className="text-slate-600 text-lg mb-12 leading-relaxed">
                            Join the pilot program and see the difference AI-powered microlearning can make for your frontline teams.
                        </p>

                        <div className="space-y-6 mb-12">
                            <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                                    <Target className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold text-lg mb-2">7-Day Free Pilot</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Free validation with your real workers and content
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shrink-0">
                                    <Handshake className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-slate-900 font-bold text-lg mb-2">Strategic Partnerships</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        Seeking mentorship & pilot partnerships
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl p-8 text-center">
                            <p className="text-slate-400 text-sm mb-3">Prefer to reach out directly?</p>
                            <a
                                href="mailto:hello@micro-learning.app"
                                className="inline-flex items-center gap-2 text-white text-lg font-semibold hover:text-teal-400 transition-colors"
                            >
                                <span>✉️</span>
                                hello@micro-learning.app
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Content - Detailed Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-slate-200"
                    >
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                            Get Your Pilot Proposal
                        </h3>
                        <p className="text-slate-600 mb-8">
                            Fill in the details and we&apos;ll get back within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name and Email Row */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                        Work Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>

                            {/* Company Name */}
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Your company"
                                />
                            </div>

                            {/* Worker Count and Phone Row */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="workerCount" className="block text-sm font-medium text-slate-700 mb-2">
                                        Worker Count
                                    </label>
                                    <select
                                        id="workerCount"
                                        name="workerCount"
                                        value={formData.workerCount}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                            backgroundPosition: 'right 0.5rem center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '1.5em 1.5em',
                                            paddingRight: '2.5rem',
                                        }}
                                    >
                                        <option value="">Select range</option>
                                        <option value="1-50">1-50</option>
                                        <option value="51-200">51-200</option>
                                        <option value="201-500">201-500</option>
                                        <option value="501-1000">501-1000</option>
                                        <option value="1000+">1000+</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={status === "loading"}
                                        className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>

                            {/* Industry */}
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-2">
                                    Industry
                                </label>
                                <select
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    disabled={status === "loading"}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                        backgroundPosition: 'right 0.5rem center',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: '1.5em 1.5em',
                                        paddingRight: '2.5rem',
                                    }}
                                >
                                    <option value="">Select industry</option>
                                    <option value="Retail">Retail</option>
                                    <option value="Hospitality">Hospitality</option>
                                    <option value="Manufacturing">Manufacturing</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Logistics">Logistics</option>
                                    <option value="Food & Beverage">Food & Beverage</option>
                                    <option value="Construction">Construction</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Status Messages */}
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
                                >
                                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <p className="text-emerald-800 text-sm">
                                        Thank you! We&apos;ve received your request and will respond within 24 hours with a personalized pilot proposal.
                                    </p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-red-800 text-sm">
                                        {errorMessage}
                                    </p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30"
                            >
                                {status === "loading" ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Get Pilot Proposal
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Privacy Notice */}
                            <p className="text-xs text-slate-500 text-center">
                                By submitting, you agree to our{" "}
                                <a href="/legal/privacy" className="text-teal-600 hover:text-teal-700 underline">
                                    Privacy Policy
                                </a>{" "}
                                and{" "}
                                <a href="/legal/terms" className="text-teal-600 hover:text-teal-700 underline">
                                    Terms of Service
                                </a>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
