"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Shield, Zap, Users, Play, ArrowRight, CheckCircle2 } from "lucide-react";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { MagneticWrapper } from "./animations/Interactions3D";
import PhoneMockup from "./PhoneMockup";
import { platforms } from "@/constants/platforms";

// Floating particles component
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-teal-500/30 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Animated text with stagger
function AnimatedHeadline() {
    const words = ["Upskill", "teams", "in"];
    const highlightWords = ["2 minutes a day"];

    return (
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
            <span className="block">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 40, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.1 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </span>
            <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="block mt-2"
            >
                <span className="relative inline-block">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 animate-gradient-shift">
                        2 minutes a day
                    </span>
                    {/* Underline decoration */}
                    <motion.svg
                        className="absolute -bottom-2 left-0 w-full h-3"
                        viewBox="0 0 200 12"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    >
                        <motion.path
                            d="M2 8 Q50 2, 100 8 T198 8"
                            fill="none"
                            stroke="url(#underline-gradient)"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                        />
                        <defs>
                            <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#2dd4bf" />
                                <stop offset="50%" stopColor="#34d399" />
                                <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                        </defs>
                    </motion.svg>
                </span>
            </motion.span>
        </motion.h1>
    );
}

// Animated counter
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(timer);
    }, [value]);

    return <span>{count}{suffix}</span>;
}

// 3D Tilt card for stats
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-50, 50], [10, -10]);
    const rotateY = useTransform(x, [-50, 50], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group cursor-default"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-6 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 group-hover:border-teal-500/30 transition-colors">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-slate-400 text-sm font-medium">{label}</div>
            </div>
        </motion.div>
    );
}

export default function HeroSection() {
    const [activePlatformIndex, setActivePlatformIndex] = useState(0);
    const activePlatform = platforms[activePlatformIndex];
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const trustSignals = [
        { icon: <Shield className="w-4 h-4" />, text: "ISO 27001 Compliant" },
        { icon: <Zap className="w-4 h-4" />, text: "99.9% Uptime SLA" },
        { icon: <Users className="w-4 h-4" />, text: "250M+ Workers Reach" },
    ];

    // Auto-rotate platforms
    useEffect(() => {
        const timer = setInterval(() => {
            setActivePlatformIndex((prev) => (prev + 1) % platforms.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <Section spacing="none" className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
            {/* Creative Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient mesh background */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(20,184,166,0.15),transparent)]" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_80%_80%,rgba(59,130,246,0.1),transparent)]" />
                </div>

                {/* Animated aurora effect */}
                <motion.div
                    className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full"
                    style={{
                        background: "conic-gradient(from 0deg, transparent, rgba(20,184,166,0.3), transparent, rgba(52,211,153,0.2), transparent)",
                        filter: "blur(80px)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute -bottom-[30%] -right-[20%] w-[70%] h-[70%] rounded-full"
                    style={{
                        background: "conic-gradient(from 180deg, transparent, rgba(34,211,238,0.2), transparent, rgba(59,130,246,0.15), transparent)",
                        filter: "blur(80px)",
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Grid with fade */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                        `,
                        backgroundSize: "80px 80px",
                        maskImage: "radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)",
                    }}
                />

                {/* Floating particles */}
                <FloatingParticles />

                {/* Decorative lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <motion.line
                        x1="0" y1="50%" x2="100%" y2="50%"
                        stroke="url(#line-gradient)" strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.5 }}
                    />
                    <defs>
                        <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="#14b8a6" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <Container className="relative z-10 pt-32 pb-20 md:pt-44 md:pb-32">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl relative">
                        {/* Badge with creative animation */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium mb-10 backdrop-blur-sm"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-teal-400 to-emerald-400"></span>
                            </span>
                            <span>Now Accepting Early Access</span>
                        </motion.div>

                        {/* Animated Headline */}
                        <AnimatedHeadline />

                        {/* Subheadline */}
                        <motion.p
                            className="text-slate-300 text-lg md:text-xl mb-10 leading-relaxed max-w-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Bypass the friction of LMS apps. Deliver{" "}
                            <span className="text-white font-semibold">2-minute AI-generated</span>{" "}
                            training modules directly to where your workforce lives.
                        </motion.p>

                        {/* CTAs with creative styling */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 mb-14"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            <MagneticWrapper strength={0.2}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.location.href = '#contact'}
                                    className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden"
                                >
                                    {/* Animated gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 animate-gradient-shift" />
                                    
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400" />
                                    </div>

                                    {/* Shine sweep */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
                                    </div>

                                    <span className="relative flex items-center gap-2">
                                        Book a 7-Day Pilot
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </MagneticWrapper>

                            <MagneticWrapper strength={0.2}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => window.location.href = '#contact'}
                                    className="group relative px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm transition-colors"
                                >
                                    <span className="flex items-center gap-2">
                                        <Play className="w-4 h-4" />
                                        Watch Demo
                                    </span>
                                </motion.button>
                            </MagneticWrapper>
                        </motion.div>

                        {/* Stats Grid */}
                        <motion.div
                            className="grid grid-cols-3 gap-4 mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1 }}
                        >
                            <StatCard value="250M+" label="Workers Reachable" delay={1.1} />
                            <StatCard value="90%" label="Completion Rate" delay={1.2} />
                            <StatCard value="12+" label="Multilingual" delay={1.3} />
                        </motion.div>

                        {/* Trust Signals - Minimal */}
                        <motion.div
                            className="flex flex-wrap items-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.4 }}
                        >
                            {trustSignals.map((signal, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-500 text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-teal-500/60" />
                                    <span>{signal.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Content - Phone Mockup with creative presentation */}
                    <motion.div
                        className="flex flex-col items-center lg:items-end gap-6 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Decorative rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none">
                            <motion.div
                                className="absolute inset-0 rounded-full border border-teal-500/20"
                                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute inset-8 rounded-full border border-emerald-500/20"
                                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.1, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div
                                className="absolute inset-16 rounded-full border border-cyan-500/20"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.05, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            />
                        </div>

                        {/* Glow behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-gradient-to-b from-teal-500/30 via-emerald-500/20 to-transparent blur-[80px] -z-10" />

                        {/* Platform Switcher - Creative pills */}
                        <motion.div 
                            className="relative z-10 flex gap-2 p-1.5 bg-slate-900/60 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {platforms.map((platform, index) => (
                                <motion.button
                                    key={platform.id}
                                    onClick={() => setActivePlatformIndex(index)}
                                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activePlatformIndex === index
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {activePlatformIndex === index && (
                                        <motion.div
                                            layoutId="activePlatformBg"
                                            className={`absolute inset-0 rounded-full ${platform.headerBg} shadow-lg`}
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <span className="relative z-10">{platform.icon}</span>
                                    <span className="relative z-10 hidden sm:inline">{platform.name}</span>
                                </motion.button>
                            ))}
                        </motion.div>

                        {/* Phone with 3D effect */}
                        <motion.div
                            className="relative"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePlatform.id}
                                    initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
                                    animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotateY: -15, scale: 0.9 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                                >
                                    <PhoneMockup activePlatform={activePlatform} />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
