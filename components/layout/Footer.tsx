'use client';

import Link from 'next/link';
import { Shield, Facebook, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </motion.div>
              <div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  EastSecure
                </span>
                <div className="text-xs text-muted-foreground">Cyber Solutions</div>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Safeguarding East Africa's digital landscape with cutting-edge cybersecurity solutions 
              tailored for regional threats and compliance requirements.
            </p>
            
            {/* Newsletter signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="text-sm bg-background/50 border-border/50 focus:border-primary"
                />
                <Button size="sm" className="px-3">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold">Services</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {[
                { name: "Penetration Testing", href: "/services#penetration-testing" },
                { name: "Risk Assessment", href: "/services#risk-assessment" },
                { name: "Security Consulting", href: "/services#consulting" },
                { name: "Employee Training", href: "/services#training" },
                { name: "Incident Response", href: "/services#incident-response" },
                { name: "Cloud Security", href: "/services#cloud-security" },
              ].map((service, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    href={service.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {service.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold">Company</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              {[
                { name: "About Us", href: "/about" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
                { name: "Client Portal", href: "/portal" },
                { name: "Careers", href: "/careers" },
                { name: "Partners", href: "/partners" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Resources */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-bold">Contact & Resources</h3>
            
            {/* Contact info */}
            <div className="space-y-4 text-sm sm:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <div className="font-medium">Nairobi Office</div>
                  <div className="text-muted-foreground text-sm">
                    Westlands Commercial Center<br />
                    Waiyaki Way, Nairobi
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium">+254 700 123 456</div>
                  <div className="text-muted-foreground text-xs">24/7 Emergency: +254 700 SECURE</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-medium">info@eastsecure.co.ke</div>
                  <div className="text-muted-foreground text-xs">Response within 24 hours</div>
                </div>
              </div>
            </div>

            {/* Resource downloads */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Free Resources</h4>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-primary/10">
                  <Download className="h-3 w-3 mr-2" />
                  Cybersecurity Checklist
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs hover:bg-primary/10">
                  <Download className="h-3 w-3 mr-2" />
                  Kenya DPA Compliance Guide
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="my-8 sm:my-12 bg-border/50" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
        >
          <p className="text-muted-foreground text-xs sm:text-sm text-center lg:text-left">
            © 2025 EastSecure Cyber Solutions. All rights reserved. | Licensed in Kenya, Uganda, Tanzania, Rwanda & Ethiopia
          </p>
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/compliance" className="hover:text-primary transition-colors duration-300">
              Compliance
            </Link>
            <Link href="/resources" className="hover:text-primary transition-colors duration-300">
              Resources
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}