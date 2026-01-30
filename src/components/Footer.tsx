"use client";

import { Mail, Linkedin, Twitter, Github } from "lucide-react";
import Container from "./ui/Container";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navigation = {
        product: [
            { name: "Problem", href: "/#problem" },
            { name: "Solution", href: "/#solution" },
            { name: "Market", href: "/#market" },
            { name: "Pricing", href: "/#pricing" },
        ],
        company: [
            { name: "About", href: "/about" },
            { name: "Blog", href: "/blog" },

            { name: "Contact", href: "/#contact" },
        ],
        legal: [
            { name: "Privacy Policy", href: "/legal/privacy" },
            { name: "Terms of Service", href: "/legal/terms" },
            { name: "Cookie Policy", href: "/legal/cookies" },
            { name: "GDPR", href: "/legal/gdpr" },
        ],
    };

    const socialLinks = [
        { name: "LinkedIn", href: "#", icon: <Linkedin className="w-5 h-5" /> },
        { name: "Twitter", href: "#", icon: <Twitter className="w-5 h-5" /> },
        { name: "GitHub", href: "#", icon: <Github className="w-5 h-5" /> },
    ];

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <Container className="py-12 md:py-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Company Info */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-[image:var(--gradient-primary)] flex items-center justify-center shadow-[var(--shadow-md)]">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <span className="text-white font-bold text-xl">Microlearning</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            Empowering India's 250M frontline workers with AI-powered training delivered via WhatsApp & SMS.
                        </p>
                        <a
                            href="mailto:hello@micro-learning.app"
                            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)]"
                        >
                            <Mail className="w-4 h-4" />
                            hello@micro-learning.app
                        </a>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {navigation.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] rounded"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {navigation.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] rounded"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            {navigation.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-slate-400 hover:text-white transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] rounded"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm text-center md:text-left">
                            © {currentYear} Microlearning. All rights reserved. | Built for India's frontline workforce.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring-color)] rounded-lg p-1"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            {/* Trust Badges */}
            <div className="border-t border-slate-800 bg-slate-950/50">
                <Container className="py-6">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-xs">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>ISO 27001 Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>GDPR Ready</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>99.9% Uptime SLA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Made in India</span>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
