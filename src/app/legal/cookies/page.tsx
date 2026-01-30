"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";

export default function CookiePolicyPage() {
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
                                Cookie Policy
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
                            <h2>1. What Are Cookies?</h2>
                            <p>
                                Cookies are small text files that are placed on your device when you visit
                                our website. They help us provide you with a better experience and allow
                                certain features to work properly.
                            </p>

                            <h2>2. How We Use Cookies</h2>
                            <p>
                                Microlearning uses cookies and similar technologies on our website and
                                enterprise dashboard for the following purposes:
                            </p>

                            <h3>2.1 Essential Cookies</h3>
                            <p>
                                These cookies are necessary for the website to function properly. They enable
                                basic functions like page navigation and access to secure areas. These cannot
                                be disabled.
                            </p>
                            <ul>
                                <li>Authentication and session management</li>
                                <li>Security features</li>
                                <li>Load balancing</li>
                            </ul>

                            <h3>2.2 Functional Cookies</h3>
                            <p>
                                These cookies enable enhanced functionality and personalization:
                            </p>
                            <ul>
                                <li>Language preferences</li>
                                <li>Dashboard layout preferences</li>
                                <li>Form auto-fill data</li>
                            </ul>

                            <h3>2.3 Analytics Cookies</h3>
                            <p>
                                These cookies help us understand how visitors interact with our website:
                            </p>
                            <ul>
                                <li>Page visit statistics</li>
                                <li>Traffic sources</li>
                                <li>Feature usage patterns</li>
                            </ul>

                            <h2>3. Third-Party Cookies</h2>
                            <p>
                                We may use the following third-party services that set cookies:
                            </p>
                            <ul>
                                <li><strong>Google Analytics:</strong> For website analytics</li>
                                <li><strong>Intercom:</strong> For customer support chat</li>
                                <li><strong>HubSpot:</strong> For marketing automation</li>
                            </ul>

                            <h2>4. Cookie Duration</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Cookie Type</th>
                                        <th>Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Session Cookies</td>
                                        <td>Until browser is closed</td>
                                    </tr>
                                    <tr>
                                        <td>Persistent Cookies</td>
                                        <td>Up to 2 years</td>
                                    </tr>
                                    <tr>
                                        <td>Analytics Cookies</td>
                                        <td>Up to 1 year</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2>5. Managing Cookies</h2>
                            <p>
                                You can manage cookies through your browser settings. Most browsers allow you to:
                            </p>
                            <ul>
                                <li>View what cookies are stored and delete them individually</li>
                                <li>Block third-party cookies</li>
                                <li>Block cookies from particular sites</li>
                                <li>Block all cookies from being set</li>
                                <li>Delete all cookies when you close your browser</li>
                            </ul>
                            <p>
                                <strong>Note:</strong> Blocking essential cookies may affect the functionality
                                of our platform.
                            </p>

                            <h2>6. Updates to This Policy</h2>
                            <p>
                                We may update this Cookie Policy from time to time. We will notify you of
                                any changes by posting the new policy on this page.
                            </p>

                            <h2>7. Contact</h2>
                            <p>
                                For questions about our use of cookies, contact us at:<br />
                                <strong>Email:</strong> privacy@micro-learning.app
                            </p>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
