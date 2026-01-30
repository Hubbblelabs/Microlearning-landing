"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { platforms, messageTemplates } from "@/constants/platforms";

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

export default function PhoneMockup({ activePlatform }: { activePlatform: typeof platforms[0] }) {
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
            className="phone-frame w-[280px] h-[580px] sm:w-[300px] sm:h-[620px]"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className={`phone-screen h-full flex flex-col ${activePlatform.chatBg}`}>
                <div className="phone-notch absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-black rounded-b-xl z-20" />

                {/* Platform Header */}
                <motion.div
                    className={`${activePlatform.headerBg} pt-12 pb-3 px-4 flex items-center gap-3 shrink-0 rounded-t-[32px]`}
                    initial={false}
                    animate={{ backgroundColor: activePlatform.headerBg }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        ML
                    </div>
                    <div>
                        <div className="text-white font-semibold text-sm">Microlearning Training</div>
                        <div className="text-white/70 text-xs">online</div>
                    </div>
                </motion.div>

                {/* Chat Messages */}
                <div className="flex-1 flex flex-col gap-2 p-3 overflow-hidden relative">
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
                <div className={`shrink-0 p-2 mb-2 mx-2 rounded-2xl ${activePlatform.darkMode ? 'bg-[#17212b]' : 'bg-white'} border ${activePlatform.darkMode ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${activePlatform.darkMode ? 'bg-[#242f3d]' : 'bg-slate-100'}`}>
                        <span className={`text-sm ${activePlatform.darkMode ? 'text-white/40' : 'text-slate-400'}`}>Type a message...</span>
                        <Send className={`w-4 h-4 ml-auto ${activePlatform.accentColor}`} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
