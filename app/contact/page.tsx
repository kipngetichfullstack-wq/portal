import { Metadata } from 'next';
import { Phone, Mail, Clock, Send, MessageSquare, MessageCircle } from 'lucide-react';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Contact Us | EastSecure Cyber Solutions',
  description: 'Get in touch with East Africa\'s leading cybersecurity experts. Free consultations available.',
};

const contactInfo = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    details: ['+254 700 123 456', '+254 20 123 4567'],
    color: 'text-green-700 dark:text-green-400'
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['+254 700 123 456', '+254 20 123 4567'],
    color: 'text-green-700 dark:text-green-400'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@eastsecure.co.ke', 'support@eastsecure.co.ke'],
    color: 'text-blue-700 dark:text-blue-400'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon - Fri: 8:00 AM - 6:00 PM', 'Emergency: 24/7 Available'],
    color: 'text-orange-700 dark:text-orange-400'
  }
];

// const offices = [
//   {
//     country: 'Kenya',
//     city: 'Nairobi',
//     address: 'Westlands, ABC Place, 5th Floor',
//     phone: '+254 700 123 456',
//     primary: true
//   },
//   {
//     country: 'Uganda',
//     city: 'Kampala',
//     address: 'Nakasero, IPS Building, 3rd Floor',
//     phone: '+256 700 123 456',
//     primary: false
//   },
//   {
//     country: 'Tanzania',
//     city: 'Dar es Salaam',
//     address: 'Masaki, Peninsula Hotel, 2nd Floor',
//     phone: '+255 700 123 456',
//     primary: false
//   }
// ];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
    <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-br from-background via-primary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Get in <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Ready to secure your organization? Our cybersecurity experts are here to help 
              with free consultations and tailored security solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Send us a Message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                      placeholder="+254 700 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Service Interest
                  </label>
                  <select className="w-full px-4 py-3 bg-input border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300">
                    <option value="">Select a service</option>
                    <option value="penetration-testing">Penetration Testing</option>
                    <option value="risk-assessment">Risk Assessment</option>
                    <option value="security-consulting">Security Consulting</option>
                    <option value="employee-training">Employee Training</option>
                    <option value="incident-response">Incident Response</option>
                    <option value="cloud-security">Cloud Security</option>
                    <option value="digital-forensics">Digital Forensics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your cybersecurity needs and challenges..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card/50 border border-border rounded-xl p-6 hover:border-border/80 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 bg-muted rounded-xl ${info.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Regional Offices */}
              {/* <div className="bg-card/50 border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Regional Offices</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-300 ${
                        office.primary
                          ? 'bg-cyan-500/10 border-cyan-500/30' 
                          : 'bg-muted/50 border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">
                          {office.city}, {office.country}
                        </h4>
                        {office.primary && (
                          <span className="bg-cyan-500 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                      <p className="text-muted-foreground text-sm">{office.phone}</p>
                    </div>
                  ))}
                </div>
              </div> */}

              {/* Emergency Contact */}
              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-red-400" />
                  <h3 className="text-xl font-bold">Emergency Response</h3>
                </div>
                <p className="text-muted-foreground mb-4 dark:text-slate-300">
                  Experiencing a security incident? Our emergency response team is available 24/7.
                </p>
                <button className="bg-red-600 hover:bg-red-500 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 dark:text-white">
                  <Phone className="w-5 h-5" />
                  Call Emergency Line
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-12 sm:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-muted-foreground">
              Visit our Nairobi headquarters or connect with our regional offices across East Africa.
            </p>
          </div>
          
          <div className="bg-muted border border-border rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Interactive map integration</p>
              <p className="text-muted-foreground/70 text-sm">Google Maps API integration point</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}