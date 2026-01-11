"use client";

import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Badge from "../../components/ui/Badge";

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Section spacing="lg" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32">
                    <Container className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                Legal
                            </Badge>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Terms of Service
                            </h1>
                            <p className="text-slate-400">
                                Last updated: January 11, 2025
                            </p>
                        </motion.div>
                    </Container>
                </Section>

                {/* Content */}
                <Section spacing="xl" className="bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                            <h2>1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using Microlearning's AI-powered training platform ("Service"),
                                you agree to be bound by these Terms of Service ("Terms"). If you do not agree
                                to these Terms, you may not access or use the Service.
                            </p>

                            <h2>2. Description of Service</h2>
                            <p>
                                Microlearning provides an AI-powered microlearning platform that delivers
                                training content to frontline workers through messaging platforms including
                                WhatsApp, Telegram, SMS, and iMessage. The Service includes:
                            </p>
                            <ul>
                                <li>Training module delivery and tracking</li>
                                <li>AI chatbot for doubt resolution</li>
                                <li>Enterprise HR analytics dashboard</li>
                                <li>Multi-language content support</li>
                                <li>Certification and compliance tracking</li>
                            </ul>

                            <h2>3. User Accounts</h2>
                            <h3>3.1 Enterprise Accounts</h3>
                            <p>
                                Enterprise customers are responsible for managing user access and ensuring
                                compliance with these Terms by all workers accessing the platform.
                            </p>
                            <h3>3.2 Worker Accounts</h3>
                            <p>
                                Workers receive access through their employer's subscription. Workers must
                                use the Service only for authorized training purposes.
                            </p>

                            <h2>4. Acceptable Use</h2>
                            <p>You agree not to:</p>
                            <ul>
                                <li>Use the Service for any unlawful purpose</li>
                                <li>Share training content outside your organization</li>
                                <li>Attempt to reverse engineer or copy our AI systems</li>
                                <li>Interfere with the proper operation of the Service</li>
                                <li>Submit false information or impersonate others</li>
                            </ul>

                            <h2>5. Intellectual Property</h2>
                            <p>
                                All content, features, and functionality of the Service are owned by
                                Microlearning and protected by intellectual property laws. Custom training
                                content developed for enterprise customers remains the property of the
                                respective enterprise.
                            </p>

                            <h2>6. Subscription and Payment</h2>
                            <h3>6.1 Pricing</h3>
                            <p>
                                Enterprise subscriptions are based on per-worker monthly pricing (₹49-₹99)
                                plus one-time onboarding fees (₹5L-₹15L). Pricing is detailed in individual
                                enterprise agreements.
                            </p>
                            <h3>6.2 Payment Terms</h3>
                            <p>
                                Payments are due as specified in the enterprise agreement. Late payments may
                                result in service suspension.
                            </p>

                            <h2>7. Service Level Agreement</h2>
                            <p>
                                We commit to 99.9% platform uptime. Scheduled maintenance will be communicated
                                in advance. Service credits may be issued for extended downtime as per the
                                enterprise agreement.
                            </p>

                            <h2>8. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by law, Microlearning shall not be liable for
                                any indirect, incidental, special, consequential, or punitive damages arising
                                from your use of the Service.
                            </p>

                            <h2>9. Indemnification</h2>
                            <p>
                                You agree to indemnify and hold harmless Microlearning from any claims,
                                damages, or expenses arising from your violation of these Terms or misuse
                                of the Service.
                            </p>

                            <h2>10. Termination</h2>
                            <p>
                                Either party may terminate the service agreement as per the terms specified
                                in the enterprise contract. Upon termination, access to the platform will be
                                revoked and data will be handled per our Privacy Policy.
                            </p>

                            <h2>11. Governing Law</h2>
                            <p>
                                These Terms shall be governed by the laws of India. Any disputes shall be
                                subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka.
                            </p>

                            <h2>12. Contact</h2>
                            <p>
                                For questions about these Terms, contact us at:<br />
                                <strong>Email:</strong> legal@micro-learning.app
                            </p>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
