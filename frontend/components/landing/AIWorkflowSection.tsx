'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Lightbulb, Zap, Eye as Monitor, AlertCircle, ArrowRight } from 'lucide-react';

const stages = [
  {
    number: 1,
    title: 'Observe',
    description: 'Analyze incoming community reports, sensor data, and environmental signals',
    icon: Eye,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    number: 2,
    title: 'Plan',
    description: 'Reason about violations, determine severity, and decide action strategy',
    icon: Lightbulb,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    number: 3,
    title: 'Act',
    description: 'Execute escalations, notify authorities, send notifications to community',
    icon: Zap,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    number: 4,
    title: 'Monitor',
    description: 'Track resolution progress and measure response effectiveness',
    icon: Monitor,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
  },
  {
    number: 5,
    title: 'Escalate',
    description: 'Ensure critical cases reach appropriate decision-makers',
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
  },
];

export default function AIWorkflowSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="workflow" ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-[#f0f7e6] to-white overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-5xl h-96 bg-linear-to-b from-[#6B8E23]/10 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              The <span className="text-[#6B8E23]">Agentic Cycle</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Continuous monitoring and coordinated response through agentic intelligence
            </p>
          </motion.div>
        </div>

        {/* Workflow Diagram */}
        <div className="relative">
          {/* Desktop view - Horizontal flow */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between gap-4 mb-12">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div key={idx} className="flex items-center flex-1">
                    {/* Stage card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className={`flex-1 ${stage.bg} border border-[#d8e4c2] rounded-2xl p-6 text-center backdrop-blur-sm hover:border-[#6B8E23]/50 transition-all`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stage.bg} ${stage.color} mb-4 mx-auto`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{stage.title}</h3>
                      <p className="text-sm text-slate-600">{stage.description}</p>
                    </motion.div>

                    {/* Arrow */}
                    {idx < stages.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={
                          inView
                            ? { repeat: Infinity, duration: 2 }
                            : { duration: 0.6, delay: idx * 0.1 + 0.3 }
                        }
                        viewport={{ once: true }}
                        animate={inView ? { x: [0, 8, 0] } : {}}
                        className="shrink-0 px-4"
                      >
                        <ArrowRight className="w-6 h-6 text-[#6B8E23]" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Cycle arrow at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-slate-500 text-sm font-medium"
            >
              <motion.div animate={inView ? { opacity: [0.5, 1, 0.5] } : {}} transition={{ repeat: Infinity, duration: 3 }}>
                ↻ Continuous cycle
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile view - Vertical stack */}
          <div className="lg:hidden">
            <div className="space-y-4">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                return (
                  <div key={idx}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className={`${stage.bg} border border-[#d8e4c2] rounded-2xl p-6 text-center`}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stage.bg} ${stage.color} mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#6B8E23] mb-2">Step {stage.number}</div>
                      <h3 className="font-bold text-slate-900 mb-2">{stage.title}</h3>
                      <p className="text-sm text-slate-600">{stage.description}</p>
                    </motion.div>
                    {idx < stages.length - 1 && (
                      <motion.div
                        animate={inView ? { y: [0, 8, 0] } : {}}
                        transition={inView ? { repeat: Infinity, duration: 2 } : {}}
                        className="text-center py-2"
                      >
                        <ArrowRight className="w-6 h-6 text-[#6B8E23] rotate-90 mx-auto" />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-linear-to-r from-[#f0f7e6] to-white border border-[#d8e4c2] rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Why this matters</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#6B8E23] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Speed</h4>
                <p className="text-slate-600">Issues resolved in hours, not days</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#6B8E23] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Consistency</h4>
                <p className="text-slate-600">Every report handled by the same standards</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-[#6B8E23] flex items-center justify-center">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Scalability</h4>
                <p className="text-slate-600">Handles 1000+ reports with same quality</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
