'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const services = [
  { 
    name: 'Penetration Testing', 
    href: '/services#penetration-testing',
    description: 'Comprehensive security assessments for East African infrastructure'
  },
  { 
    name: 'Risk Assessment', 
    href: '/services#risk-assessment',
    description: 'Detailed risk evaluations aligned with regional compliance'
  },
  { 
    name: 'Security Consulting', 
    href: '/services#consulting',
    description: 'Strategic cybersecurity guidance from regional experts'
  },
  { 
    name: 'Employee Training', 
    href: '/services#training',
    description: 'Cybersecurity awareness programs for East African threats'
  },
  { 
    name: 'Incident Response', 
    href: '/services#incident-response',
    description: '24/7 rapid response with regional threat intelligence'
  },
  { 
    name: 'Cloud Security', 
    href: '/services#cloud-security',
    description: 'Secure cloud strategies for East African infrastructure'
  },
  { 
    name: 'Digital Forensics', 
    href: '/services#forensics',
    description: 'Advanced forensic capabilities for incident investigation'
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePage = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary group-hover:text-blue-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <div className="hidden sm:block">
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                EastSecure
              </span>
              <div className="text-xs text-muted-foreground font-medium">
                Cyber Solutions
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    isActivePage('/') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    "h-10 px-4 py-2 rounded-lg",
                    isActivePage('/services') && "bg-accent text-accent-foreground"
                  )}
                >
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2"
                  >
                    {services.map((service) => (
                      <NavigationMenuLink key={service.name} asChild>
                        <Link
                          href={service.href}
                          className="group block select-none space-y-1 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                        >
                          <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">
                            {service.name}
                          </div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            {service.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </motion.div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActivePage('/about') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActivePage('/blog') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
                    isActivePage('/contact') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link href="/portal">
              <Button variant="ghost" size="sm" className="hover:bg-accent">
                Client Portal
              </Button>
            </Link>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 shadow-lg">
                  Free Consultation
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-accent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-full"
              >
                <div className="flex items-center space-x-3 mb-8">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <span className="text-lg font-bold">EastSecure</span>
                    <div className="text-xs text-muted-foreground">Cyber Solutions</div>
                  </div>
                </div>

                <nav className="flex-1 space-y-2">
                  {[
                    { name: 'Home', href: '/' },
                    { name: 'Services', href: '/services' },
                    { name: 'About', href: '/about' },
                    { name: 'Blog', href: '/blog' },
                    { name: 'Contact', href: '/contact' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-accent",
                        isActivePage(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="space-y-6 pt-3 border-t border-border">
                  <Link href="/portal" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start mb-2">
                      Client Portal
                    </Button>
                  </Link>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-primary to-blue-500">
                      Free Consultation
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
