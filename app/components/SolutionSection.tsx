"use client";

import { useEffect, useRef, useState } from "react";

const features = [
    {
        icon: "💬",
        title: "WhatsApp & SMS Delivery",
        description: "Meet workers where they are. No app downloads, no complex logins.",
        detail: "Instant delivery to 95% of workers who already use WhatsApp daily.",
    },
    {
        icon: "🎥",
        title: "Zero Literacy Barrier",
        description: "Audio, video, and voice reply support for all skill levels.",
        detail: "Workers can listen to content and respond with voice messages.",
    },
    {
        icon: "🤖",
        title: "24/7 AI Chatbot",
        description: "Instant doubt resolution anytime, in any language.",
        detail: "AI-powered assistant answers questions and provides guidance.",
    },
    {
        icon: "🔒",
        title: "Secure Knowledge Base",
        description: "Company-specific content that stays confidential.",
        detail: "Your SOPs, policies, and training materials in one secure place.",
    },
    {
        icon: "📈",
        title: "Real-time Analytics",
        description: "HR dashboards with completion rates and insights.",
        detail: "Track progress, identify gaps, and ensure compliance at scale.",
    },
    {
        icon: "🌍",
        title: "12+ Indian Languages",
        description: "Regional language support for maximum reach.",
        detail: "Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and more.",
    },
];

export default function SolutionSection() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    features.forEach((_, index) => {
                        setTimeout(() => {
                            setVisibleItems((prev) => [...prev, index]);
                        }, index * 100);
                    });
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="solution" ref={sectionRef} className="section bg-white">
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-teal-50 text-teal-600 text-sm font-medium rounded-full mb-4">
                        Our Solution
                    </span>
                    <h2 className="mb-4">
                        Training That <span className="text-gradient">Actually Works</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        AI-powered microlearning designed specifically for frontline workers in India.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`feature-card ${visibleItems.includes(index) ? "animate-fade-in-up" : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative z-10">
                                <div className="feature-icon">{feature.icon}</div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    {feature.description}
                                </p>

                                {/* Expanded Detail */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${hoveredIndex === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <p className="text-teal-600 text-sm font-medium pt-3 border-t border-slate-100">
                                        {feature.detail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Demo CTA */}
                <div className="mt-16 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100">
                        <div className="text-left">
                            <p className="text-slate-900 font-semibold text-lg">
                                See it in action
                            </p>
                            <p className="text-slate-600 text-sm">
                                Watch how a training module is delivered via WhatsApp
                            </p>
                        </div>
                        <a
                            href="#contact"
                            className="btn btn-primary whitespace-nowrap"
                        >
                            Request Demo
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
