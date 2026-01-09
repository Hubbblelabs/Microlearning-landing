"use client";

import { useEffect, useRef, useState } from "react";
import { Factory, Package, Truck, Utensils, Wrench, MessageCircle } from "lucide-react";

const segments = [
    {
        icon: <Factory className="w-8 h-8 text-teal-600" />,
        title: "Factories",
        description: "Manufacturing plants, assembly lines, production facilities",
        workers: "50M+",
    },
    {
        icon: <Package className="w-8 h-8 text-teal-600" />,
        title: "Warehouses",
        description: "Distribution centers, fulfillment hubs, storage facilities",
        workers: "30M+",
    },
    {
        icon: <Truck className="w-8 h-8 text-teal-600" />,
        title: "Logistics",
        description: "Delivery drivers, fleet operators, last-mile workers",
        workers: "45M+",
    },
    {
        icon: <Utensils className="w-8 h-8 text-teal-600" />,
        title: "QSR",
        description: "Quick service restaurants, food chains, kitchens",
        workers: "25M+",
    },
    {
        icon: <Wrench className="w-8 h-8 text-teal-600" />,
        title: "Field Service",
        description: "Technicians, repair crews, on-site service teams",
        workers: "35M+",
    },
];

export default function TargetMarketSection() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    segments.forEach((_, index) => {
                        setTimeout(() => {
                            setVisibleItems((prev) => [...prev, index]);
                        }, index * 120);
                    });
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="market"
            ref={sectionRef}
            className="section bg-gradient-to-b from-white to-slate-50"
        >
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-full mb-4">
                        Target Market
                    </span>
                    <h2 className="mb-4">
                        Built for <span className="text-gradient">Every Industry</span>
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Wherever frontline workers operate, Microlearning delivers.
                    </p>
                </div>

                {/* Segment Cards - Horizontal Scroll on Mobile */}
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
                    {segments.map((segment, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 w-64 lg:w-auto snap-center card group ${visibleItems.includes(index) ? "animate-fade-in-up" : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {segment.icon}
                                </div>
                                <h4 className="text-lg font-semibold text-slate-900 mb-2">
                                    {segment.title}
                                </h4>
                                <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                                    {segment.description}
                                </p>
                                <div className="inline-block px-3 py-1 bg-teal-50 text-teal-700 text-sm font-semibold rounded-full">
                                    {segment.workers} workers
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* WhatsApp Insight */}
                <div className="mt-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl opacity-10" />
                    <div className="relative p-8 md:p-12 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
                            <MessageCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            <span className="text-green-600">95%</span> of workers already use WhatsApp
                        </h3>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            No new apps to install. No training on how to use the platform.
                            Workers receive training on the same app they use to chat with family.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
