"use client";

import { useState } from "react";
import { MessageCircle, Video, Bot, Lock, TrendingUp, Globe2, PlayCircle } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { StaggerContainer, StaggerItem } from "./animations/ScrollAnimations";

const features = [
    {
        icon: <MessageCircle className="w-6 h-6" />,
        title: "WhatsApp & SMS Delivery",
        description: "Meet workers where they are. No app downloads, no complex logins.",
        detail: "Instant delivery to 95% of workers who already use WhatsApp daily.",
    },
    {
        icon: <Video className="w-6 h-6" />,
        title: "Zero Literacy Barrier",
        description: "Audio, video, and voice reply support for all skill levels.",
        detail: "Workers can listen to content and respond with voice messages.",
    },
    {
        icon: <Bot className="w-6 h-6" />,
        title: "24/7 AI Chatbot",
        description: "Instant doubt resolution anytime, in any language.",
        detail: "AI-powered assistant answers questions and provides guidance.",
    },
    {
        icon: <Lock className="w-6 h-6" />,
        title: "Secure Knowledge Base",
        description: "Company-specific content that stays confidential.",
        detail: "Your SOPs, policies, and training materials in one secure place.",
    },
    {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Real-time Analytics",
        description: "HR dashboards with completion rates and insights.",
        detail: "Track progress, identify gaps, and ensure compliance at scale.",
    },
    {
        icon: <Globe2 className="w-6 h-6" />,
        title: "12+ Indian Languages",
        description: "Regional language support for maximum reach.",
        detail: "Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and more.",
    },
];

export default function SolutionSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <Section id="solution" spacing="xl" className="bg-white">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
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

                {/* Features Grid */}
                <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <StaggerItem key={index}>
                            <Card 
                                hover 
                                className="h-full relative overflow-hidden"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Gradient overlay on hover */}
                                <div 
                                    className={`absolute inset-0 bg-[image:var(--gradient-primary)] opacity-0 transition-opacity duration-[var(--transition-base)] ${hoveredIndex === index ? 'opacity-[0.03]' : ''}`}
                                />
                                
                                <div className="relative z-10">
                                    <div className="w-12 h-12 mb-4 rounded-xl bg-[image:var(--gradient-primary)] flex items-center justify-center text-white">
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
                                        className={`overflow-hidden transition-all duration-[var(--transition-base)] ${
                                            hoveredIndex === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        <p className="text-teal-600 text-sm font-medium pt-3 border-t border-slate-100">
                                            {feature.detail}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Demo CTA */}
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
                        <Button 
                            variant="primary"
                            size="lg"
                            onClick={() => window.location.href = '#contact'}
                            className="shrink-0"
                        >
                            Request Demo
                            <PlayCircle className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </Container>
        </Section>
    );
}
