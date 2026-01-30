"use client";

import { Factory, Package, Truck, Utensils, Wrench, MessageCircle } from "lucide-react";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Container from "./ui/Container";
import Section from "./ui/Section";
import { StaggerContainer, StaggerItem, ScrollReveal } from "./animations/ScrollAnimations";

const segments = [
    {
        icon: <Factory className="w-8 h-8" />,
        title: "Factories",
        description: "Manufacturing plants, assembly lines, production facilities",
        workers: "50M+",
    },
    {
        icon: <Package className="w-8 h-8" />,
        title: "Warehouses",
        description: "Distribution centers, fulfillment hubs, storage facilities",
        workers: "30M+",
    },
    {
        icon: <Truck className="w-8 h-8" />,
        title: "Logistics",
        description: "Delivery drivers, fleet operators, last-mile workers",
        workers: "45M+",
    },
    {
        icon: <Utensils className="w-8 h-8" />,
        title: "QSR",
        description: "Quick service restaurants, food chains, kitchens",
        workers: "25M+",
    },
    {
        icon: <Wrench className="w-8 h-8" />,
        title: "Field Service",
        description: "Technicians, repair crews, on-site service teams",
        workers: "35M+",
    },
];

export default function TargetMarketSection() {
    return (
        <Section id="market" spacing="xl" className="bg-gradient-to-b from-white to-slate-50">
            <Container>
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="info" size="md" className="mb-4 bg-purple-50 text-purple-700 border-purple-200">
                        Target Market
                    </Badge>
                    <h2 className="mb-6 text-slate-900">
                        Built for <span className="text-gradient">Every Industry</span>
                    </h2>
                    <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Wherever frontline workers operate, Microlearning delivers.
                    </p>
                </div>

                {/* Segment Cards */}
                <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
                    {segments.map((segment, index) => (
                        <StaggerItem key={index}>
                            <Card hover className="h-full text-center group">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-[var(--transition-base)] text-teal-600">
                                    {segment.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                    {segment.title}
                                </h4>
                                <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                                    {segment.description}
                                </p>
                                <Badge variant="primary" size="sm" className="inline-block">
                                    {segment.workers} workers
                                </Badge>
                            </Card>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* WhatsApp Insight */}
                <ScrollReveal direction="up">
                    <div className="relative overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-[image:linear-gradient(135deg,_var(--whatsapp)_0%,_var(--whatsapp-dark)_100%)] opacity-10" />
                        <div className="relative p-8 md:p-12 text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-[var(--whatsapp)] rounded-full mb-6 shadow-[var(--shadow-lg)]">
                                <MessageCircle className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                <span className="text-green-600">95%</span> of workers already use WhatsApp
                            </h3>
                            <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                                No new apps to install. No training on how to use the platform.
                                Workers receive training on the same app they use to chat with family.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </Container>
        </Section>
    );
}
