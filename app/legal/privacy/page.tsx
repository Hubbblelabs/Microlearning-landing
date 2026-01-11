"use client";

import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Badge from "../../components/ui/Badge";

export default function PrivacyPolicyPage() {
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
                                Privacy Policy
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
                            <h2>1. Introduction</h2>
                            <p>
                                Microlearning ("we", "our", or "us") is committed to protecting your privacy.
                                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                information when you use our AI-powered training platform delivered through
                                messaging services like WhatsApp, Telegram, and SMS.
                            </p>

                            <h2>2. Information We Collect</h2>
                            <h3>2.1 Personal Information</h3>
                            <p>We may collect the following types of personal information:</p>
                            <ul>
                                <li>Name and contact details (phone number, email address)</li>
                                <li>Employment information (company name, job role, department)</li>
                                <li>Training progress and completion data</li>
                                <li>Assessment scores and certification records</li>
                                <li>Communication preferences and language settings</li>
                            </ul>

                            <h3>2.2 Usage Data</h3>
                            <p>We automatically collect certain information when you use our platform:</p>
                            <ul>
                                <li>Message delivery and read receipts</li>
                                <li>Training module interaction data</li>
                                <li>Time spent on training content</li>
                                <li>Device type and messaging platform used</li>
                            </ul>

                            <h2>3. How We Use Your Information</h2>
                            <p>We use the collected information to:</p>
                            <ul>
                                <li>Deliver and personalize training content</li>
                                <li>Track training progress and generate completion reports</li>
                                <li>Provide AI-powered chatbot support and doubt resolution</li>
                                <li>Generate analytics for enterprise HR dashboards</li>
                                <li>Improve our platform and develop new features</li>
                                <li>Comply with legal obligations and industry regulations</li>
                            </ul>

                            <h2>4. Data Sharing</h2>
                            <p>
                                We share your information only with your employer organization for training
                                management purposes. We do not sell your personal data to third parties.
                            </p>
                            <p>We may share data with:</p>
                            <ul>
                                <li>Your employer's HR and training administrators</li>
                                <li>Cloud service providers (AWS) for data hosting</li>
                                <li>Messaging platform APIs for content delivery</li>
                                <li>Legal authorities when required by law</li>
                            </ul>

                            <h2>5. Data Security</h2>
                            <p>
                                We implement industry-standard security measures including:
                            </p>
                            <ul>
                                <li>End-to-end encryption for all communications</li>
                                <li>ISO 27001 compliant data centers</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Role-based access controls</li>
                                <li>Data backup and disaster recovery procedures</li>
                            </ul>

                            <h2>6. Data Retention</h2>
                            <p>
                                We retain your training data for the duration of your employment with your
                                organization. Upon termination of the enterprise contract, data is retained
                                for 90 days before permanent deletion.
                            </p>

                            <h2>7. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access your personal data and training records</li>
                                <li>Request correction of inaccurate information</li>
                                <li>Request deletion of your data (subject to employer policies)</li>
                                <li>Opt out of non-essential communications</li>
                                <li>Lodge a complaint with a data protection authority</li>
                            </ul>

                            <h2>8. Contact Us</h2>
                            <p>
                                For privacy-related inquiries, please contact us at:
                            </p>
                            <p>
                                <strong>Email:</strong> privacy@micro-learning.app<br />
                                <strong>Address:</strong> Bangalore, India
                            </p>

                            <h2>9. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify you of
                                any changes by posting the new Privacy Policy on this page and updating the
                                "Last updated" date.
                            </p>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
