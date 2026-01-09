"use client";

import { useEffect, useRef, useState } from "react";

const segments = [
    {
        icon: "🏭",
        title: "Factories",
        description: "Manufacturing plants, assembly lines, production facilities",
        workers: "50M+",
    },
    {
        icon: "📦",
        title: "Warehouses",
        description: "Distribution centers, fulfillment hubs, storage facilities",
        workers: "30M+",
    },
    {
        icon: "🚚",
        title: "Logistics",
        description: "Delivery drivers, fleet operators, last-mile workers",
        workers: "45M+",
    },
    {
        icon: "🍔",
        title: "QSR",
        description: "Quick service restaurants, food chains, kitchens",
        workers: "25M+",
    },
    {
        icon: "🔧",
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
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
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
                            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
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
