"use client";

import { useEffect, useRef, useState } from "react";

const projections = [
    { year: "Year 1", value: "₹2.5 Cr", milestone: "Pilot phase complete" },
    { year: "Year 2", value: "₹12 Cr", milestone: "Enterprise expansion" },
    { year: "Year 3", value: "₹35 Cr", milestone: "Market leadership" },
];

export default function BusinessModelSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
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
        <section
            id="pricing"
            ref={sectionRef}
            className="section bg-slate-900"
        >
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-teal-500/10 text-teal-400 text-sm font-medium rounded-full mb-4">
                        Business Model
                    </span>
                    <h2 className="text-white mb-4">
                        Simple, <span className="text-gradient">Scalable</span> Pricing
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Transparent pricing designed for enterprises of all sizes.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                    {/* Subscription Card */}
                    <div
                        className={`bg-slate-800 border border-slate-700 rounded-2xl p-8 ${isVisible ? "animate-fade-in-up" : "opacity-0"
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-lg">Per Worker Subscription</h4>
                                <p className="text-slate-400 text-sm">Monthly recurring</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">₹49</span>
                                <span className="text-slate-400">-</span>
                                <span className="text-4xl font-bold text-white">₹99</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-1">per worker / month</p>
                        </div>

                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Unlimited training modules
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                WhatsApp & SMS delivery
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                AI chatbot support
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Real-time analytics dashboard
                            </li>
                        </ul>
                    </div>

                    {/* Enterprise Onboarding Card */}
                    <div
                        className={`bg-slate-800 border border-slate-700 rounded-2xl p-8 ${isVisible ? "animate-fade-in-up stagger-2" : "opacity-0"
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold text-lg">Enterprise Onboarding</h4>
                                <p className="text-slate-400 text-sm">One-time setup</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-white">₹5L</span>
                                <span className="text-slate-400">-</span>
                                <span className="text-4xl font-bold text-white">₹15L</span>
                            </div>
                            <p className="text-slate-400 text-sm mt-1">one-time fee</p>
                        </div>

                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Custom content development
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Knowledge base setup
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Multi-language translation
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Dedicated implementation support
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Revenue Projections */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-white text-xl font-semibold text-center mb-8">
                        Revenue Projections
                    </h3>

                    <div className="timeline">
                        {projections.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-item ${isVisible ? "animate-scale-in" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                            >
                                <div className="timeline-dot" />
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-value">{item.value}</div>
                                <p className="text-slate-400 text-sm mt-1">{item.milestone}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
