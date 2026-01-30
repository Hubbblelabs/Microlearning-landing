"use client";

import { Ban, FileText, BarChart3, Languages, Monitor, Clock } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { StaggerContainer, StaggerItem } from "./animations/ScrollAnimations";

const painPoints = [
    {
        icon: <Ban className="w-6 h-6" />,
        title: "No Structured Training",
        description: "Informal, inconsistent training that varies by location and supervisor",
    },
    {
        icon: <FileText className="w-6 h-6" />,
        title: "Manual Paper-Based Delivery",
        description: "Physical handouts that get lost, damaged, or never read",
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "No Tracking or Audit Trail",
        description: "Zero visibility into who completed what training and when",
    },
    {
        icon: <Languages className="w-6 h-6" />,
        title: "Language & Literacy Barriers",
        description: "English-only content for workers who speak regional languages",
    },
    {
        icon: <Monitor className="w-6 h-6" />,
        title: "LMS Built for Desk Workers",
        description: "Complex systems requiring computers that frontline workers don't have",
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Time-Consuming Sessions",
        description: "Long training sessions that disrupt production schedules",
    },
];

export default function ProblemSection() {
    return (
        <Section id="problem" spacing="xl" className="bg-gradient-to-b from-slate-50 to-white">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="error" size="md" className="mb-4">
                        The Problem
                    </Badge>
                    <h2 className="mb-6 text-slate-900">
                        Why <span className="text-gradient">250M Workers</span> Are Left Behind
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Traditional training methods fail frontline workers. Here's what we're solving.
                    </p>
                </div>

                {/* Pain Points Grid */}
                <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {painPoints.map((point, index) => (
                        <StaggerItem key={index}>
                            <Card hover className="h-full group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-[var(--transition-base)] text-red-600">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                            {point.title}
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </Container>
        </Section>
    );
}
