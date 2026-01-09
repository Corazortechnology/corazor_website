# Corazor Technology Website — Post-Launch Maintenance Guide

**Version:** 1.0  
**Last Updated:** January 2025

---

## 1. DAILY CHECKS (1–2 minutes)

### Visit Production Site

Ensure:
- ✅ No errors in console (F12 → Console tab)
- ✅ Pages load < 1.5s (check Network tab)
- ✅ Particle animations work (Hero section, Contact page)
- ✅ Navigation transitions smooth (no janky animations)
- ✅ Mobile menu functions correctly
- ✅ Contact form submission works

### Check Vercel Dashboard

- ✅ No failed builds in recent deployments
- ✅ No unusual errors in Function Logs
- ✅ Analytics data is being collected
- ✅ Health check endpoint (`/api/health`) is responding

**Quick Actions:**
- If errors detected: Check Vercel logs → Identify issue → Create fix → Deploy
- If performance degraded: Run Lighthouse audit → Identify bottlenecks → Optimize

---

## 2. WEEKLY CHECKS

### ⚡ Performance

Run Lighthouse test on:
- Home (`/`)
- Services (`/services`)
- Case Studies (`/case-studies`)
- Contact (`/contact`)

**How to Run:**
1. Open Chrome DevTools (F12)
2. Navigate to **Lighthouse** tab
3. Select: **Performance**, **Accessibility**, **SEO**, **Best Practices**
4. Click **Generate report**

**Ensure:**
- ✅ Performance score > 85
- ✅ Accessibility score > 90
- ✅ SEO > 90

**If Scores Are Low:**
- **Performance:** Check image sizes, verify lazy loading, check for unused JavaScript
- **Accessibility:** Verify all images have `alt` text, check color contrast, test keyboard navigation
- **SEO:** Verify meta descriptions, check OpenGraph tags, ensure canonical URLs

### 🔍 SEO & Indexing

**Google Search Console:**
- ✅ Check coverage report (no errors)
- ✅ Verify sitemap status (submitted and indexed)
- ✅ Check Core Web Vitals (all green)
- ✅ Verify mobile usability (no issues)

**URL Inspection:**
- Test key pages: `/`, `/about`, `/services`, `/case-studies`, `/contact`
- Verify pages are indexed
- Check for crawl errors

**Sitemap Verification:**
- Visit: `https://corazor.com/sitemap.xml`
- Verify all pages are listed
- Check last modified dates are recent
- Ensure no 404 errors in sitemap

---

## 3. MONTHLY MAINTENANCE (Very Important)

### 🧹 Code & Dependency Cleanup

**Update Dependencies:**
```bash
npm outdated
npm update
```

**Remove Unused npm Packages:**
```bash
npx depcheck
npm uninstall package-name
```

**Check for Tailwind Class Duplicates:**
- Use Tailwind IntelliSense to identify duplicates
- Consolidate repeated class combinations
- Remove unused classes: `npx tailwindcss --purge`

**Clean Dead Animations in GSAP:**
- Review GSAP ScrollTrigger instances
- Ensure all triggers are cleaned up on unmount
- Remove unused animations
- Optimize animation timelines
- Check for memory leaks (verify `ScrollTrigger.killAll()` is called)

### 🌐 SEO Optimization

**Check Rankings For:**
- "AI development company"
- "App development company"
- "Web development company"
- "Blockchain development developers"

**Tools:**
- Google Search Console
- Google Analytics
- Ahrefs / SEMrush (if available)

**Update OG Images If Needed:**
- Verify OG images render correctly:
  - Facebook Debugger: https://developers.facebook.com/tools/debug/
  - Twitter Card Validator: https://cards-dev.twitter.com/validator
  - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Update if branding changes or new services launched

### 📊 Analytics Review

**Check:**
- ✅ Top pages (identify most visited)
- ✅ Bounce rate (target: < 60%)
- ✅ Conversion rate (Contact page submissions)
- ✅ Time on page
- ✅ Scroll depth (target: > 50%)

**Use Insights to Refine Content:**
- High bounce rate → Improve page content, add engaging visuals
- Low time on page → Enhance content quality, add interactive elements
- Low conversion rate → A/B test CTAs, simplify contact form
- High exit on contact page → Fix form issues, add trust signals

---

## 4. QUARTERLY IMPROVEMENTS

### ✨ UI/UX Enhancements

- ✅ Update animations for modern feel
- ✅ Add new micro-interactions (button hovers, card tilts, scroll reveals)
- ✅ Refresh hero text to match latest services
- ✅ Improve responsiveness on new device sizes

