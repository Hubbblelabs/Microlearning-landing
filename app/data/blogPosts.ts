export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    image?: string;
    content: string; // HTML or Markdown content
    author: {
        name: string;
        role: string;
        avatar: string;
    };
}

export const featuredPost: BlogPost = {
    slug: "future-of-frontline-worker-training-india",
    title: "The Future of Frontline Worker Training in India",
    excerpt: "How AI-powered microlearning delivered through messaging platforms is revolutionizing workforce development for 250 million workers.",
    date: "Jan 10, 2025",
    readTime: "8 min read",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop",
    author: {
        name: "Mithran B",
        role: "Learning Strategy Instructor",
        avatar: "https://ui-avatars.com/api/?name=Mithran+B&background=0D9488&color=fff",
    },
    content: `
        <p>The landscape of workforce training in India is undergoing a seismic shift. For decades, training frontline workers meant classroom sessions that pulled them away from production lines, or lengthy manuals that were often ignored. Today, a combination of widespread smartphone penetration and Artificial Intelligence is changing everything.</p>
        
        <h2>The Challenge of Scale</h2>
        <p>With over 250 million frontline workers in sectors like manufacturing, logistics, and retail, the traditional model of "train the trainer" simply cannot scale fast enough. Moreover, language barriers and varying literacy levels have historically made standardized training difficult to implement.</p>
        
        <h2>Enter Microlearning</h2>
        <p>Microlearning breaks down complex topics into bite-sized, digestible modules that take no more than 2-3 minutes to complete. When delivered via platforms workers already use—like WhatsApp and SMS—engagement rates skyrocket.</p>
        
        <blockquote>
            "We've seen completion rates jump from 15% to over 85% simply by moving from a dedicated LMS app to WhatsApp-based delivery."
        </blockquote>
        
        <h2>The Role of AI</h2>
        <p>Artificial Intelligence plays two critical roles in this new ecosystem:</p>
        <ul>
            <li><strong>Personalization:</strong> AI algorithms adapt the learning path based on the worker's performance and pace.</li>
            <li><strong>Support:</strong> AI chatbots provide instant answers to queries in the worker's native language, removing the fear of asking "stupid questions."</li>
        </ul>

        <h2>Looking Ahead</h2>
        <p>As 5G rolls out across India, we expect to see even richer media formats being used. However, the core principle will remain the same: delivering the right knowledge, at the right time, in the most accessible way possible.</p>
    `
};

