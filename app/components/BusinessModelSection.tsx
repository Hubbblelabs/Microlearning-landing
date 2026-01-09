"use client";

import { Users, Building2, Check } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./animations/ScrollAnimations";

const projections = [
    { year: "Year 1", value: "₹2.5 Cr", milestone: "Pilot phase complete" },
    { year: "Year 2", value: "₹12 Cr", milestone: "Enterprise expansion" },
    { year: "Year 3", value: "₹35 Cr", milestone: "Market leadership" },
];

const pricingTiers = [
    {
        icon: <Users className="w-6 h-6" />,
        name: "Per Worker Subscription",
        subtitle: "Monthly recurring",
        priceRange: "₹49 - ₹99",
        period: "per worker / month",
        gradient: "from-teal-500 to-emerald-600",
        features: [
            "Unlimited training modules",
            "WhatsApp & SMS delivery",
            "AI chatbot support",
            "Real-time analytics dashboard",
        ],
        iconColor: "text-teal-400",
    },
    {
        icon: <Building2 className="w-6 h-6" />,
        name: "Enterprise Onboarding",
        subtitle: "One-time setup",
        priceRange: "₹5L - ₹15L",
        period: "one-time fee",
        gradient: "from-purple-500 to-indigo-600",
        features: [
            "Custom content development",
            "Knowledge base setup",
            "Regional language support",
            "White-label options available",
        ],
        iconColor: "text-purple-400",
    },
];

export default function BusinessModelSection() {
    return (
        <Section id="pricing" spacing="xl" className="bg-slate-900">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="primary" size="md" className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">
                        Business Model
                    </Badge>
                    <h2 className="text-white mb-6">
                        Simple, <span className="text-gradient">Scalable</span> Pricing
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Transparent pricing designed for enterprises of all sizes.
                    </p>
                </div>

                {/* Pricing Cards */}
                <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
                    {pricingTiers.map((tier, index) => (
                        <StaggerItem key={index}>
                            <Card 
                                variant="elevated" 
                                hover
                                className="bg-slate-800 border-slate-700 h-full"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center text-white shadow-[var(--shadow-md)]`}>
                                        {tier.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-lg">{tier.name}</h4>
                                        <p className="text-slate-400 text-sm">{tier.subtitle}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-white">{tier.priceRange.split(' - ')[0]}</span>
                                        {tier.priceRange.includes(' - ') && (
                                            <>
                                                <span className="text-slate-400">-</span>
                                                <span className="text-4xl font-bold text-white">{tier.priceRange.split(' - ')[1]}</span>
                                            </>
                                        )}
                                    </div>
                                    <p className="text-slate-400 text-sm mt-1">{tier.period}</p>
                                </div>

                                <ul className="space-y-3 text-slate-300 text-sm">
                                    {tier.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <Check className={`w-5 h-5 ${tier.iconColor}`} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Growth Projections */}
                <ScrollReveal direction="up">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-8 md:p-12">
                        <div className="text-center mb-12">
                            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
                                Growth Projections
                            </h3>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                                Building towards market leadership in frontline worker training
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                            {projections.map((proj, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-sm text-slate-400 mb-2">{proj.year}</div>
                                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{proj.value}</div>
                                    <div className="text-sm text-slate-500">{proj.milestone}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Button 
                        variant="primary" 
                        size="lg"
                        onClick={() => window.location.href = '#contact'}
                    >
                        Book Your 7-Day Pilot
                    </Button>
                </div>
            </Container>
        </Section>
    );
}
