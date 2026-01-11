"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Facebook, Linkedin, Share2, Twitter } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import { allPosts } from "../../data/blogPosts";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const post = allPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <>
            <Header />
            <main>
                {/* Article Header */}
                <Section spacing="none" className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 75% 25%, rgba(20, 184, 166, 0.08) 0%, transparent 50%)`
                        }} />
                    </div>

                    <Container className="relative z-10">
                        <div className="max-w-3xl mx-auto">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Blog
                            </Link>

                            <Badge variant="primary" size="md" className="mb-6 bg-teal-500/10 border-teal-500/20 text-teal-300">
                                {post.category}
                            </Badge>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                                        <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <span className="block text-white font-medium">{post.author.name}</span>
                                        <span className="text-xs">{post.author.role}</span>
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-slate-700 hidden sm:block" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>

                {/* Article Content */}
                <Section spacing="xl" className="bg-white">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            {/* Featured Image */}
                            {post.image && (
                                <div className="rounded-2xl overflow-hidden mb-12 shadow-lg">
                                    <img src={post.image} alt={post.title} className="w-full h-auto" />
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-12">
                                {/* Social Share - Desktop sticky */}
                                <div className="hidden md:block w-12 shrink-0">
                                    <div className="sticky top-24 flex flex-col gap-4">
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2]">
                                            <Twitter className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500 hover:text-[#0A66C2] hover:border-[#0A66C2]">
                                            <Linkedin className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500 hover:text-[#4267B2] hover:border-[#4267B2]">
                                            <Facebook className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-900">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <article className="flex-1 prose prose-lg prose-slate max-w-none">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </article>
                            </div>

                            {/* Mobile Share */}
                            <div className="md:hidden mt-8 pt-8 border-t border-slate-200">
                                <p className="text-sm font-semibold text-slate-900 mb-4">Share this article</p>
                                <div className="flex gap-4">
                                    <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500">
                                        <Twitter className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500">
                                        <Linkedin className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500">
                                        <Facebook className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full border-slate-200 text-slate-500">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
            </main>
            <Footer />
        </>
    );
}
