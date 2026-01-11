"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, Video, Bot, Lock, TrendingUp, Globe2, PlayCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { TiltCard, MagneticWrapper } from "./animations/Interactions3D";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        icon: <MessageCircle className="w-6 h-6" />,
        title: "WhatsApp & SMS Delivery",
        description: "Meet workers where they are. No app downloads, no complex logins.",
        detail: "Instant delivery to 95% of workers who already use WhatsApp daily.",
        color: "from-green-500 to-emerald-600",
    },
    {
        icon: <Video className="w-6 h-6" />,
        title: "Zero Literacy Barrier",
        description: "Audio, video, and voice reply support for all skill levels.",
        detail: "Workers can listen to content and respond with voice messages.",
        color: "from-purple-500 to-indigo-600",
    },
    {
        icon: <Bot className="w-6 h-6" />,
        title: "24/7 AI Chatbot",
        description: "Instant doubt resolution anytime, in any language.",
        detail: "AI-powered assistant answers questions and provides guidance.",
        color: "from-blue-500 to-cyan-600",
    },
    {
        icon: <Lock className="w-6 h-6" />,
        title: "Secure Knowledge Base",
        description: "Company-specific content that stays confidential.",
        detail: "Your SOPs, policies, and training materials in one secure place.",
        color: "from-amber-500 to-orange-600",
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Real-time Analytics",
        description: "HR dashboards with completion rates and insights.",
        detail: "Track progress, identify gaps, and ensure compliance at scale.",
        color: "from-rose-500 to-pink-600",
    },
    {
        icon: <Globe2 className="w-6 h-6" />,
        title: "12+ Indian Languages",
        description: "Regional language support for maximum reach.",
        detail: "Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and more.",
        color: "from-teal-500 to-emerald-600",
    },
];

// Feature Card with 3D tilt and GSAP animation
function FeatureCard({
    feature,
    index
}: {
    feature: typeof features[0];
    index: number;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        gsap.fromTo(
            cardRef.current,
            {
                opacity: 0,
                y: 60,
                rotateX: -15,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, [index]);

    return (
        <div ref={cardRef} style={{ perspective: "1000px" }}>
            <TiltCard
                tiltStrength={12}
                glareEnabled={true}
                className="h-full"
            >
                <div
                    className="h-full p-6 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
                        {feature.icon}
                    </div>

                    <h4 className="text-lg font-semibold text-slate-900 mb-2">
                        {feature.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed mb-3">
                        {feature.description}
                    </p>

                    {/* Expanded Detail */}
                    <div
                        className={`overflow-hidden transition-all duration-300 ${isHovered ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        <p className="text-teal-600 text-sm font-medium pt-3 border-t border-slate-100">
                            {feature.detail}
                        </p>
                    </div>

                    {/* 3D depth indicator */}
                    <div
                        className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                            transform: 'translateZ(20px)',
                        }}
                    />
                </div>
            </TiltCard>
        </div>
    );
}

export default function SolutionSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!headerRef.current) return;

        // Animate header
        gsap.fromTo(
            headerRef.current.children,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );
    }, []);

    return (
        <Section id="solution" spacing="xl" className="bg-white overflow-hidden">
            <Container>
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <Badge variant="primary" size="md" className="mb-4">
                        Our Solution
                    </Badge>
                    <h2 className="mb-6 text-slate-900">
                        Training That <span className="text-gradient">Actually Works</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        AI-powered microlearning designed specifically for frontline workers in India.
                    </p>
                </div>

                {/* Features Grid with 3D Cards */}
                <div
                    ref={sectionRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
                    style={{ perspective: "1500px" }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>

                {/* Demo CTA with Magnetic Effect */}
                <div className="flex justify-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100 max-w-3xl">
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-slate-900 font-bold text-xl mb-2">
                                See it in action
                            </p>
                            <p className="text-slate-600">
                                Watch how a training module is delivered via WhatsApp
                            </p>
                        </div>
                        <MagneticWrapper strength={0.3}>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.location.href = '#contact'}
                                className="shrink-0"
                            >
                                Request Demo
                                <PlayCircle className="w-5 h-5" />
                            </Button>
                        </MagneticWrapper>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
