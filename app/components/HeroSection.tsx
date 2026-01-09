"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev < 3 ? prev + 1 : prev));
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const messages = [
        { type: "incoming", text: "📚 Today's Training: Safety Protocol Module 3", time: "10:30 AM" },
        { type: "incoming", text: "🎥 Watch this 2-min video and reply with your answer", time: "10:30 AM" },
        { type: "outgoing", text: "1", time: "10:32 AM" },
        { type: "incoming", text: "✅ Correct! You scored 100%. Certificate sent!", time: "10:32 AM" },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)`
                }} />
            </div>

            <div className="container relative z-10 py-24 md:py-32">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-6">
                            <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse-slow" />
                            🚀 Launching in 2025
                        </div>

                        {/* Headline */}
                        <h1 className="text-white mb-6">
                            <span className="text-gradient">AI-Powered</span> Microlearning for{" "}
                            <span className="text-gradient">Frontline Workers</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-xl leading-relaxed">
                            2-3 minute training modules delivered via{" "}
                            <span className="text-green-400 font-semibold">WhatsApp</span> &{" "}
                            <span className="text-blue-400 font-semibold">SMS</span> in 12+ Indian languages.
                            No app downloads. No literacy barriers.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <a href="#contact" className="btn btn-primary text-base">
                                Book a 7-day Pilot
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a href="#contact" className="btn btn-secondary text-white border-slate-600 hover:border-teal-500 hover:bg-teal-500/10">
                                Request Enterprise Demo
                            </a>
                        </div>

                        {/* Stats Pills */}
                        <div className="flex flex-wrap gap-3">
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">250M+</span>
                                <span className="text-slate-300">Workers</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">₹30,000+ Cr</span>
                                <span className="text-slate-300">Market</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">2-3 Min</span>
                                <span className="text-slate-300">Modules</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <div className={`flex justify-center lg:justify-end ${isVisible ? 'animate-slide-right stagger-2' : 'opacity-0'}`}>
                        <div className="phone-frame animate-float">
                            <div className="phone-screen">
                                <div className="phone-notch" />

                                {/* WhatsApp Header */}
                                <div className="whatsapp-header">
                                    <div className="whatsapp-avatar">ML</div>
                                    <div>
                                        <div className="whatsapp-name">Microlearning Training</div>
                                        <div className="whatsapp-status">online</div>
                                    </div>
                                </div>

                                {/* Chat Messages */}
                                <div className="whatsapp-chat">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`chat-bubble ${msg.type} ${idx <= messageIndex ? 'animate-message' : 'opacity-0'
                                                }`}
                                            style={{ animationDelay: `${idx * 0.3}s` }}
                                        >
                                            {msg.text}
                                            <div className="chat-time">{msg.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
