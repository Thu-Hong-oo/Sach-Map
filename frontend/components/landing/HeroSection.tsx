'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  // Text reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const headlineWords = [
    'Agentic AI for',
    'Urban Safety &',
    'Environmental',
    'Governance',
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden bg-white">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-[#d8e4c2] to-transparent rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-[#e8f2da] to-transparent rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main headline with text reveal */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {headlineWords.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold"
              >
                {word === 'Environmental' ? (
                  <span className="bg-linear-to-r from-[#6B8E23] to-[#5a7620] bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : word === 'Governance' ? (
                  <span className="bg-linear-to-r from-[#6B8E23] to-[#4a5f1a] bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  <span className="text-slate-900">{word}</span>
                )}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Transform scattered community environmental reports into structured, actionable urban solutions. Real-time monitoring, AI-powered classification, and automated escalation for violations.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button className="bg-[#6B8E23] hover:bg-[#5a7620] text-white px-8 py-6 text-lg font-semibold rounded-xl group relative overflow-hidden h-auto">
            <span className="relative z-10 flex items-center gap-2">
              Start Reporting
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </span>
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-[#7a9a2e] to-[#5a7620] z-0"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
          <Button
            variant="outline"
            className="px-8 py-6 text-lg font-semibold rounded-xl border-[#d8e4c2] hover:bg-[#f0f7e6]"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Download App
            </span>
          </Button>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mt-12"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg p-4 border border-[#e8f2da] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-[#6B8E23]">2.3K+</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">Reports Today</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg p-4 border border-[#e8f2da] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-[#6B8E23]">89%</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">Resolved</div>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-lg p-4 border border-[#e8f2da] shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl sm:text-3xl font-bold text-[#6B8E23]">24h</div>
            <div className="text-xs sm:text-sm text-slate-600 mt-1">Avg Response</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}