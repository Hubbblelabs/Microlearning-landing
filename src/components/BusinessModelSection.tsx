"use client";

import { useEffect, useRef } from "react";
import { Users, Building2, Check } from "lucide-react";
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

const projections = [
    { year: "Year 1", value: 2.5, suffix: " Cr", milestone: "Pilot phase complete" },
    { year: "Year 2", value: 12, suffix: " Cr", milestone: "Enterprise expansion" },
    { year: "Year 3", value: 35, suffix: " Cr", milestone: "Market leadership" },
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

// Counter animation component
function AnimatedCounter({
    value,
    prefix = "₹",
    suffix = ""
}: {
    value: number;
    prefix?: string;
    suffix?: string;
}) {
    const counterRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!counterRef.current) return;

        const element = counterRef.current;
        const obj = { value: 0 };

        gsap.to(obj, {
            value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
            onUpdate: () => {
                element.textContent = `${prefix}${obj.value.toFixed(1)}${suffix}`;
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [value, prefix, suffix]);

    return <span ref={counterRef}>{prefix}0{suffix}</span>;
}

export default function BusinessModelSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const projectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Animate header
        if (headerRef.current) {
            gsap.fromTo(
                headerRef.current.children,
                { opacity: 0, y: 40 },
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
        }

        // Animate pricing cards
        if (cardsRef.current) {
            gsap.fromTo(
                cardsRef.current.children,
                { opacity: 0, y: 60, rotateY: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateY: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }

        // Animate projections container
        if (projectionsRef.current) {
            gsap.fromTo(
                projectionsRef.current,
                { opacity: 0, scale: 0.95, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: projectionsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    return (
        <Section id="pricing" spacing="xl" className="bg-slate-900 overflow-hidden">
            <Container>
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16">
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

                {/* Pricing Cards with 3D Tilt */}
                <div
                    ref={cardsRef}
                    className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"
                    style={{ perspective: "1500px" }}
                >
                    {pricingTiers.map((tier, index) => (
                        <TiltCard key={index} tiltStrength={8} glareEnabled={true}>
                            <div className="h-full p-8 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center text-white shadow-lg`}>
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
                            </div>
                        </TiltCard>
                    ))}
                </div>

                {/* CTA with Magnetic Effect */}
                <div className="text-center mt-12">
                    <MagneticWrapper strength={0.3}>
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => window.location.href = '#contact'}
                        >
                            Book Your 7-Day Pilot
                        </Button>
                    </MagneticWrapper>
                </div>
            </Container>
        </Section>
    );
}
