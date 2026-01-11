"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Video, CheckCircle2, Rocket, Shield, Zap, Users, MessageCircle, Send } from "lucide-react";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Container from "./ui/Container";
import Section from "./ui/Section";

// Platform configurations
const platforms = [
    {
        id: "whatsapp",
        name: "WhatsApp",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
        ),
        headerBg: "bg-[#128C7E]",
        chatBg: "bg-[#e5ddd5]",
        incomingBubble: "bg-white",
        outgoingBubble: "bg-[#dcf8c6]",
        accentColor: "text-[#25D366]",
    },
    {
        id: "telegram",
        name: "Telegram",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
        ),
        headerBg: "bg-[#0088cc]",
        chatBg: "bg-gradient-to-b from-[#17212b] to-[#0e1621]",
        incomingBubble: "bg-[#182533]",
        outgoingBubble: "bg-[#2b5278]",
        accentColor: "text-[#0088cc]",
        darkMode: true,
    },
    {
        id: "sms",
        name: "SMS",
        icon: <MessageCircle className="w-5 h-5" />,
        headerBg: "bg-[#34C759]",
        chatBg: "bg-[#f2f2f7]",
        incomingBubble: "bg-[#e5e5ea]",
        outgoingBubble: "bg-[#34C759]",
        accentColor: "text-[#34C759]",
        outgoingTextWhite: true,
    },
    {
        id: "imessage",
        name: "iMessage",
        icon: (
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.105.915 4.02 2.429 5.467-.159.55-.487 1.485-1.143 2.592-.19.32-.021.73.338.82 1.2.3 2.937-.182 4.403-.91A11.5 11.5 0 0 0 12 19c5.523 0 10-3.813 10-8.5S17.523 2 12 2z" />
            </svg>
        ),
        headerBg: "bg-[#007AFF]",
        chatBg: "bg-white",
        incomingBubble: "bg-[#e5e5ea]",
        outgoingBubble: "bg-[#007AFF]",
        accentColor: "text-[#007AFF]",
        outgoingTextWhite: true,
    },
];

// Message templates for training
const messageTemplates = [
    {
        type: "incoming",
        text: "📚 Today's Training: Safety Protocol Module 3",
        delay: 0,
    },
    {
        type: "incoming",
        text: "🎬 Watch this 2-min video and reply with your answer",
        delay: 1.5,
    },
    {
        type: "outgoing",
        text: "1",
        delay: 3.5,
    },
    {
        type: "incoming",
        text: "✅ Correct! You scored 100%. Certificate sent!",
        delay: 5,
    },
];

// Typing indicator component
function TypingIndicator({ platform }: { platform: typeof platforms[0] }) {
    return (
        <div className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl ${platform.incomingBubble} ${platform.darkMode ? 'text-white/60' : 'text-slate-500'}`}>
            <motion.span
                className="w-2 h-2 rounded-full bg-current"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.span
                className="w-2 h-2 rounded-full bg-current"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
            />
            <motion.span
                className="w-2 h-2 rounded-full bg-current"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
            />
        </div>
    );
}

// Message bubble component
function MessageBubble({
    message,
    platform,
    index
}: {
    message: typeof messageTemplates[0];
    platform: typeof platforms[0];
    index: number;
}) {
    const isOutgoing = message.type === "outgoing";

    return (
        <motion.div
            initial={{ opacity: 0, x: isOutgoing ? 20 : -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.3,
                ease: [0, 0, 0.2, 1]
            }}
            className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${isOutgoing
                ? `${platform.outgoingBubble} ${isOutgoing ? 'self-end' : ''} ${platform.outgoingTextWhite ? 'text-white' : platform.darkMode ? 'text-white' : 'text-slate-800'} rounded-br-md`
                : `${platform.incomingBubble} ${platform.darkMode ? 'text-white' : 'text-slate-800'} rounded-bl-md`
                }`}
        >
            {message.text}
            <div className={`text-[10px] text-right mt-1 ${platform.darkMode || (isOutgoing && platform.outgoingTextWhite)
                ? 'text-white/50'
                : 'text-slate-400'
                }`}>
                {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                {isOutgoing && (
                    <span className="ml-1">✓✓</span>
                )}
            </div>
        </motion.div>
    );
}

