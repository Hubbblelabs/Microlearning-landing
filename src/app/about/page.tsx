"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Heart, Award, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollAnimations";

const values = [
    {
        icon: <Target className="w-6 h-6" />,
        title: "Mission Driven",
        description: "Empowering 250M frontline workers with accessible, effective training."
    },
    {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Innovation First",
        description: "Leveraging AI and familiar platforms to solve real training challenges."
    },
    {
        icon: <Heart className="w-6 h-6" />,
        title: "Worker Centric",
        description: "Every feature designed with frontline workers' needs in mind."
    },
    {
        icon: <Award className="w-6 h-6" />,
        title: "Excellence",
        description: "Committed to delivering the highest quality training experience."
    },
];

const milestones = [
    { year: "2024", title: "Concept Development", description: "Identified the gap in frontline worker training" },
    { year: "2025", title: "Launch Year", description: "Pilot program with enterprise partners" },
    { year: "2026", title: "National Expansion", description: "Scaling across India's major industries" },
    { year: "2027", title: "Market Leadership", description: "Targeting 10M+ workers trained" },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Section spacing="xl" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)`
                        }} />
                    </div>
                    <Container className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                About Us
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Transforming <span className="text-gradient">Frontline Training</span>
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                We're building the future of workforce training for India's 250 million frontline workers,
                                making learning accessible, engaging, and effective through familiar messaging platforms.
                            </p>
                        </motion.div>
                    </Container>
                </Section>

                {/* Mission Section */}
                <Section spacing="xl" className="bg-white">
                    <Container>
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <ScrollReveal direction="right">
                                <Badge variant="warning" size="md" className="mb-4 bg-amber-50 text-amber-700 border-amber-200">
                                    Our Mission
                                </Badge>
                                <h2 className="text-slate-900 mb-6">
                                    Bridging the <span className="text-gradient">Training Gap</span>
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                    India's frontline workforce faces a critical training gap. Traditional LMS platforms
                                    require computers and English proficiency—resources many workers don't have.
                                    We're changing that by delivering bite-sized, AI-powered training through
                                    WhatsApp, Telegram, and SMS in 12+ regional languages.
                                </p>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Our vision is a world where every worker, regardless of their education level
                                    or language, has access to quality training that helps them grow and succeed.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal direction="left">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl">
                                        <div className="text-4xl font-bold text-teal-600 mb-2">250M+</div>
                                        <div className="text-slate-600 text-sm">Frontline Workers</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
                                        <div className="text-4xl font-bold text-purple-600 mb-2">₹30K Cr</div>
                                        <div className="text-slate-600 text-sm">Market Opportunity</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
                                        <div className="text-4xl font-bold text-amber-600 mb-2">12+</div>
                                        <div className="text-slate-600 text-sm">Indian Languages</div>
                                    </div>
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                                        <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                                        <div className="text-slate-600 text-sm">WhatsApp Penetration</div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </Container>
                </Section>

                {/* Values Section */}
                <Section spacing="xl" className="bg-gradient-to-b from-slate-50 to-white">
                    <Container>
                        <div className="text-center mb-16">
                            <Badge variant="primary" size="md" className="mb-4">Our Values</Badge>
                            <h2 className="text-slate-900 mb-6">
                                What <span className="text-gradient">Drives Us</span>
                            </h2>
                        </div>

                        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <StaggerItem key={index}>
                                    <Card hover className="h-full text-center">
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
                                            {value.icon}
                                        </div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </Container>
                </Section>

                {/* Timeline Section */}
                <Section spacing="xl" className="bg-slate-900">
                    <Container>
                        <div className="text-center mb-16">
                            <Badge variant="primary" size="md" className="mb-4 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                Our Journey
                            </Badge>
                            <h2 className="text-white mb-6">
                                Building the <span className="text-gradient">Future</span>
                            </h2>
                        </div>

                        <div className="relative max-w-4xl mx-auto">
                            {/* Timeline line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-teal-500 to-emerald-500 rounded-full hidden md:block" />

                            {milestones.map((milestone, index) => (
                                <ScrollReveal key={index} direction={index % 2 === 0 ? "right" : "left"}>
                                    <div className={`flex flex-col md:flex-row items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                        <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                                <div className="text-teal-400 font-bold text-lg mb-2">{milestone.year}</div>
                                                <h4 className="text-white font-semibold text-xl mb-2">{milestone.title}</h4>
                                                <p className="text-slate-400">{milestone.description}</p>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 bg-teal-500 rounded-full border-4 border-slate-900 z-10 hidden md:block" />
                                        <div className="flex-1 hidden md:block" />
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </Container>
                </Section>

                {/* Team Section Placeholder */}
                <Section spacing="xl" className="bg-white">
                    <Container>
                        <div className="text-center">
                            <Badge variant="info" size="md" className="mb-4 bg-blue-50 text-blue-700 border-blue-200">
                                Our Team
                            </Badge>
                            <h2 className="text-slate-900 mb-6">
                                Meet the <span className="text-gradient">Founders</span>
                            </h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-12">
                                We're a passionate team of entrepreneurs, technologists, and educators
                                committed to transforming frontline worker training in India.
                            </p>

                            <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-100">
                                <Users className="w-6 h-6 text-teal-600" />
                                <span className="text-slate-700">Team profiles coming soon</span>
                            </div>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
