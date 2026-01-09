"use client";

import { motion } from "framer-motion";
import { BookOpen, Video, CheckCircle2, Rocket, Shield, Zap, Users } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { ScrollReveal } from "./animations/ScrollAnimations";

export default function HeroSection() {
    const messages = [
        { 
            type: "incoming", 
            text: "Today's Training: Safety Protocol Module 3", 
            time: "10:30 AM", 
            icon: <BookOpen className="w-4 h-4 inline-block mr-2 text-teal-400" /> 
        },
        { 
            type: "incoming", 
            text: "Watch this 2-min video and reply with your answer", 
            time: "10:30 AM", 
            icon: <Video className="w-4 h-4 inline-block mr-2 text-teal-400" /> 
        },
        { 
            type: "outgoing", 
            text: "1", 
            time: "10:32 AM" 
        },
        { 
            type: "incoming", 
            text: "Correct! You scored 100%. Certificate sent!", 
            time: "10:32 AM", 
            icon: <CheckCircle2 className="w-4 h-4 inline-block mr-2 text-emerald-400" /> 
        },
    ];

    const trustSignals = [
        { icon: <Shield className="w-4 h-4" />, text: "ISO 27001 Compliant" },
        { icon: <Zap className="w-4 h-4" />, text: "99.9% Uptime SLA" },
        { icon: <Users className="w-4 h-4" />, text: "250M+ Workers Reach" },
    ];

    return (
        <Section spacing="none" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Background Pattern - Professional, Subtle */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)`
                }} />
                {/* Grid Pattern */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px'
                }} />
            </div>

            <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content - Value Proposition */}
                    <div className="max-w-2xl">
                        {/* Launch Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                <Rocket className="w-4 h-4" />
                                Launching in 2025
                            </Badge>
                        </motion.div>

                        {/* Headline - Clear, Concise Value */}
                        <motion.h1 
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
                        >
                            <span className="text-gradient">AI-Powered</span> Training for{" "}
                            <span className="text-gradient">Frontline Workers</span>
                        </motion.h1>

                        {/* Value Prop - Digestible in < 5s */}
                        <motion.p 
                            className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
                        >
                            2-3 minute training modules delivered via{" "}
                            <span className="text-green-400 font-semibold">WhatsApp</span> &{" "}
                            <span className="text-blue-400 font-semibold">SMS</span> in 12+ Indian languages.
                            <br />
                            <span className="text-white font-medium">No app downloads. No literacy barriers.</span>
                        </motion.p>

                        {/* CTAs - Clear Hierarchy */}
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0, 0, 0.2, 1] }}
                        >
                            <Button 
                                variant="primary" 
                                size="lg"
                                onClick={() => window.location.href = '#contact'}
                                className="group"
                            >
                                Book a 7-Day Pilot
                                <motion.svg 
                                    className="w-5 h-5" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </Button>
                            <Button 
                                variant="outline" 
                                size="lg"
                                onClick={() => window.location.href = '#contact'}
                            >
                                Request Demo
                            </Button>
                        </motion.div>

                        {/* Stats - Social Proof */}
                        <motion.div 
                            className="flex flex-wrap gap-3 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
                        >
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">250M+</span>
                                <span className="text-slate-300 text-sm">Workers</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">₹30K Cr</span>
                                <span className="text-slate-300 text-sm">Market</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">2-3 Min</span>
                                <span className="text-slate-300 text-sm">Modules</span>
                            </div>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div 
                            className="flex flex-wrap gap-4 pt-6 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: [0, 0, 0.2, 1] }}
                        >
                            {trustSignals.map((signal, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                                    <div className="text-teal-400">{signal.icon}</div>
                                    <span>{signal.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Content - Product Demo (Phone Mockup) */}
                    <motion.div 
                        className="flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
                    >
                        <motion.div 
                            className="phone-frame"
                            animate={{ 
                                y: [0, -12, 0],
                            }}
                            transition={{ 
                                duration: 6, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
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
                                    {messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: msg.type === 'incoming' ? -20 : 20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            transition={{ 
                                                duration: 0.4, 
                                                delay: 0.6 + (index * 0.3),
                                                ease: [0, 0, 0.2, 1]
                                            }}
                                            className={`chat-bubble ${msg.type}`}
                                        >
                                            <div>
                                                {msg.icon}
                                                {msg.text}
                                            </div>
                                            <div className="chat-time">{msg.time}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
