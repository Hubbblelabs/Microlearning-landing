"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Heart, Zap, Users, Coffee, Laptop, Globe, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollAnimations";

const perks = [
    { icon: <Heart className="w-6 h-6" />, title: "Health Benefits", description: "Comprehensive medical coverage for you and family" },
    { icon: <Zap className="w-6 h-6" />, title: "Learning Budget", description: "₹50K annual budget for courses and conferences" },
    { icon: <Laptop className="w-6 h-6" />, title: "Remote First", description: "Work from anywhere with flexible hours" },
    { icon: <Coffee className="w-6 h-6" />, title: "Team Offsites", description: "Quarterly team retreats and events" },
    { icon: <Globe className="w-6 h-6" />, title: "ESOP", description: "Employee stock ownership plan" },
    { icon: <Users className="w-6 h-6" />, title: "Impact Work", description: "Transform training for 250M workers" },
];

const openPositions = [
    {
        title: "Senior Full-Stack Developer",
        department: "Engineering",
        location: "Remote / Bangalore",
        type: "Full-time",
        description: "Build and scale our AI-powered microlearning platform using Next.js, Python, and AWS."
    },
    {
        title: "AI/ML Engineer",
        department: "Engineering",
        location: "Remote / Bangalore",
        type: "Full-time",
        description: "Develop NLP models for multi-language content generation and chatbot capabilities."
    },
    {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        description: "Design intuitive experiences for both enterprise dashboards and worker-facing interfaces."
    },
    {
        title: "Enterprise Sales Lead",
        department: "Sales",
        location: "Mumbai / Delhi",
        type: "Full-time",
        description: "Drive growth by building relationships with India's largest enterprises."
    },
    {
        title: "Content Strategist",
        department: "Content",
        location: "Remote",
        type: "Full-time",
        description: "Create engaging microlearning content for diverse industries and languages."
    },
];

export default function CareersPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Section spacing="xl" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(249, 115, 22, 0.08) 0%, transparent 50%)`
                        }} />
                    </div>
                    <Container className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-orange-500/10 border-orange-500/20 text-orange-300">
                                We're Hiring
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Build the Future of <span className="text-gradient">Worker Training</span>
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                                Join our mission to empower 250 million frontline workers with accessible,
                                AI-powered training. Make an impact at scale.
                            </p>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                View Open Positions
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    </Container>
                </Section>

                {/* Stats */}
                <Section spacing="lg" className="bg-white border-b border-slate-100">
                    <Container>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { value: "250M+", label: "Workers to Impact" },
                                { value: "Remote", label: "First Culture" },
                                { value: "Early", label: "Stage Startup" },
                                { value: "ESOP", label: "For All Employees" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                                    <div className="text-slate-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </Container>
                </Section>

                {/* Perks */}
                <Section spacing="xl" className="bg-gradient-to-b from-white to-slate-50">
                    <Container>
                        <div className="text-center mb-16">
                            <Badge variant="primary" size="md" className="mb-4">Why Join Us</Badge>
                            <h2 className="text-slate-900 mb-6">
                                Perks & <span className="text-gradient">Benefits</span>
                            </h2>
                        </div>

                        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {perks.map((perk, index) => (
                                <StaggerItem key={index}>
                                    <Card hover className="h-full">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shrink-0">
                                                {perk.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-semibold text-slate-900 mb-1">{perk.title}</h4>
                                                <p className="text-slate-600 text-sm">{perk.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </Container>
                </Section>

                {/* Open Positions */}
                <Section id="positions" spacing="xl" className="bg-slate-900">
                    <Container>
                        <div className="text-center mb-16">
                            <Badge variant="primary" size="md" className="mb-4 bg-orange-500/10 border-orange-500/20 text-orange-300">
                                Open Roles
                            </Badge>
                            <h2 className="text-white mb-6">
                                Current <span className="text-gradient">Openings</span>
                            </h2>
                        </div>

                        <div className="space-y-4 max-w-4xl mx-auto">
                            {openPositions.map((position, index) => (
                                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                                    <div className="group bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-orange-500/50 transition-all cursor-pointer">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                                                        {position.title}
                                                    </h3>
                                                    <Badge variant="primary" size="sm" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                                                        {position.department}
                                                    </Badge>
                                                </div>
                                                <p className="text-slate-400 text-sm mb-3">{position.description}</p>
                                                <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {position.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4" />
                                                        {position.type}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" className="shrink-0 border-slate-600 text-white hover:border-orange-500 hover:bg-orange-500/10">
                                                Apply Now
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </Container>
                </Section>

                {/* CTA */}
                <Section spacing="lg" className="bg-gradient-to-r from-orange-600 to-amber-600">
                    <Container>
                        <div className="text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Don't see your role?
                            </h2>
                            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                                We're always looking for talented people. Send us your resume and let us know how you'd like to contribute.
                            </p>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
                                Send Your Resume
                            </Button>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
