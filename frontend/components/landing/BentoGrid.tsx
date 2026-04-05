'use client';

import { motion } from 'framer-motion';
import { Eye, Brain, Zap, AlertCircle } from 'lucide-react';

const features = [
  {
    title: 'Autonomous Observation',
    description: 'Continuously monitors community reports, social media, and embedded sensors for environmental violations.',
    icon: Eye,
    color: 'from-emerald-400 to-emerald-600',
    badge: 'Observe',
  },
  {
    title: 'Reasoning & Planning',
    description: 'Analyzes patterns, classifies violations by severity, and determines the optimal response strategy.',
    icon: Brain,
    color: 'from-blue-400 to-blue-600',
    badge: 'Reason',
  },
  {
    title: 'Automated Action',
    description: 'Executes escalations, creates work orders, notifies authorities, and sends community feedback in real-time.',
    icon: Zap,
    color: 'from-amber-400 to-amber-600',
    badge: 'Act',
  },
  {
    title: 'Smart Escalation',
    description: 'Routes critical issues to appropriate agencies and monitors resolution progress with accountability tracking.',
    icon: AlertCircle,
    color: 'from-red-400 to-red-600',
    badge: 'Escalate',
  },
];

export default function BentoGrid() {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid md:grid-cols-2 gap-6 lg:gap-8"
    >
      {features.map((feature, idx) => {
        const Icon = feature.icon;
        const [from, to] = feature.color.split(' ');

        return (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-[#d8e4c2] rounded-2xl p-8 overflow-hidden transition-all hover:shadow-xl hover:border-[#6B8E23]/50"
          >
            {/* Gradient background */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full blur-2xl transition-all duration-300`} />

            {/* Badge */}
            <div className="relative z-10 mb-6">
              <span className={`inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-linear-to-r ${feature.color}`}>
                {feature.badge}
              </span>
            </div>

            {/* Icon Container */}
            <div className="relative z-10 mb-6">
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                <Icon className="w-7 h-7" />
              </div>
            </div>

            {/* Title and Description */}
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#6B8E23] transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Bottom accent line */}
            <motion.div
              className={`absolute bottom-0 left-0 h-1 bg-linear-to-r ${feature.color}`}
              initial={{ width: '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
