'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Camera,
  Download,
  Eye,
  Lightbulb,
  Lock,
  Map,
  Smartphone,
  Users,
  Zap,
  Wifi,
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle2,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocaleMessages } from '@/lib/hooks/useLocaleMessages';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function LandingPage() {
  const { locale, messages, changeLocale } = useLocaleMessages();
  const landing = useMemo(() => (messages as any).landing, [messages]);
  const isEnglish = locale === 'en';
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installFeedback, setInstallFeedback] = useState('');

  const heroHighlights = landing.hero.title;
  const featureItems = landing.bento.items;
  const workflowStages = landing.workflow.stages;
  const workflowBenefits = landing.workflow.benefits;

  useEffect(() => {
    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const onAppInstalled = () => {
      setDeferredPrompt(null);
      setInstallFeedback(
        isEnglish
          ? 'SACH MAP has been installed successfully.'
          : 'SẠCH MAP đã được cài đặt thành công.'
      );
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
    };
  }, [isEnglish]);

  const scrollToInstallGuide = useCallback(() => {
    const installGuide = document.getElementById('install-guide');
    installGuide?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleInstallClick = useCallback(async () => {
    if (!deferredPrompt) {
      setInstallFeedback(
        isEnglish
          ? 'Your browser does not support install prompt. Follow the installation guide below.'
          : 'Trình duyệt của bạn chưa hỗ trợ popup cài đặt. Hãy làm theo hướng dẫn bên dưới.'
      );
      scrollToInstallGuide();
      return;
    }

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === 'accepted') {
      setInstallFeedback(
        isEnglish
          ? 'Installation started. You can open SACH MAP from your home screen.'
          : 'Đã bắt đầu cài đặt. Bạn có thể mở SẠCH MAP từ màn hình chính.'
      );
    } else {
      setInstallFeedback(
        isEnglish
          ? 'Installation was dismissed. You can try again anytime.'
          : 'Bạn đã đóng hộp thoại cài đặt. Bạn có thể thử lại bất cứ lúc nào.'
      );
      scrollToInstallGuide();
    }

    setDeferredPrompt(null);
  }, [deferredPrompt, isEnglish, scrollToInstallGuide]);

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6B8E23] text-sm font-bold text-white">
                S
              </div>
              <span className="text-xl font-bold text-slate-900">SẠCH MAP</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {landing.nav.features}
              </a>
              <a href="#workflow" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {landing.nav.workflow}
              </a>
              <a href="#impact" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                {landing.nav.impact}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                <Button
                  size="sm"
                  variant={locale === 'vi' ? 'default' : 'ghost'}
                  className={locale === 'vi' ? 'bg-[#6B8E23] text-white hover:bg-[#5a7620]' : 'text-slate-600'}
                  onClick={() => changeLocale('vi')}
                >
                  VI
                </Button>
                <Button
                  size="sm"
                  variant={locale === 'en' ? 'default' : 'ghost'}
                  className={locale === 'en' ? 'bg-[#6B8E23] text-white hover:bg-[#5a7620]' : 'text-slate-600'}
                  onClick={() => changeLocale('en')}
                >
                  EN
                </Button>
              </div>
              <Link href="/home" className="inline-flex h-10 items-center justify-center rounded-md bg-[#6B8E23] px-4 py-2 text-sm font-medium text-white hover:bg-[#5a7620]">
                {landing.nav.launch}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-linear-to-br from-[#d8e4c2] to-transparent opacity-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-[#e8f2da] to-transparent opacity-20 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8e4c2] bg-[#f0f7e6] px-4 py-2 text-sm font-medium text-[#5a7620]">
              <Shield className="h-4 w-4" />
              {landing.hero.kicker}
            </div>
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              {heroHighlights.map((word: string, index: number) => (
                <span key={word} className="text-4xl font-bold sm:text-5xl lg:text-6xl">
                  {index === 0 ? (
                    <span className="bg-linear-to-r from-[#6B8E23] to-[#4a5f1a] bg-clip-text text-transparent">{word}</span>
                  ) : index === heroHighlights.length - 1 ? (
                    <span className="bg-linear-to-r from-[#6B8E23] to-[#5a7620] bg-clip-text text-transparent">{word}</span>
                  ) : (
                    <span className="text-slate-900">{word}</span>
                  )}
                </span>
              ))}
            </div>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              {landing.hero.description}
            </p>
            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="relative h-auto overflow-hidden rounded-xl bg-[#6B8E23] px-8 py-6 text-lg font-semibold text-white hover:bg-[#5a7620]">
                <span className="relative z-10 flex items-center gap-2">
                  {landing.hero.primaryCta}
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="absolute inset-0 bg-linear-to-r from-[#7a9a2e] to-[#5a7620]" />
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-[#d8e4c2] px-8 py-6 text-lg font-semibold hover:bg-[#f0f7e6]"
                onClick={handleInstallClick}
              >
                <span className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  {landing.hero.secondaryCta}
                </span>
              </Button>
            </div>
            {installFeedback ? (
              <p className="mx-auto mt-4 max-w-xl rounded-lg border border-[#d8e4c2] bg-[#f7fbef] px-4 py-2 text-sm text-[#466114]">
                {installFeedback}
              </p>
            ) : null}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-4 sm:gap-6">
            {landing.hero.stats.map((stat: any) => (
              <div key={stat.label} className="rounded-lg border border-[#e8f2da] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="text-2xl font-bold text-[#6B8E23] sm:text-3xl">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-600 sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 h-96 w-full max-w-4xl -translate-x-1/2 bg-linear-to-b from-[#6B8E23]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-linear-to-tl from-[#6B8E23]/10 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/50 bg-red-500/20 px-4 py-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-red-300">{landing.problem.badge}</span>
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">{landing.problem.title}</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">{landing.problem.description}</p>
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {landing.problem.stats.map((stat: any, index: number) => {
              const colors = ['text-red-400', 'text-orange-400', 'text-yellow-400'];
              const borderColors = ['hover:border-red-500/50', 'hover:border-orange-500/50', 'hover:border-yellow-500/50'];
              const icons = [AlertTriangle, TrendingUp, Clock];
              const Icon = icons[index];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-2xl border border-slate-700 bg-linear-to-br from-slate-800 to-slate-800/50 p-8 backdrop-blur-sm transition-colors ${borderColors[index]}`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className={`h-8 w-8 ${colors[index]}`} />
                    <span className={`text-2xl font-bold ${colors[index]}`}>{stat.value}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{stat.label}</h3>
                  <p className="text-sm text-slate-400">{stat.note}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl border border-slate-700 bg-linear-to-r from-slate-800/50 to-slate-700/30 p-8">
            <h3 className="mb-6 text-lg font-bold text-white">{landing.problem.challengeTitle}</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {landing.problem.challenges.map((challenge: any, index: number) => (
                <div key={challenge.title} className="flex gap-4">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                    <span className="font-bold text-red-400">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">{challenge.title}</h4>
                    <p className="text-sm text-slate-400">{challenge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">
              {landing.bento.title.split(' ')[0]} <span className="text-[#6B8E23]">{landing.bento.title.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="max-w-2xl text-xl text-slate-600">{landing.bento.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {featureItems.map((item: any, index: number) => {
              const palettes = ['from-emerald-400 to-emerald-600', 'from-blue-400 to-blue-600', 'from-amber-400 to-amber-600', 'from-red-400 to-red-600'];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-2xl border border-[#d8e4c2] bg-white p-8 transition-all hover:border-[#6B8E23]/50 hover:shadow-xl"
                >
                  <div className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-linear-to-br ${palettes[index]} opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-10`} />
                  <div className="relative z-10 mb-6">
                    <span className={`inline-block rounded-lg bg-linear-to-r ${palettes[index]} px-3 py-1 text-xs font-bold text-white`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="relative z-10 mb-6">
                    <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${palettes[index]} text-white shadow-lg`}>
                      {index === 0 ? <Eye className="h-7 w-7" /> : index === 1 ? <Lightbulb className="h-7 w-7" /> : index === 2 ? <Zap className="h-7 w-7" /> : <Users className="h-7 w-7" />}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-[#6B8E23]">{item.title}</h3>
                    <p className="leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                  <div className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${palettes[index]}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="workflow" className="relative overflow-hidden bg-linear-to-b from-white via-[#f0f7e6] to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute left-1/2 top-0 h-96 w-full max-w-5xl -translate-x-1/2 bg-linear-to-b from-[#6B8E23]/10 to-transparent blur-3xl" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">
              The <span className="text-[#6B8E23]">{landing.workflow.title.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">{landing.workflow.description}</p>
          </div>

          <div className="hidden lg:block">
            <div className="mb-12 flex items-center justify-between gap-4">
              {workflowStages.map((stage: any, index: number) => (
                <div key={stage.title} className="flex flex-1 items-center">
                  <div className="flex-1 rounded-2xl border border-[#d8e4c2] bg-white p-6 text-center transition-all hover:border-[#6B8E23]/50 hover:shadow-lg">
                    <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f7e6] text-[#6B8E23]">
                      {index === 0 ? <Eye className="h-6 w-6" /> : index === 1 ? <Lightbulb className="h-6 w-6" /> : index === 2 ? <Zap className="h-6 w-6" /> : index === 3 ? <Shield className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                    </div>
                    <h3 className="mb-2 font-bold text-slate-900">{stage.title}</h3>
                    <p className="text-sm text-slate-600">{stage.description}</p>
                  </div>
                  {index < workflowStages.length - 1 && <div className="shrink-0 px-4 text-[#6B8E23]"><ArrowRight className="h-6 w-6" /></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:hidden">
            {workflowStages.map((stage: any, index: number) => (
              <div key={stage.title}>
                <div className="rounded-2xl border border-[#d8e4c2] bg-white p-6 text-center">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f7e6] text-[#6B8E23]">
                    {index === 0 ? <Eye className="h-6 w-6" /> : index === 1 ? <Lightbulb className="h-6 w-6" /> : index === 2 ? <Zap className="h-6 w-6" /> : index === 3 ? <Shield className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                  </div>
                  <div className="mb-2 text-sm font-bold text-[#6B8E23]">Step {index + 1}</div>
                  <h3 className="mb-2 font-bold text-slate-900">{stage.title}</h3>
                  <p className="text-sm text-slate-600">{stage.description}</p>
                </div>
                {index < workflowStages.length - 1 && <div className="py-2 text-center text-[#6B8E23]"><ArrowRight className="mx-auto h-6 w-6 rotate-90" /></div>}
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-[#d8e4c2] bg-linear-to-r from-[#f0f7e6] to-white p-8">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">{landing.workflow.title === 'The Agentic Cycle' ? 'Why this matters' : 'Vì sao điều này quan trọng'}</h3>
            <div className="grid gap-8 md:grid-cols-3">
              {workflowBenefits.map((benefit: any) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#6B8E23] text-white">
                    ✓
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-900">{benefit.title}</h4>
                    <p className="text-slate-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="impact" className="bg-linear-to-br from-[#f0f7e6] to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-slate-900">{landing.impact.title}</h2>
          <div className="grid gap-8 md:grid-cols-4">
            {landing.impact.stats.map((stat: any) => (
              <div key={stat.label} className="rounded-2xl border border-[#d8e4c2] bg-white p-8">
                <div className="mb-2 text-4xl font-bold text-[#6B8E23]">{stat.value}</div>
                <p className="font-medium text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-b from-white to-[#f0f7e6] px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-linear-to-br from-[#6B8E23]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-linear-to-tl from-[#6B8E23]/20 to-transparent blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
              {landing.cta.title.split(landing.cta.highlight).map((part: string, index: number) => (
                <span key={index}>
                  {part}
                  {index === 0 && <span className="bg-linear-to-r from-[#6B8E23] to-[#5a7620] bg-clip-text text-transparent">{landing.cta.highlight}</span>}
                </span>
              ))}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-slate-600">{landing.cta.description}</p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="h-auto rounded-xl bg-[#6B8E23] px-8 py-6 text-lg font-semibold text-white hover:bg-[#5a7620]"
                onClick={handleInstallClick}
              >
                <Download className="mr-2 h-5 w-5" />
                {landing.cta.primaryCta}
              </Button>
              <Button variant="outline" className="h-auto rounded-xl border-[#d8e4c2] px-8 py-6 text-lg font-semibold hover:bg-[#f0f7e6]">
                {landing.cta.secondaryCta}
              </Button>
            </div>
          </div>

          <div className="mb-16 grid gap-6 md:grid-cols-2">
            {landing.cta.benefits.map((benefit: any, index: number) => {
              const benefitIcons = [Smartphone, Zap, Lock, Wifi];
              const Icon = benefitIcons[index];
              return (
                <div key={benefit.title} className="rounded-2xl border border-[#e8f2da] bg-white p-8 transition-all hover:shadow-lg">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f7e6]">
                    <Icon className="h-6 w-6 text-[#6B8E23]" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-slate-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div id="install-guide" className="rounded-2xl border border-[#d8e4c2] bg-white p-8 sm:p-12">
            <h3 className="mb-8 text-2xl font-bold text-slate-900">{landing.cta.installTitle}</h3>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                landing.cta.ios,
                landing.cta.android,
                landing.cta.desktop,
              ].map((platform: any) => (
                <div key={platform.title}>
                  <div className="mb-4 text-sm font-bold uppercase tracking-wider text-[#6B8E23]">{platform.title}</div>
                  <ol className="space-y-4">
                    {platform.steps.map((step: string, index: number) => (
                      <li key={step} className="flex gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6B8E23] text-sm font-bold text-white">{index + 1}</span>
                        <span className="text-slate-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="mb-6 text-lg text-slate-600">{landing.cta.faq}</p>
            <p className="text-sm text-slate-500">{landing.cta.free}</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">{landing.footer.product}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#features" className="hover:text-white">{landing.nav.features}</a></li>
                <li><a href="#workflow" className="hover:text-white">{landing.nav.workflow}</a></li>
                <li><a href="#impact" className="hover:text-white">{landing.nav.impact}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">{landing.footer.company}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">{landing.footer.legal}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">{landing.footer.follow}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-8">
            <p className="text-sm text-slate-400">© 2026 SẠCH MAP. {landing.footer.rights}</p>
            <p className="text-sm text-slate-400">{landing.footer.tagline}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
