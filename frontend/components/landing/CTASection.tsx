'use client';

import { motion } from 'framer-motion';
import { Download, Smartphone, Zap, Lock, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  const benefits = [
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Optimized for smartphones and tablets for on-the-go reporting',
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'App-like experience without App Store requirements',
    },
    {
      icon: Lock,
      title: 'Privacy Focused',
      description: 'Data remains on your device, minimal tracking',
    },
    {
      icon: Wifi,
      title: 'Works Offline',
      description: 'Report violations even without internet connection',
    },
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#f0f7e6] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#6B8E23]/20 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#6B8E23]/20 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Ready to <span className="bg-gradient-to-r from-[#6B8E23] to-[#5a7620] bg-clip-text text-transparent">clean up</span> your city?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Install SẠCH MAP today and start reporting environmental violations in your community. Every report counts.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button className="bg-[#6B8E23] hover:bg-[#5a7620] text-white px-8 py-6 text-lg font-semibold rounded-xl h-auto w-full sm:w-auto group relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Install Now
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#7a9a2e] to-[#5a7620] z-0"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg font-semibold rounded-xl border-[#d8e4c2] hover:bg-[#f0f7e6] w-full sm:w-auto"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white border border-[#e8f2da] rounded-2xl p-8 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f0f7e6] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[#6B8E23]" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                <p className="text-slate-600">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Installation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white border border-[#d8e4c2] rounded-2xl p-8 sm:p-12"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">How to install</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* iOS */}
            <div>
              <div className="text-sm font-bold text-[#6B8E23] mb-4 uppercase tracking-wider">iPhone/iPad</div>
              <ol className="space-y-4">
                {[
                  'Open this page in Safari',
                  'Tap the Share button',
                  'Select "Add to Home Screen"',
                  'Tap "Add" to confirm',
                  'Open from your home screen',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6B8E23] text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Android */}
            <div>
              <div className="text-sm font-bold text-[#6B8E23] mb-4 uppercase tracking-wider">Android</div>
              <ol className="space-y-4">
                {[
                  'Open this page in Chrome',
                  'Tap the menu button (⋮)',
                  'Select "Install app"',
                  'Tap "Install"',
                  'Grant necessary permissions',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6B8E23] text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Desktop */}
            <div>
              <div className="text-sm font-bold text-[#6B8E23] mb-4 uppercase tracking-wider">Desktop (PWA)</div>
              <ol className="space-y-4">
                {[
                  'Open this page in Chrome/Edge',
                  'Look for install icon in URL bar',
                  'Click the install button',
                  'Confirm installation',
                  'App opens in its own window',
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#6B8E23] text-white text-sm font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-slate-600">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-slate-600 mb-6">
            Questions? Check out our <a href="#" className="font-semibold text-[#6B8E23] hover:underline">FAQ</a> or <a href="#" className="font-semibold text-[#6B8E23] hover:underline">contact support</a>
          </p>
          <p className="text-sm text-slate-500">
            SẠCH MAP is free to use. No subscriptions. No tracking. Just community power.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
