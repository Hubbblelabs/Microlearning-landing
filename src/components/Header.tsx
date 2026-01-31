"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

const navLinks = [
    { href: "/#problem", label: "Problem" },
    { href: "/#solution", label: "Solution" },
    { href: "/#market", label: "Market" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#contact", label: "Contact" },
];

// Animated gradient border component
function GradientBorder({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`relative ${className}`}>
            <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full opacity-60 blur-sm animate-gradient-shift" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 rounded-full opacity-80 animate-gradient-shift" />
            <div className="relative bg-slate-950/90 backdrop-blur-2xl rounded-full">
                {children}
            </div>
        </div>
    );
}

// Magnetic nav item with cursor following
function MagneticNavItem({ href, label, onHover }: { href: string; label: string; onHover: (rect: DOMRect | null) => void }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        onHover(null);
    };

    const handleMouseEnter = () => {
        if (ref.current) {
            onHover(ref.current.getBoundingClientRect());
        }
    };

    return (
        <motion.div style={{ x: springX, y: springY }}>
            <Link
                ref={ref}
                href={href}
                className="relative px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:text-white block"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
            >
                {label}
            </Link>
        </motion.div>
    );
}

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setIsScrolled(currentScrollY > 60);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    // Calculate hover indicator position relative to nav container
    const getIndicatorStyle = () => {
        if (!hoverRect || !navRef.current) return { opacity: 0 };
        const navRect = navRef.current.getBoundingClientRect();
        return {
            opacity: 1,
            left: hoverRect.left - navRect.left,
            width: hoverRect.width,
        };
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -120,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="fixed left-0 right-0 top-0 z-[100] flex justify-center pt-4 px-4 pointer-events-none"
            >
                <motion.div
                    layout
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`
                        pointer-events-auto flex items-center gap-2
                        ${isScrolled ? "justify-between" : "justify-center flex-wrap lg:flex-nowrap lg:gap-8"}
                    `}
                >
                    {/* Logo - Always visible */}
                    <motion.div layout="position">
                        <Link
                            href="/"
                            className="flex items-center gap-3 group"
                            onClick={closeMobileMenu}
                        >
                            <motion.div
                                className="relative"
                                whileHover={{ rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Animated ring */}
                                <motion.div
                                    className="absolute -inset-1 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                />
                                <div className="relative w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-orange-500/30">
                                    <span className="text-white font-bold text-lg">M</span>
                                </div>
                            </motion.div>
                            <div className="flex flex-col">
                                <span className={`font-bold text-lg md:text-xl tracking-tight leading-none transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                                    Microlearning
                                </span>
                                <span className={`text-[10px] font-medium tracking-widest uppercase transition-colors ${isScrolled ? 'text-orange-600' : 'text-orange-400'}`}>
                                    Train Smarter
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation - Floating pill with gradient border */}
                    <motion.div layout="position" className="hidden lg:block">
                        <GradientBorder>
                            <nav ref={navRef} className="relative flex items-center px-2 py-1">
                                {/* Hover indicator */}
                                <motion.div
                                    className="absolute top-1 bottom-1 bg-white/10 rounded-full pointer-events-none"
                                    animate={getIndicatorStyle()}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                                {navLinks.map((link) => (
                                    <MagneticNavItem
                                        key={link.href}
                                        href={link.href}
                                        label={link.label}
                                        onHover={setHoverRect}
                                    />
                                ))}
                            </nav>
                        </GradientBorder>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div layout="position" className="hidden lg:block">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                href="#contact"
                                className="group relative inline-flex items-center gap-2 px-6 py-3 overflow-hidden rounded-full font-semibold text-sm"
                            >
                                {/* Animated gradient background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 animate-gradient-shift" />
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500" />
                                
                                {/* Shine effect */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                                </div>

                                <span className="relative text-white">Book Demo</span>
                                <motion.span
                                    className="relative text-white"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        layout="position"
                        className="lg:hidden p-3 text-white/80 hover:text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10"
                        onClick={() => setIsMobileMenuOpen(true)}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Open menu"
                    >
                        <Menu className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </motion.header>

            {/* Mobile Menu - Full screen with creative animation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
                        animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
                        exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[200] bg-slate-950 lg:hidden"
                    >
                        {/* Background decoration */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-1/4 -right-1/4 w-[60%] h-[60%] bg-orange-500/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 -left-1/4 w-[60%] h-[60%] bg-amber-500/20 rounded-full blur-[100px]" />
                        </div>

                        <button
                            className="absolute top-6 right-6 p-3 text-white/80 hover:text-white bg-white/5 rounded-full border border-white/10"
                            onClick={closeMobileMenu}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <nav className="relative flex flex-col items-center justify-center h-full gap-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-4xl font-bold text-white/70 hover:text-white transition-colors relative group"
                                        onClick={closeMobileMenu}
                                    >
                                        <span className="relative z-10">{link.label}</span>
                                        <motion.span
                                            className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100"
                                            layoutId="mobile-indicator"
                                        />
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={() => {
                                        window.location.href = '#contact';
                                        closeMobileMenu();
                                    }}
                                >
                                    Book Demo →
                                </Button>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
