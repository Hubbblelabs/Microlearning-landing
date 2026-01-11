"use client";

import { useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";

// 3D Tilt Card Component
interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltStrength?: number;
    glareEnabled?: boolean;
    perspective?: number;
}

export function TiltCard({
    children,
    className = "",
    tiltStrength = 15,
    glareEnabled = true,
    perspective = 1000,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const card = cardRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);

            const rotateX = -percentY * tiltStrength;
            const rotateY = percentX * tiltStrength;

            gsap.to(card, {
                rotateX,
                rotateY,
                duration: 0.3,
                ease: "power2.out",
                transformPerspective: perspective,
            });

            if (glareEnabled && glareRef.current) {
                const glareX = (percentX + 1) / 2 * 100;
                const glareY = (percentY + 1) / 2 * 100;
                gsap.to(glareRef.current, {
                    background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
                    duration: 0.3,
                });
            }
        };

        const handleMouseLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: "power3.out",
            });

            if (glareEnabled && glareRef.current) {
                gsap.to(glareRef.current, {
                    background: "transparent",
                    duration: 0.3,
                });
            }
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            card.removeEventListener("mousemove", handleMouseMove);
            card.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [tiltStrength, glareEnabled, perspective]);

    return (
        <div
            ref={cardRef}
            className={`relative transform-gpu ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
            {glareEnabled && (
                <div
                    ref={glareRef}
                    className="absolute inset-0 pointer-events-none rounded-inherit"
                    style={{ borderRadius: "inherit" }}
                />
            )}
        </div>
    );
}

// Floating Element with 3D depth
interface FloatingElementProps {
    children: ReactNode;
    className?: string;
    depth?: number;
    amplitude?: number;
    speed?: number;
}

export function FloatingElement({
    children,
    className = "",
    depth = 50,
    amplitude = 20,
    speed = 4,
}: FloatingElementProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set((e.clientX - centerX) / window.innerWidth);
            mouseY.set((e.clientY - centerY) / window.innerHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={elementRef}
            className={`transform-gpu ${className}`}
            style={{
                x,
                y,
                rotateX,
                rotateY,
                z: depth,
                transformStyle: "preserve-3d",
            }}
            animate={{
                y: [0, -amplitude, 0],
            }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
}

// Parallax Container with mouse tracking
interface ParallaxContainerProps {
    children: ReactNode;
    className?: string;
    sensitivity?: number;
}

export function ParallaxContainer({
    children,
    className = "",
    sensitivity = 30,
}: ParallaxContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const layers = container.querySelectorAll("[data-parallax-depth]");

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const percentX = (e.clientX - centerX) / (rect.width / 2);
            const percentY = (e.clientY - centerY) / (rect.height / 2);

            layers.forEach((layer) => {
                const depth = parseFloat(layer.getAttribute("data-parallax-depth") || "1");
                const moveX = percentX * sensitivity * depth;
                const moveY = percentY * sensitivity * depth;

                gsap.to(layer, {
                    x: moveX,
                    y: moveY,
                    duration: 0.4,
                    ease: "power2.out",
                });
            });
        };

        const handleMouseLeave = () => {
            layers.forEach((layer) => {
                gsap.to(layer, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                });
            });
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [sensitivity]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {children}
        </div>
    );
}

// Magnetic Wrapper Component
interface MagneticWrapperProps {
    children: ReactNode;
    className?: string;
    strength?: number;
}

export function MagneticWrapper({
    children,
    className = "",
    strength = 0.4,
}: MagneticWrapperProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const wrapper = wrapperRef.current;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) * strength;
            const deltaY = (e.clientY - centerY) * strength;

            gsap.to(wrapper, {
                x: deltaX,
                y: deltaY,
                duration: 0.3,
                ease: "power2.out",
            });
        };

        const handleMouseLeave = () => {
            gsap.to(wrapper, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.3)",
            });
        };

        wrapper.addEventListener("mousemove", handleMouseMove);
        wrapper.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            wrapper.removeEventListener("mousemove", handleMouseMove);
            wrapper.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [strength]);

    return (
        <div ref={wrapperRef} className={`inline-block ${className}`}>
            {children}
        </div>
    );
}

// 3D Transform on scroll
interface Scroll3DProps {
    children: ReactNode;
    className?: string;
}

export function Scroll3D({ children, className = "" }: Scroll3DProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const element = elementRef.current;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const progress = (viewportHeight / 2 - elementCenter) / viewportHeight;

            const rotateX = progress * 10;
            const scale = 1 - Math.abs(progress) * 0.1;

            gsap.set(element, {
                rotateX,
                scale: Math.max(0.9, scale),
                transformPerspective: 1000,
            });
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            ref={elementRef}
            className={`transform-gpu ${className}`}
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
}
