import { Metadata } from 'next';
import LandingPage from '@/components/landing/LandingPage';

export const metadata: Metadata = {
  title: 'SẠCH MAP - Agentic AI for Urban Safety & Environmental Governance',
  description:
    'Transform community environmental reports into structured, actionable urban solutions. Real-time monitoring, AI-powered classification, and automated escalation for environmental violations.',
  keywords: [
    'environmental monitoring',
    'urban safety',
    'community reporting',
    'agentic AI',
    'food safety',
    'pollution tracking',
    'green technology',
  ],
  openGraph: {
    title: 'SẠCH MAP - Agentic AI for Urban Safety',
    description:
      'Transforming scattered community reports into structured, actionable urban solutions',
    type: 'website',
    locale: 'vi_VN',
    url: 'https://sachmap.vn',
    siteName: 'SẠCH MAP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SẠCH MAP - Agentic AI for Urban Safety',
    description:
      'Transform environmental reports into actionable urban solutions',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SẠCH MAP',
  },
  manifest: '/manifest.json',
};

export default function Page() {
  return <LandingPage />;
}
