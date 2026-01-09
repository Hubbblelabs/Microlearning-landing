"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import Container from "./ui/Container";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show/hide header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navLinks = [
        { href: "#problem", label: "Problem" },
        { href: "#solution", label: "Solution" },
        { href: "#features", label: "Features" },
        { href: "#market", label: "Market" },
        { href: "#pricing", label: "Pricing" },
    ];

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ 
                y: isVisible ? 0 : -100,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-[var(--transition-base)] ${
                isScrolled
                    ? "bg-slate-900/80 backdrop-blur-xl shadow-[var(--shadow-lg)] border-b border-white/10"
                    : "bg-transparent"
            }`}
        >
            <Container>
                <nav className="flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">
                    {/* Logo */}
                    <motion.a 
                        href="#" 
                        className="flex items-center gap-2.5 group"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeMobileMenu}
                    >
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[image:var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-md)] group-hover:shadow-[var(--shadow-lg)] transition-shadow">
                            <span className="text-white font-bold text-base md:text-lg">M</span>
                        </div>
                        <span className="text-white font-bold text-lg md:text-xl tracking-tight">
                            Microlearning
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-[var(--transition-fast)] text-sm font-medium rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.location.href = '#contact'}
                        >
                            Book Demo
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-white rounded-lg hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </nav>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                        className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <Container>
                            <div className="py-4 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 transition-colors rounded-lg text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="pt-3 mt-2 border-t border-white/10">
                                    <a
                                        href="#contact"
                                        onClick={closeMobileMenu}
                                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-[image:var(--gradient-cta)] text-white font-semibold rounded-full shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
                                    >
                                        Book Demo
                                    </a>
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
