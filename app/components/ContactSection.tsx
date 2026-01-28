"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import Container from "./ui/Container";
import Section from "./ui/Section";
import Button from "./ui/Button";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit form");
            }

            setStatus("success");
            setFormData({ name: "", email: "", message: "" });

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Section id="contact" className="bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.15) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.15) 0%, transparent 50%)`
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
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Ready to <span className="text-gradient">Transform</span> Your Training?
                        </h2>
                        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                            Book a 7-day pilot and see how AI-powered microlearning can revolutionize your frontline workforce training.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-6 h-6 text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Quick Response</h3>
                                    <p className="text-slate-400 text-sm">
                                        Our team will get back to you within 24 hours with personalized recommendations.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-6 h-6 text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">Custom Demo</h3>
                                    <p className="text-slate-400 text-sm">
                                        See how our platform works with your specific use case and industry.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-6 h-6 text-teal-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold mb-2">7-Day Pilot</h3>
                                    <p className="text-slate-400 text-sm">
                                        Experience the full power of microlearning with a risk-free trial.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                            <Mail className="w-5 h-5 text-teal-400" />
                            <a
                                href="mailto:hello@micro-learning.app"
                                className="text-teal-400 hover:text-teal-300 transition-colors"
                            >
                                hello@micro-learning.app
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Content - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                                    Your Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={status === "loading"}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="john@company.com"
                                    />
                                </div>
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                                    Message <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        disabled={status === "loading"}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Tell us about your training needs..."
                                    />
                                </div>
                            </div>

                            {/* Status Messages */}
                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                                >
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                                    <p className="text-emerald-300 text-sm">
                                        Thank you! We&apos;ve received your message and will respond within 24 hours.
                                    </p>
                                </motion.div>
                            )}

                            {status === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                                    <p className="text-red-300 text-sm">
                                        {errorMessage}
                                    </p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                disabled={status === "loading"}
                                className="w-full"
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
                                        Send Message
                                        <Send className="w-5 h-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