// Phone mockup component
function PhoneMockup({ activePlatform }: { activePlatform: typeof platforms[0] }) {
    const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
    const [showTyping, setShowTyping] = useState(false);
    const [cycleKey, setCycleKey] = useState(0);

    useEffect(() => {
        setVisibleMessages([]);
        setShowTyping(false);

        const timeouts: NodeJS.Timeout[] = [];
        let currentIndex = 0;

        const showNextMessage = () => {
            if (currentIndex >= messageTemplates.length) {
                // Reset and start over after a pause
                const resetTimeout = setTimeout(() => {
                    setCycleKey(prev => prev + 1);
                    setVisibleMessages([]);
                    currentIndex = 0;
                    showNextMessage();
                }, 2000);
                timeouts.push(resetTimeout);
                return;
            }

            const message = messageTemplates[currentIndex];

            // Show typing indicator for incoming messages
            if (message.type === "incoming") {
                setShowTyping(true);
                const typingTimeout = setTimeout(() => {
                    setShowTyping(false);
                    setVisibleMessages(prev => [...prev, currentIndex]);
                    currentIndex++;
                    const nextTimeout = setTimeout(showNextMessage, 1000);
                    timeouts.push(nextTimeout);
                }, 1200);
                timeouts.push(typingTimeout);
            } else {
                // Outgoing messages appear faster
                setVisibleMessages(prev => [...prev, currentIndex]);
                currentIndex++;
                const nextTimeout = setTimeout(showNextMessage, 800);
                timeouts.push(nextTimeout);
            }
        };

        // Start the sequence
        const startTimeout = setTimeout(showNextMessage, 500);
        timeouts.push(startTimeout);

        return () => {
            timeouts.forEach(clearTimeout);
        };
    }, [activePlatform.id, cycleKey]);

    return (
        <motion.div
            className="phone-frame"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className={`phone-screen ${activePlatform.chatBg}`}>
                <div className="phone-notch" />

                {/* Platform Header */}
                <motion.div
                    className={`${activePlatform.headerBg} pt-10 pb-3 px-4 flex items-center gap-3`}
                    initial={false}
                    animate={{ backgroundColor: activePlatform.headerBg }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                        ML
                    </div>
                    <div>
                        <div className="text-white font-semibold text-sm">Microlearning Training</div>
                        <div className="text-white/70 text-xs">online</div>
                    </div>
                </motion.div>

                {/* Chat Messages */}
                <div className="flex flex-col gap-2 p-3 h-[calc(100%-100px)] overflow-hidden">
                    <AnimatePresence mode="popLayout" key={`messages-${activePlatform.id}-${cycleKey}`}>
                        {visibleMessages
                            .filter(msgIndex => messageTemplates[msgIndex] !== undefined)
                            .map((msgIndex) => (
                                <MessageBubble
                                    key={`${activePlatform.id}-${cycleKey}-${msgIndex}`}
                                    message={messageTemplates[msgIndex]}
                                    platform={activePlatform}
                                    index={msgIndex}
                                />
                            ))}
                    </AnimatePresence>

                    {showTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="self-start"
                        >
                            <TypingIndicator platform={activePlatform} />
                        </motion.div>
                    )}
                </div>

                {/* Input Bar */}
                <div className={`absolute bottom-0 left-0 right-0 p-2 ${activePlatform.darkMode ? 'bg-[#17212b]' : 'bg-white'} border-t ${activePlatform.darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${activePlatform.darkMode ? 'bg-[#242f3d]' : 'bg-slate-100'}`}>
                        <span className={`text-sm ${activePlatform.darkMode ? 'text-white/40' : 'text-slate-400'}`}>Type a message...</span>
                        <Send className={`w-4 h-4 ml-auto ${activePlatform.accentColor}`} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function HeroSection() {
    const [activePlatformIndex, setActivePlatformIndex] = useState(0);
    const activePlatform = platforms[activePlatformIndex];

    const trustSignals = [
        { icon: <Shield className="w-4 h-4" />, text: "ISO 27001 Compliant" },
        { icon: <Zap className="w-4 h-4" />, text: "99.9% Uptime SLA" },
        { icon: <Users className="w-4 h-4" />, text: "250M+ Workers Reach" },
    ];

    return (
        <Section spacing="none" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(5, 150, 105, 0.08) 0%, transparent 50%)`
                }} />
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
                    backgroundSize: '64px 64px'
                }} />
            </div>

            <Container className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                <Rocket className="w-4 h-4" />
                                Launching in 2025
                            </Badge>
                        </motion.div>

                        <motion.h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
                        >
                            <span className="text-gradient">AI-Powered</span> Training for{" "}
                            <span className="text-gradient">Frontline Workers</span>
                        </motion.h1>

                        <motion.p
                            className="text-slate-300 text-lg md:text-xl mb-8 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
                        >
                            2-3 minute training modules delivered via{" "}
                            <span className="text-green-400 font-semibold">WhatsApp</span>,{" "}
                            <span className="text-blue-400 font-semibold">Telegram</span>,{" "}
                            <span className="text-emerald-400 font-semibold">SMS</span> & more in 12+ Indian languages.
                            <br />
                            <span className="text-white font-medium">No app downloads. No literacy barriers.</span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 mb-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3, ease: [0, 0, 0.2, 1] }}
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={() => window.location.href = '#contact'}
                                className="group"
                            >
                                Book a 7-Day Pilot
                                <motion.svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </motion.svg>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() => window.location.href = '#contact'}
                            >
                                Request Demo
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex flex-wrap gap-3 mb-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4, ease: [0, 0, 0.2, 1] }}
                        >
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">250M+</span>
                                <span className="text-slate-300 text-sm">Workers</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">₹30K Cr</span>
                                <span className="text-slate-300 text-sm">Market</span>
                            </div>
                            <div className="stat-pill">
                                <span className="text-teal-400 font-bold">2-3 Min</span>
                                <span className="text-slate-300 text-sm">Modules</span>
                            </div>
                        </motion.div>

                        {/* Trust Signals */}
                        <motion.div
                            className="flex flex-wrap gap-4 pt-6 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.5, ease: [0, 0, 0.2, 1] }}
                        >
                            {trustSignals.map((signal, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                                    <div className="text-teal-400">{signal.icon}</div>
                                    <span>{signal.text}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right Content - Phone Mockup */}
                    <motion.div
                        className="flex flex-col items-center lg:items-end gap-6"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0, 0, 0.2, 1] }}
                    >
                        {/* Platform Switcher */}
                        <div className="flex gap-2 p-1.5 bg-slate-800/50 backdrop-blur-sm rounded-full border border-white/10">
                            {platforms.map((platform, index) => (
                                <motion.button
                                    key={platform.id}
                                    onClick={() => setActivePlatformIndex(index)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activePlatformIndex === index
                                        ? `${platform.headerBg} text-white shadow-lg`
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {platform.icon}
                                    <span className="hidden sm:inline">{platform.name}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Phone */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePlatform.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PhoneMockup activePlatform={activePlatform} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
}
