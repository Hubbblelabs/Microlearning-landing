"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../components/animations/ScrollAnimations";

const featuredPost = {
    title: "The Future of Frontline Worker Training in India",
    excerpt: "How AI-powered microlearning delivered through messaging platforms is revolutionizing workforce development for 250 million workers.",
    date: "Jan 10, 2025",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop"
};

const blogPosts = [
    {
        title: "WhatsApp as a Learning Platform: A Complete Guide",
        excerpt: "Discover how to leverage WhatsApp's massive reach to deliver effective training content.",
        date: "Jan 8, 2025",
        readTime: "5 min read",
        category: "How-To"
    },
    {
        title: "Overcoming Literacy Barriers in Workforce Training",
        excerpt: "Strategies for creating accessible training content using audio, video, and visual aids.",
        date: "Jan 5, 2025",
        readTime: "6 min read",
        category: "Best Practices"
    },
    {
        title: "The ROI of Microlearning for Manufacturing",
        excerpt: "Case study: How 2-3 minute training modules improved safety compliance by 40%.",
        date: "Jan 2, 2025",
        readTime: "7 min read",
        category: "Case Study"
    },
    {
        title: "Regional Languages: Key to Worker Engagement",
        excerpt: "Why training in mother tongue languages increases completion rates by 3x.",
        date: "Dec 28, 2024",
        readTime: "4 min read",
        category: "Research"
    },
    {
        title: "AI Chatbots for 24/7 Training Support",
        excerpt: "How AI-powered chatbots provide instant doubt resolution for frontline workers.",
        date: "Dec 24, 2024",
        readTime: "5 min read",
        category: "Technology"
    },
    {
        title: "Building a Safety Training Program That Works",
        excerpt: "Step-by-step guide to creating effective safety compliance training for factories.",
        date: "Dec 20, 2024",
        readTime: "10 min read",
        category: "How-To"
    },
];

const categories = [
    "All Posts",
    "Industry Insights",
    "How-To",
    "Case Study",
    "Research",
    "Technology",
    "Best Practices"
];

export default function BlogPage() {
    return (
        <>
            <Header />
            <main>
                {/* Hero Section */}
                <Section spacing="xl" className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-32">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)`
                        }} />
                    </div>
                    <Container className="relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                Blog
                            </Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Insights & <span className="text-gradient">Resources</span>
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                                Expert insights on frontline worker training, microlearning, and workforce development.
                            </p>
                        </motion.div>
                    </Container>
                </Section>

                {/* Featured Post */}
                <Section spacing="lg" className="bg-white">
                    <Container>
                        <ScrollReveal direction="up">
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800">
                                <div className="grid lg:grid-cols-2 gap-0">
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <Badge variant="primary" size="sm" className="mb-4 bg-teal-500/20 text-teal-300 border-teal-500/30 w-fit">
                                            Featured
                                        </Badge>
                                        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-slate-300 mb-6 leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-slate-400 text-sm mb-6">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {featuredPost.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                        <Button variant="primary" size="md" className="w-fit">
                                            Read Article
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="relative h-64 lg:h-auto">
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10 lg:block hidden" />
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </Container>
                </Section>

                {/* Blog Grid */}
                <Section spacing="xl" className="bg-gradient-to-b from-white to-slate-50">
                    <Container>
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-12 justify-center">
                            {categories.map((category, index) => (
                                <button
                                    key={category}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${index === 0
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Posts Grid */}
                        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <StaggerItem key={index}>
                                    <Card hover className="h-full flex flex-col group cursor-pointer">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Badge variant="primary" size="sm">{post.category}</Badge>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between text-slate-400 text-sm pt-4 border-t border-slate-100">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </Card>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Load More */}
                        <div className="text-center mt-12">
                            <Button variant="outline" size="lg" className="border-slate-300 text-slate-700">
                                Load More Articles
                            </Button>
                        </div>
                    </Container>
                </Section>

                {/* Newsletter Section */}
                <Section spacing="lg" className="bg-slate-900">
                    <Container>
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Stay <span className="text-gradient">Updated</span>
                            </h2>
                            <p className="text-slate-400 mb-8">
                                Get the latest insights on frontline worker training delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 max-w-sm px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
                                />
                                <Button variant="primary" size="lg">
                                    Subscribe
                                </Button>
                            </div>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
