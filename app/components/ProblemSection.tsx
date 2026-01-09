"use client";

import { useEffect, useRef, useState } from "react";
import { Ban, FileText, BarChart3, Languages, Monitor, Clock } from "lucide-react";

const painPoints = [
    {
        icon: <Ban className="w-6 h-6 text-red-600" />,
        title: "No Structured Training",
        description: "Informal, inconsistent training that varies by location and supervisor",
    },
    {
        icon: <FileText className="w-6 h-6 text-red-600" />,
        title: "Manual Paper-Based Delivery",
        description: "Physical handouts that get lost, damaged, or never read",
    },
    {
        icon: <BarChart3 className="w-6 h-6 text-red-600" />,
        title: "No Tracking or Audit Trail",
        description: "Zero visibility into who completed what training and when",
    },
    {
        icon: <Languages className="w-6 h-6 text-red-600" />,
        title: "Language & Literacy Barriers",
        description: "English-only content for workers who speak regional languages",
    },
    {
        icon: <Monitor className="w-6 h-6 text-red-600" />,
        title: "LMS Built for Desk Workers",
        description: "Complex systems requiring computers that frontline workers don't have",
    },
    {
        icon: <Clock className="w-6 h-6 text-red-600" />,
        title: "Time-Consuming Sessions",
        description: "Long training sessions that disrupt production schedules",
    },
];

export default function ProblemSection() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    painPoints.forEach((_, index) => {
                        setTimeout(() => {
                            setVisibleItems((prev) => [...prev, index]);
                        }, index * 150);
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
            id="problem"
            ref={sectionRef}
            className="section bg-gradient-to-b from-slate-50 to-white"
        >
            <div className="container">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
                        The Problem
                    </span>
                    <h2 className="mb-4">
                        Why <span className="text-gradient">250M Workers</span> Are Left Behind
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Traditional training methods fail frontline workers. Here&apos;s what we&apos;re solving.
                    </p>
                </div>

                {/* Pain Points Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {painPoints.map((point, index) => (
                        <div
                            key={index}
                            className={`card group cursor-default ${visibleItems.includes(index)
                                ? "animate-fade-in-up"
                                : "opacity-0"
                                }`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    {point.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-slate-900 mb-1">
                                        {point.title}
                                    </h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Impact Statement */}
                <div className="mt-16 p-6 md:p-8 bg-slate-900 rounded-2xl text-center">
                    <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto">
                        The result?{" "}
                        <span className="text-white font-semibold">
                            Low productivity, high attrition, safety incidents,
                        </span>{" "}
                        and{" "}
                        <span className="text-white font-semibold">
                            compliance failures
                        </span>{" "}
                        across factories, warehouses, and field operations.
                    </p>
                </div>
            </div>
        </section>
    );
}