export const blogPosts: BlogPost[] = [
    {
        slug: "whatsapp-learning-platform-guide",
        title: "WhatsApp as a Learning Platform: A Complete Guide",
        excerpt: "Discover how to leverage WhatsApp's massive reach to deliver effective training content.",
        date: "Jan 8, 2025",
        readTime: "5 min read",
        category: "How-To",
        author: {
            name: "Sajith J",
            role: "Product Manager",
            avatar: "https://ui-avatars.com/api/?name=Sajith+J&background=0D9488&color=fff",
        },
        content: `
            <p>With over 2 billion active users globally, WhatsApp is more than just a messaging app—it's a powerful channel for enterprise communication and, increasingly, learning.</p>
            <h3>Why WhatsApp?</h3>
            <p>The familiarity factor cannot be overstated. Workers don't need to learn a new interface; they just open a chat. This reduces friction to near zero.</p>
            <h3>Key Features for Learning</h3>
            <ul>
                <li><strong>Multimedia Support:</strong> Send images, voice notes, and short videos instantly.</li>
                <li><strong>Interactive Buttons:</strong> Use quick-reply buttons for quizzes and feedback.</li>
                <li><strong>End-to-End Encryption:</strong> Ensure corporate data remains secure.</li>
            </ul>
        `
    },
    {
        slug: "overcoming-literacy-barriers",
        title: "Overcoming Literacy Barriers in Workforce Training",
        excerpt: "Strategies for creating accessible training content using audio, video, and visual aids.",
        date: "Jan 5, 2025",
        readTime: "6 min read",
        category: "Best Practices",
        author: {
            name: "Sahana R",
            role: "Instructional Designer",
            avatar: "https://ui-avatars.com/api/?name=Sahana+R&background=0D9488&color=fff",
        },
        content: `
            <p>One of the biggest hurdles in frontline training is varying literacy levels. Text-heavy manuals are ineffective for workers who may struggle with reading.</p>
            <h3>Voice-First Approach</h3>
            <p>Sending instructional content as voice notes allows workers to listen while they work. It's natural, accessible, and highly effective for retaining information.</p>
            <h3>Visuals Over Text</h3>
            <p>Use infographics and short video clips to demonstrate tasks. "Show, don't tell" is the golden rule here.</p>
        `
    },
    {
        slug: "roi-microlearning-manufacturing",
        title: "The ROI of Microlearning for Manufacturing",
        excerpt: "Case study: How 2-3 minute training modules improved safety compliance by 40%.",
        date: "Jan 2, 2025",
        readTime: "7 min read",
        category: "Case Study",
        author: {
            name: "Kavin Nandha M K",
            role: "Operations Lead",
            avatar: "https://ui-avatars.com/api/?name=Kavin+Nandha+M+K&background=0D9488&color=fff",
        },
        content: `
            <p>Safety training is often seen as a sunk cost. We set out to prove that it's actually a high-yield investment.</p>
            <h3>The Problem</h3>
            <p>Traditional safety briefings were long, boring, and forgettable. Incident rates remained stagnant.</p>
            <h3>The Intervention</h3>
            <p>We replaced monthly hour-long sessions with daily 2-minute safety tips delivered to workers' phones.</p>
            <h3>The Results</h3>
            <p>Within 3 months, safety incidents dropped by 25%, and compliance audit scores improved by 40%.</p>
        `
    },
    {
        slug: "regional-languages-worker-engagement",
        title: "Regional Languages: Key to Worker Engagement",
        excerpt: "Why training in mother tongue languages increases completion rates by 3x.",
        date: "Dec 28, 2024",
        readTime: "4 min read",
        category: "Research",
        author: {
            name: "Mithran B",
            role: "Linguistics Specialist",
            avatar: "https://ui-avatars.com/api/?name=Mithran+B&background=0D9488&color=fff",
        },
        content: `
            <p>Language is not just a medium of communication; it's a medium of trust. When an organization speaks to a worker in their mother tongue, it signals respect.</p>
            <p>Our research shows that training modules delivered in the local dialect have a 300% higher completion rate compared to Hindi or English equivalents in non-native regions.</p>
        `
    },
    {
        slug: "ai-chatbots-training-support",
        title: "AI Chatbots for 24/7 Training Support",
        excerpt: "How AI-powered chatbots provide instant doubt resolution for frontline workers.",
        date: "Dec 24, 2024",
        readTime: "5 min read",
        category: "Technology",
        author: {
            name: "Sajith J",
            role: "CTO",
            avatar: "https://ui-avatars.com/api/?name=Sajith+J&background=0D9488&color=fff",
        },
        content: `
            <p>Imagine a worker on the night shift who forgets the procedure for a machine reset. There's no supervisor around. What do they do?</p>
            <p>With an AI chatbot, they simply text "How do I reset Machine X?" and get an instant, accurate response, potentially saving hours of downtime.</p>
        `
    },
    {
        slug: "safety-training-program-guide",
        title: "Building a Safety Training Program That Works",
        excerpt: "Step-by-step guide to creating effective safety compliance training for factories.",
        date: "Dec 20, 2024",
        readTime: "10 min read",
        category: "How-To",
        author: {
            name: "Sahana R",
            role: "Safety Consultant",
            avatar: "https://ui-avatars.com/api/?name=Sahana+R&background=0D9488&color=fff",
        },
        content: `
            <p>Effective safety training isn't about ticking boxes; it's about building a culture of safety.</p>
            <ol>
                <li><strong>Assess Risks:</strong> Identify the most common hazards in your specific facility.</li>
                <li><strong>Create Relevant Content:</strong> Don't use generic videos. Film your own equipment and environment.</li>
                <li><strong>Reinforce Regularly:</strong> Safety isn't a one-time event. Use spaced repetition to keep it top of mind.</li>
            </ol>
        `
    },
];

export const allPosts = [featuredPost, ...blogPosts];
