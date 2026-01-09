# Corazor Technology — Official Website

A premium, futuristic website built with Next.js 14, featuring advanced animations, 3D graphics, and a polished user experience.

## Features

- **Next.js 14** with App Router & ISR
- **TailwindCSS** for styling
- **Framer Motion** for component animations
- **GSAP + ScrollTrigger** for advanced scroll animations
- **Lenis** for smooth scrolling
- **React Three Fiber** for 3D graphics
- **Custom magnetic cursor** with hover effects
- **Vercel Analytics** integration
- **Google Analytics** support (optional)
- **Production-ready** deployment configuration

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/          # Contact form API
│   │   └── health/            # Health check endpoint
│   ├── about/                 # About page
│   ├── services/              # Services page
│   ├── case-studies/          # Case studies page
│   ├── contact/               # Contact page
│   ├── layout.tsx             # Root layout with analytics
│   ├── page.tsx               # Homepage
│   ├── sitemap.ts             # SEO sitemap
│   ├── robots.ts              # SEO robots.txt
│   └── globals.css            # Global styles
├── components/
│   ├── animations/            # Animation components
│   ├── sections/              # Page sections
│   └── ui/                    # UI components
├── lib/
│   └── postLaunch.ts          # Post-deployment utilities
└── public/
    └── animations/            # Lottie animations
```

## Technologies

- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- GSAP
- React Three Fiber
- Lenis
- Lottie React
- Vercel Analytics

## Deployment to Vercel

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Set up required env vars (see below)

### Quick Deploy

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

2. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_DEPLOY_ENV=production
   NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX (optional)
   CONTACT_FORM_EMAIL=contact@yourdomain.com
   ```

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `yourproject.vercel.app`

### Custom Domain Setup

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `corazor.com`)

2. **DNS Configuration**:
   
   **Option A: Using Vercel's Nameservers (Recommended)**
   - Vercel will provide nameservers (e.g., `ns1.vercel-dns.com`)
   - Update your domain's nameservers at your registrar
   - Vercel automatically configures DNS records

   **Option B: Using A/AAAA Records**
   - Add A record: `@` → `76.76.21.21`
   - Add AAAA record: `@` → `2606:4700:3034::ac43:9294`
   - Add CNAME record: `www` → `cname.vercel-dns.com`

   **Option C: Using CNAME Record**
   - Add CNAME record: `@` → `cname.vercel-dns.com`
   - Add CNAME record: `www` → `cname.vercel-dns.com`

3. **HTTPS**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - HTTPS is enabled automatically once DNS propagates

4. **Wait for DNS Propagation**:
   - DNS changes can take 24-48 hours to fully propagate
   - Check status in Vercel dashboard

### Post-Deployment Setup

1. **Enable Vercel Analytics**:
   - Go to Project Settings → Analytics
   - Enable Web Analytics (free tier available)

2. **Set Up Monitoring**:
   - Configure health check endpoint: `/api/health`
   - Set up external monitoring (UptimeRobot, Pingdom, etc.)
   - Ping `/api/health` every 5 minutes to keep functions warm

3. **Verify SEO**:
   - Check `/sitemap.xml` is accessible
   - Check `/robots.txt` is accessible
   - Submit sitemap to Google Search Console

4. **Test Contact Form**:
   - Submit a test message
   - Verify email notifications (if configured)
   - Check API logs in Vercel dashboard

## Environment Variables

Create a `.env.local` file for local development:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEPLOY_ENV=development

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Contact Form
CONTACT_FORM_EMAIL=contact@corazor.com
```

For production, set these in Vercel Dashboard → Settings → Environment Variables.

## Build & Production

### Build Locally

```bash
npm run build
npm start
```

### Production Checklist

- ✅ Build passes without errors
- ✅ All environment variables set
- ✅ Analytics configured
- ✅ Custom domain connected
- ✅ SSL certificate active
- ✅ Sitemap accessible
- ✅ Contact form working
- ✅ Health check endpoint responding
- ✅ All pages loading correctly
- ✅ Mobile responsive
- ✅ Performance optimized

## Performance Optimization

- **ISR**: Pages use `revalidate = 60` for fast updates
- **Image Optimization**: Next.js Image component with AVIF/WebP
- **Code Splitting**: Dynamic imports for heavy components
- **CDN Caching**: Static assets cached for 1 year
- **Compression**: Gzip/Brotli enabled
- **Lazy Loading**: 3D scenes and animations load on demand

## Security

- **Security Headers**: Configured in `vercel.json` and `next.config.js`
- **CSP**: Content Security Policy enabled
- **HSTS**: Strict Transport Security enabled
- **Rate Limiting**: Contact form has rate limiting
- **Input Validation**: All API routes validate inputs

## Monitoring & Analytics

- **Vercel Analytics**: Built-in web analytics
- **Google Analytics**: Optional integration
- **Error Tracking**: Vercel Error Tracking
- **Health Checks**: `/api/health` endpoint
- **Performance**: Core Web Vitals tracking

## Support

For issues or questions:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- Contact: contact@corazor.com

---

**Built with ❤️ by Corazor Technology**

