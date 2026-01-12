'use client';

import Link from 'next/link';
import Button from './components/ui/Button';
import Container from './components/ui/Container';
import Section from './components/ui/Section';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <Section spacing="xl" className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-[70vh] flex items-center">
        <Container className="text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Go home
              </Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg">
                Visit blog
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
      <Footer />
    </>
  );
}
