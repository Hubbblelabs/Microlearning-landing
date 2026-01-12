# Microlearning Landing Page

AI-Powered Training for India's 250M+ Frontline Workers

Website: [micro-learning.app](https://micro-learning.app)

## 🚀 Features

- **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, structured data (JSON-LD)
- **Production Ready**: Security headers, performance optimization, error handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Stack**: Next.js 16, React 19, TypeScript, Framer Motion, GSAP
- **Analytics Ready**: Google Analytics integration
- **Dynamic Sitemap**: Auto-generated sitemap and robots.txt
- **Accessibility**: WCAG compliant with skip links and semantic HTML
- **PWA Support**: Web app manifest for progressive web app capabilities
- **WhatsApp & SMS Delivery**: No app install needed
- **AI-Powered**: Smart modules and 24/7 assistant
- **Multilingual**: Support for 12+ Indian languages
- **Zero Literacy Barrier**: Audio, video, and voice interactions

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd Microlearning-landing
npm install
```

### Environment Setup

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your values:
```env
NEXT_PUBLIC_SITE_URL=https://micro-learning.app
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_TWITTER_HANDLE=@microlearning
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
npm run start
```

## 📦 Project Structure

```
├── app/
│   ├── components/       # Reusable components
│   ├── constants/        # App constants
│   ├── data/            # Static data (blog posts, etc.)
│   ├── about/           # About page
│   ├── blog/            # Blog listing and posts
│   ├── careers/         # Careers page
│   ├── legal/           # Legal pages
│   ├── layout.tsx       # Root layout with SEO
│   ├── sitemap.ts       # Dynamic sitemap
│   └── robots.ts        # Robots.txt
├── lib/
│   ├── metadata.ts      # SEO utilities
│   ├── structured-data.ts  # Schema.org JSON-LD
│   └── analytics.tsx    # Analytics setup
```

## 🔧 Production Features

### SEO & Performance
- Complete meta tags, Open Graph, Twitter Cards
- Structured data (JSON-LD) for search engines
- Auto-generated sitemap.xml and robots.txt
- Security headers (HSTS, CSP, X-Frame-Options)
- Image optimization
- Code splitting & lazy loading

### Analytics & Monitoring
- Google Analytics integration
- Custom event tracking
- Error monitoring

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - TypeScript type checking
- `npm run clean` - Clean build cache

## 🚀 Deployment Checklist

Before deploying to production:

1. ✅ Set environment variables in `.env.local`
2. ✅ Add favicon and social media images to `public/`
3. ✅ Configure Google Analytics ID
4. ✅ Update site URL in metadata
5. ✅ Run `npm run type-check` and `npm run lint`
6. ✅ Test production build locally with `npm run build && npm run start`
7. ✅ Review sitemap at `/sitemap.xml`
8. ✅ Review robots.txt at `/robots.txt`

## Tech Stack

- **Framework**: Next.js 16 + React 19
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion + GSAP
- **Icons**: Lucide React
- **Typography**: Inter, JetBrains Mono, Source Serif 4

## 📄 License

All rights reserved.

---

Built with ❤️ for India's frontline workforce
