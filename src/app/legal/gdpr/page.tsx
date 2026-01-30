"use client";

import { motion } from "framer-motion";
import { Shield, FileText, UserCheck, Globe, Lock, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { StaggerContainer, StaggerItem } from "@/components/animations/ScrollAnimations";

const gdprRights = [
    { icon: <FileText className="w-6 h-6" />, title: "Right to Access", description: "Request a copy of your personal data" },
    { icon: <UserCheck className="w-6 h-6" />, title: "Right to Rectification", description: "Correct inaccurate personal data" },
    { icon: <AlertTriangle className="w-6 h-6" />, title: "Right to Erasure", description: "Request deletion of your data" },
    { icon: <Lock className="w-6 h-6" />, title: "Right to Restriction", description: "Limit how we use your data" },
    { icon: <Globe className="w-6 h-6" />, title: "Right to Portability", description: "Transfer data to another service" },
    { icon: <Shield className="w-6 h-6" />, title: "Right to Object", description: "Object to certain data processing" },
];

export default function GDPRPage() {
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
                                GDPR Compliance
                            </h1>
                            <p className="text-slate-400">
                                Last updated: January 11, 2025
                            </p>
                        </motion.div>
                    </Container>
                </Section>

                {/* GDPR Rights Grid */}
                <Section spacing="lg" className="bg-gradient-to-b from-slate-50 to-white">
                    <Container>
                        <div className="text-center mb-12">
                            <h2 className="text-slate-900 mb-4">Your <span className="text-gradient">Data Rights</span></h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                Under GDPR, you have the following rights regarding your personal data
                            </p>
                        </div>
                        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gdprRights.map((right, index) => (
                                <StaggerItem key={index}>
                                    <Card hover className="h-full text-center">
                                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
                                            {right.icon}
                                        </div>
                                        <h4 className="text-lg font-semibold text-slate-900 mb-2">{right.title}</h4>
                                        <p className="text-slate-600 text-sm">{right.description}</p>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </Container>
                </Section>

                {/* Content */}
                <Section spacing="xl" className="bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto prose prose-slate prose-lg">
                            <h2>1. Our Commitment to GDPR</h2>
                            <p>
                                Microlearning is committed to complying with the General Data Protection
                                Regulation (GDPR) for all users in the European Union and European Economic
                                Area. This page outlines how we process your data in accordance with GDPR
                                requirements.
                            </p>

                            <h2>2. Legal Basis for Processing</h2>
                            <p>We process personal data under the following legal bases:</p>
                            <ul>
                                <li><strong>Contract Performance:</strong> To provide our training services as agreed with your employer</li>
                                <li><strong>Legitimate Interests:</strong> To improve our platform and provide customer support</li>
                                <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                                <li><strong>Consent:</strong> For marketing communications (where applicable)</li>
                            </ul>

                            <h2>3. Data Controller</h2>
                            <p>
                                Microlearning acts as a data processor on behalf of enterprise customers
                                (data controllers). For worker training data, your employer is the data
                                controller and determines the purposes of data processing.
                            </p>

                            <h2>4. International Data Transfers</h2>
                            <p>
                                Your data is primarily stored in India. When data is transferred outside
                                the EEA, we ensure appropriate safeguards are in place through:
                            </p>
                            <ul>
                                <li>Standard Contractual Clauses (SCCs)</li>
                                <li>Adequacy decisions where applicable</li>
                                <li>Binding Corporate Rules with partners</li>
                            </ul>

                            <h2>5. Data Protection Officer</h2>
                            <p>
                                We have appointed a Data Protection Officer (DPO) who can be contacted for
                                any GDPR-related inquiries:
                            </p>
                            <p>
                                <strong>Email:</strong> dpo@micro-learning.app<br />
                                <strong>Address:</strong> Data Protection Officer, Microlearning, Bangalore, India
                            </p>

                            <h2>6. Data Breach Notification</h2>
                            <p>
                                In the event of a personal data breach that is likely to result in a risk
                                to your rights and freedoms, we will:
                            </p>
                            <ul>
                                <li>Notify the relevant supervisory authority within 72 hours</li>
                                <li>Notify affected individuals without undue delay (if high risk)</li>
                                <li>Document all breaches and remediation actions</li>
                            </ul>

                            <h2>7. Exercising Your Rights</h2>
                            <p>
                                To exercise any of your GDPR rights, please contact us at
                                privacy@micro-learning.app. We will respond to your request within 30 days.
                            </p>
                            <p>
                                <strong>Note:</strong> For worker training data, you may need to contact
                                your employer (the data controller) to exercise certain rights.
                            </p>

                            <h2>8. Supervisory Authority</h2>
                            <p>
                                You have the right to lodge a complaint with your local data protection
                                supervisory authority if you believe we have not complied with GDPR requirements.
                            </p>

                            <h2>9. Updates to This Policy</h2>
                            <p>
                                We review our GDPR compliance regularly and will update this page to reflect
                                any changes in our practices or applicable regulations.
                            </p>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