### 🤖 Tech + Feature Expansion

- ✅ Add new case studies (2-3 per quarter)
- ✅ Add AI demos (LLM chat, RAG examples)
- ✅ Add 3D visuals for new products
- ✅ Expand Services into deeper detail pages:
  - `/services/ai-development`
  - `/services/web-development`
  - `/services/app-development`
  - `/services/blockchain`
- ✅ Add blog or knowledge hub if needed

---

## 5. SECURITY BEST PRACTICES

- ✅ **Rotate API keys** quarterly:
  - Google Analytics ID (if changed)
  - Third-party service API keys
  - Email service credentials
  - Update in Vercel Dashboard → Settings → Environment Variables

- ✅ **Check Vercel security logs:**
  - Review failed authentication attempts
  - Check for suspicious activity
  - Monitor API endpoint abuse

- ✅ **Update dependencies with known CVEs:**
  ```bash
  npm audit
  npm audit fix
  ```
  - Prioritize critical and high severity
  - Test thoroughly after updates

- ✅ **Ensure headers (CSP/HSTS/etc.) remain correct:**
  - Test with: https://securityheaders.com/
  - Verify: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`

- ✅ **Remove unused environment variables:**
  - Review Vercel environment variables
  - Remove unused variables
  - Document all variables

---

## 6. PERFORMANCE ENHANCEMENTS

- ✅ **Compress new images:**
  - Use: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
  - Target: Hero images < 300KB, Case study images < 200KB, Thumbnails < 100KB

- ✅ **Enable AVIF/WebP formats:**
  - Use Next.js Image component
  - Enable lazy loading
  - Use AVIF for modern browsers, WebP as fallback

- ✅ **Lazy-load new components:**
  - Lazy load 3D scenes (React Three Fiber)
  - Lazy load heavy animations
  - Lazy load below-fold content
  - Use `dynamic()` imports for large components

- ✅ **Reduce glow intensity for mobile:**
  - Check mobile breakpoints
  - Reduce `box-shadow` intensity on small screens
  - Optimize neon glow effects

- ✅ **Trim particle count on mobile screens:**
  - Reduce particle count on < 768px
  - Disable 3D scenes on very small screens
  - Optimize particle system performance

---

## 7. BACKUP & FAILOVER CHECKS

- ✅ **Export Vercel build settings:**
  - Document build command: `npm run build`
  - Document output directory: `.next`
  - Document install command: `npm install`
  - Save `vercel.json` in version control

- ✅ **Keep .env backup offline:**
  - Export from Vercel: Settings → Environment Variables
  - Document all variables (without values)
  - Store securely offline
  - Keep `.env.example` updated

- ✅ **Backup route.ts logic and data pipelines:**
  - Export API route handlers
  - Backup contact form logic
  - Save configuration files
  - Version control all code

- ✅ **Export sitemap and metadata snapshots:**
  ```bash
  curl https://corazor.com/sitemap.xml > sitemap-backup.xml
  ```
  - Export `app/metadata.ts`
  - Document SEO changes
  - Keep version history

---

## 8. FUTURE DEVELOPMENT GUIDELINES

### When Creating a New Page:

1. **Create a new section file in `components/sections/`:**
   ```typescript
   // components/sections/NewPage.tsx
   "use client";
   
   import { motion } from "framer-motion";
   // ... other imports
   ```

2. **Use PageTransitionWrapper for route animations:**
   - Wrap page content in transition wrapper
   - Add fade/slide animations

3. **Add metadata tags:**
   ```typescript
   // app/new-page/page.tsx
   import { generatePageMetadata } from "@/app/metadata";
   
   export const metadata = generatePageMetadata({
     title: "New Page Title",
     description: "Page description",
     path: "/new-page",
   });
   ```

4. **Add to `sitemap.ts`:**
   ```typescript
   {
     url: `${baseUrl}/new-page`,
     lastModified: new Date(),
     changeFrequency: 'monthly',
     priority: 0.8,
   }
   ```

5. **Add SEO-friendly content:**
   - Include `<h1>` tag with target keyword
   - Add meta description
   - Include structured data (JSON-LD)
   - Add alt text to all images

6. **Animate with:**
   - **GSAP for scroll:** Use ScrollTrigger for scroll-based animations
   - **Framer Motion for hover:** Use `whileHover`, `whileTap` for interactions

7. **Wrap inside FloatingNeonBlobs if ambient glow needed:**
   ```typescript
   <FloatingNeonBlobs>
     {/* Page content */}
   </FloatingNeonBlobs>
   ```

### When Adding New Animations:

- ✅ **Use global motion presets from `lib/motionPresets.ts`:**
  - Import preset configurations
  - Maintain consistency across site

- ✅ **Keep animation duration < 0.9s:**
  - Entrance animations: 0.6s - 0.9s
  - Hover transitions: 0.2s - 0.3s
  - Scroll reveals: 0.6s - 0.8s

- ✅ **Maintain easing `cubic-bezier(0.16, 1, 0.3, 1)`:**
  - For Framer Motion: `ease: [0.16, 1, 0.3, 1]`
  - For GSAP: `ease: "power3.out"`

---

## 9. FULL POST-LAUNCH CHECKLIST

Use this checklist before marking the site as "production-ready" and after major updates:

### Functionality
- [ ] All pages load without errors
- [ ] Navigation is smooth & transitions consistent
- [ ] Hero particles run without lag
- [ ] Animations are smooth on mobile
- [ ] Magnetic cursor fallback active on phones
- [ ] No CLS (Cumulative Layout Shift) layout shifts
- [ ] Contact form successful submission tested
- [ ] All links work correctly
- [ ] Mobile menu functions properly

### SEO & Metadata
- [ ] SEO metadata present on all pages
- [ ] OG tags render correctly (test with Facebook/Twitter validators)
- [ ] Sitemap is updated and accessible
- [ ] Robots.txt allows indexing
- [ ] Canonical URLs are correct
- [ ] Structured data (JSON-LD) is valid
- [ ] All images have alt text

### Performance
- [ ] Lighthouse > 85 performance score
- [ ] All images optimized (WebP/AVIF)
- [ ] Cache headers working correctly
- [ ] Lazy loading enabled for below-fold content
- [ ] Code splitting implemented
- [ ] Bundle size is optimized
- [ ] No console errors in production

### Security
- [ ] Security headers configured correctly
- [ ] CSP (Content Security Policy) is active
- [ ] HSTS is enabled
- [ ] API routes have rate limiting
- [ ] Environment variables are secure
- [ ] No sensitive data in client-side code

### Build & Deployment
- [ ] Vercel build succeeds without warnings
- [ ] All TypeScript errors resolved
- [ ] No linting errors
- [ ] Environment variables set in Vercel
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Health check endpoint responding

### Analytics & Monitoring
- [ ] Vercel Analytics enabled
- [ ] Google Analytics configured (if used)
- [ ] Error tracking set up
- [ ] Performance monitoring active
- [ ] Health checks scheduled

### Content
- [ ] All copy is accurate and up-to-date
- [ ] Case studies are current
- [ ] Team information is correct
- [ ] Contact information is accurate
- [ ] Social media links work

---

## 10. VERSIONING & TEAM HANDOFF

### Internal Guidelines

**Use Feature Branches:**
```bash
git checkout -b feature/new-page
git checkout -b fix/mobile-navigation
git checkout -b hotfix/contact-form
```

**Use Semantic Commit Messages:**
```
feat: Add new case study page
fix: Resolve mobile navigation issue
perf: Optimize hero particle animations
docs: Update deployment guide
refactor: Clean up GSAP animations
style: Update button hover effects
chore: Update dependencies
```

**Merge Using PRs for Code Reviews:**
1. Create feature branch
2. Make changes and commit
3. Push and create Pull Request
4. At least one team member reviews
5. Check for: code quality, performance impact, accessibility, SEO
6. After approval, merge to main
7. Deploy to production

**Tag Releases Quarterly:**
```bash
# Create tag
git tag -a v1.0.0 -m "Q1 2025 Release"

# Push tag
git push origin v1.0.0
```

**Version Format:**
- **Major** (v2.0.0): Breaking changes
- **Minor** (v1.1.0): New features
- **Patch** (v1.0.1): Bug fixes

---

## Quick Reference

### Important URLs
- **Production Site:** https://corazor.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Health Check:** https://corazor.com/api/health
- **Sitemap:** https://corazor.com/sitemap.xml
- **Robots.txt:** https://corazor.com/robots.txt

### Key Commands
```bash
# Development
npm run dev

# Build
npm run build

# Start production server
npm start

# Lint
npm run lint

# Check dependencies
npm outdated
npm audit
```

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Next Review:** April 2025

---

*This guide is a living document. Update it as the website evolves and new best practices emerge.*
