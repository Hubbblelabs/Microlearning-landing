# Production Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Configure `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Add `NEXT_PUBLIC_TWITTER_HANDLE`
- [ ] Verify all environment variables are set

### 2. Assets & Media
- [ ] Add `favicon.ico` to `public/`
- [ ] Add `logo.png` (PNG logo for schema.org)
- [ ] Add `og-image.jpg` (1200x630px for social sharing)
- [ ] Add `icon-192.png` (192x192px for PWA)
- [ ] Add `icon-512.png` (512x512px for PWA)
- [ ] Add `apple-touch-icon.png` (180x180px)
- [ ] Optimize all images (compress without quality loss)

### 3. SEO Configuration
- [ ] Update site name in `lib/metadata.ts`
- [ ] Customize default meta description
- [ ] Add social media URLs in `lib/structured-data.ts`
- [ ] Verify keywords are relevant
- [ ] Update company founding date if needed

### 4. Content Review
- [ ] Review all page titles and descriptions
- [ ] Check blog posts for accuracy
- [ ] Verify contact information is correct
- [ ] Review legal pages (privacy, terms, cookies, GDPR)
- [ ] Check for placeholder text or TODOs

### 5. Code Quality
- [ ] Run `npm run type-check` - no TypeScript errors
- [ ] Run `npm run lint` - no linting errors
- [ ] Fix any warnings or errors
- [ ] Remove console.logs (they're auto-removed in production)
- [ ] Review code for sensitive information

### 6. Testing
- [ ] Test all pages load correctly
- [ ] Test navigation and internal links
- [ ] Test forms (if any) work properly
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Safari, Firefox, Edge)
- [ ] Test loading states and error pages
- [ ] Verify 404 page works

### 7. Performance
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Test page load speed
- [ ] Verify images are optimized
- [ ] Check Core Web Vitals
- [ ] Test with slow network (throttling)

### 8. SEO Validation
- [ ] Verify `/sitemap.xml` loads correctly
- [ ] Verify `/robots.txt` loads correctly
- [ ] Check meta tags with [metatags.io](https://metatags.io/)
- [ ] Validate structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test Open Graph with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## Deployment

### 9. Build & Deploy
- [ ] Run `npm run build` locally to test
- [ ] Fix any build errors
- [ ] Deploy to hosting platform (Vercel/Netlify/etc.)
- [ ] Configure environment variables in hosting platform
- [ ] Set up custom domain
- [ ] Configure SSL/HTTPS (auto on Vercel/Netlify)

### 10. Post-Deployment Verification
- [ ] Visit production URL and verify site loads
- [ ] Check all pages are accessible
- [ ] Verify sitemap at `https://yourdomain.com/sitemap.xml`
- [ ] Verify robots.txt at `https://yourdomain.com/robots.txt`
- [ ] Test analytics tracking (check GA real-time reports)
- [ ] Verify security headers with [securityheaders.com](https://securityheaders.com/)
- [ ] Test social sharing (LinkedIn, Twitter, Facebook)
- [ ] Check mobile responsiveness

## Search Engine Setup

### 11. Search Console Registration
- [ ] Add site to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to Google Search Console
- [ ] Add site to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Submit sitemap to Bing

### 12. Analytics Setup
- [ ] Verify Google Analytics is tracking
- [ ] Set up GA4 conversion goals
- [ ] Configure custom events if needed
- [ ] Test analytics in real-time view

## Ongoing Monitoring

### 13. Performance Monitoring
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Review analytics weekly
- [ ] Check for crawl errors in Search Console

### 14. SEO Maintenance
- [ ] Monitor search rankings
- [ ] Update blog regularly
- [ ] Keep content fresh and relevant
- [ ] Fix broken links
- [ ] Update meta descriptions if needed

## Security

### 15. Security Best Practices
- [ ] HTTPS enforced (should be automatic)
- [ ] Security headers configured (HSTS, CSP, etc.)
- [ ] No sensitive data exposed in code
- [ ] Dependencies up to date (`npm outdated`)
- [ ] Regular security audits (`npm audit`)

## Optional Enhancements

### 16. Additional Features
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure CDN (Vercel/Cloudflare auto-configured)
- [ ] Add cookie consent banner if needed (EU compliance)
- [ ] Set up email notifications for form submissions
- [ ] Add chat widget if needed
- [ ] Configure backup strategy

---

## Quick Commands Reference

```bash
# Development
npm run dev

# Quality checks
npm run type-check
npm run lint

# Production build
npm run build
npm run start

# Clean cache
npm run clean
```

## Useful Links

- [Google Search Console](https://search.google.com/search-console)
- [Google Analytics](https://analytics.google.com/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse CI](https://web.dev/lighthouse-ci/)
- [Security Headers](https://securityheaders.com/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

---

**Last Updated**: [Date]
**Deployed By**: [Name]
**Production URL**: [URL]
