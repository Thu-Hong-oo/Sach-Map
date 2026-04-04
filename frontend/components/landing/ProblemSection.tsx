'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Clock } from 'lucide-react';

function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl font-bold text-white mb-2">{count}%</div>
      <p className="text-slate-300 text-lg">{label}</p>
    </div>
  );
}

export default function ProblemSection() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#6B8E23]/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#6B8E23]/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-6"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-semibold">The Problem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Environmental violations go unaddressed
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Communities report problems, but without structured data and coordination, violations slip through the cracks.
          </motion.p>
        </div>

        {/* Statistics Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Food Poisoning Incidents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm hover:border-red-500/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <span className="text-2xl font-bold text-red-400">131</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Food Poisoning Incidents</h3>
            <p className="text-slate-400 text-sm">Reported in 2024 across the city</p>
          </motion.div>

          {/* Manual Processing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm hover:border-orange-500/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-orange-400" />
              <span className="text-2xl font-bold text-orange-400">41%</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Manual Handling</h3>
            <p className="text-slate-400 text-sm">Of reports processed without automation</p>
          </motion.div>

          {/* Delayed Response */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm hover:border-yellow-500/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">7-14 days</span>
            </div>
            <h3 className="text-white font-semibold mb-2">Average Response Time</h3>
            <p className="text-slate-400 text-sm">Before action is taken on violations</p>
          </motion.div>
        </div>

        {/* Key challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-700 rounded-2xl p-8"
        >
          <h3 className="text-white font-bold text-lg mb-6">Why the gap?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Scattered Reports</h4>
                <p className="text-slate-400 text-sm">
                  Community reports come through multiple channels with inconsistent formats
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">No Classification</h4>
                <p className="text-slate-400 text-sm">
                  Critical violations lack structured categorization and priority tagging
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">Manual Coordination</h4>
                <p className="text-slate-400 text-sm">
                  Routing to authorities and tracking requires manual effort and oversight
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 font-bold">4</span>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1">No Intelligence</h4>
                <p className="text-slate-400 text-sm">
                  Reports aren\\'t analyzed for patterns, trends, or emerging risks
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
