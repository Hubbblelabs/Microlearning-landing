"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Hook for scroll-triggered fade in animations
export function useScrollFadeIn(options?: {
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    delay?: number;
    start?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const {
        direction = "up",
        distance = 60,
        duration = 1,
        delay = 0,
        start = "top 85%",
    } = options || {};

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;
        const directionMap = {
            up: { y: distance, x: 0 },
            down: { y: -distance, x: 0 },
            left: { x: distance, y: 0 },
            right: { x: -distance, y: 0 },
        };

        gsap.fromTo(
            element,
            {
                opacity: 0,
                ...directionMap[direction],
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [direction, distance, duration, delay, start]);

    return ref;
}

// Hook for stagger animation on children
export function useScrollStagger(options?: {
    stagger?: number;
    duration?: number;
    start?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { stagger = 0.1, duration = 0.8, start = "top 85%" } = options || {};

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;
        const children = element.children;

        gsap.fromTo(
            children,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration,
                stagger,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start,
                    toggleActions: "play none none reverse",
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [stagger, duration, start]);

    return ref;
}

// Hook for text reveal animation (character by character)
export function useTextReveal(options?: {
    duration?: number;
    stagger?: number;
    delay?: number;
}) {
    const ref = useRef<HTMLElement>(null);
    const { duration = 0.8, stagger = 0.02, delay = 0 } = options || {};

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;
        const text = element.textContent || "";

        // Split text into spans
        element.innerHTML = text
            .split("")
            .map(char => `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`)
            .join("");

        const chars = element.querySelectorAll("span");

        gsap.fromTo(
            chars,
            {
                opacity: 0,
                y: 20,
                rotateX: -90,
            },
            {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration,
                stagger,
                delay,
                ease: "power3.out",
            }
        );
    }, [duration, stagger, delay]);

    return ref;
}

// Hook for counter animation
export function useCounterAnimation(
    endValue: number,
    options?: {
        duration?: number;
        prefix?: string;
        suffix?: string;
        start?: string;
    }
) {
    const ref = useRef<HTMLSpanElement>(null);
    const { duration = 2, prefix = "", suffix = "", start = "top 85%" } = options || {};

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;
        const obj = { value: 0 };

        gsap.to(obj, {
            value: endValue,
            duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start,
                toggleActions: "play none none reverse",
            },
            onUpdate: () => {
                element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [endValue, duration, prefix, suffix, start]);

    return ref;
}

// Hook for parallax effect
export function useParallax(speed: number = 0.5) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;

        gsap.to(element, {
            yPercent: -100 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [speed]);

    return ref;
}

// Hook for magnetic button effect
export function useMagnetic(strength: number = 0.3) {
    const ref = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !ref.current) return;

        const element = ref.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(element, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", handleMouseMove);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return ref;
}
