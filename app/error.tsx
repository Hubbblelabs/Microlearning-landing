'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from './components/ui/Button';
import Container from './components/ui/Container';
import Section from './components/ui/Section';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <Section spacing="xl" className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen flex items-center">
          <Container className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Something went wrong!
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
              We&apos;re sorry, but an unexpected error occurred. Our team has been notified and is working on it.
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={reset}
              >
                Try again
              </Button>
              <Link href="/">
                <Button variant="outline" size="lg">
                  Go home
                </Button>
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && error.message && (
              <div className="mt-8 p-4 bg-red-900/20 border border-red-500 rounded-lg text-left max-w-2xl mx-auto">
                <p className="text-red-300 font-mono text-sm">{error.message}</p>
              </div>
            )}
          </Container>
        </Section>
      </body>
    </html>
  );
}
