'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Play, CheckCircle } from 'lucide-react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<
    { x: number; y: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    setIsVisible(true);

    // Pre-generate random particle positions & animation timings once
    const newParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section className="pt-24 pb-16 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] via-[hsl(var(--hero-gradient-via))] to-[hsl(var(--hero-gradient-to))]">
      {/* Background Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.03\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'1\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            initial={{ opacity: 0, scale: 0, x: p.x, y: p.y }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-cyan-400/10 dark:bg-cyan-500/10 border border-cyan-500/20 dark:border-cyan-500/20 rounded-full px-4 py-2 mb-4"
              >
                <Shield className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span className="text-sm font-medium text-cyan-500 dark:text-cyan-300">
                  East Africa&apos;s Leading Cybersecurity Experts
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              >
                <span className="dark:text-white text-slate-700">Safeguarding</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  East Africa&apos;s
                </span>
                <br />
                <span className="dark:text-white text-slate-700">Digital Space</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Protecting businesses across Kenya, Uganda, Tanzania, Rwanda, and Ethiopia 
                with cutting-edge cybersecurity solutions tailored for the African market.
              </motion.p>

              {/* Key Points */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="grid sm:grid-cols-2 gap-4 mb-8"
              >
                {[
                  'M-Pesa Security Expertise',
                  'Kenya DPA Compliance',
                  '24/7 Threat Monitoring',
                  'AU Malabo Convention',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  Get Free Security Assessment
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-12 pt-8 border-t border-slate-300 dark:border-slate-700"
              >
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 text-center lg:text-left">
                  Trusted by leading organizations across East Africa
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 opacity-60">
                  {['KCB Bank', 'Safaricom', 'EABL', 'Equity Bank', 'NCBA'].map((company, index) => (
                    <div key={index} className="text-slate-600 dark:text-slate-400 font-medium text-sm">
                      {company}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              {/* Main Shield Visual */}
              <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-4 border border-blue-500/20 rounded-full"
                />

                {/* Central Shield */}
                <div className="absolute inset-1/4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-500/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
                  >
                    <Shield className="w-20 h-20 text-cyan-400" />
                  </motion.div>
                </div>

                {/* Floating Elements */}
                {[
                  { icon: '🔒', position: 'top-4 left-4', delay: 0.8 },
                  { icon: '🛡️', position: 'top-4 right-4', delay: 1.0 },
                  { icon: '🔐', position: 'bottom-4 left-4', delay: 1.2 },
                  { icon: '⚡', position: 'bottom-4 right-4', delay: 1.4 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: item.delay }}
                    className={`absolute ${item.position} w-12 h-12 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-slate-600`}
                    aria-hidden="true"
                  >
                    <span className="text-xl">{item.icon}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 gap-4 mt-8"
              >
                <div className="
                bg-slate-300  backdrop-blur-sm border border-slate-400/50 rounded-xl p-4 text-center
                dark:bg-slate-800/50 dark:border-slate-700 ">
                  <div className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">500+</div>
                  <div className="text-sm text-slate-700 dark:text-slate-400">Clients Protected</div>
                </div>
                <div className="bg-slate-300 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-400/50 dark:border-slate-700 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">99.9%</div>
                  <div className="text-sm text-slate-700 dark:text-slate-400">Uptime SLA</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}