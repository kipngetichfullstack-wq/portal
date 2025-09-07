import { Metadata } from 'next';
import { Search, Calendar, User, ArrowRight, Filter } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Cybersecurity Blog | EastSecure Cyber Solutions',
  description: 'Latest insights on East African cybersecurity trends, threats, and best practices.',
};

const blogPosts = [
  {
    id: 1,
    title: 'M-Pesa Security: Protecting Mobile Money in East Africa',
    excerpt: 'Comprehensive guide to securing mobile money platforms against emerging threats targeting financial services across Kenya, Uganda, and Tanzania.',
    author: 'Dr. Sarah Kimani',
    date: '2024-01-15',
    category: 'Mobile Security',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  },
  {
    id: 2,
    title: 'Kenya Data Protection Act: Compliance Strategies for 2024',
    excerpt: 'Navigate the evolving regulatory landscape with practical compliance strategies for businesses operating in Kenya and across East Africa.',
    author: 'James Mwangi',
    date: '2024-01-12',
    category: 'Compliance',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 3,
    title: 'Ransomware Trends in East Africa: Q4 2023 Report',
    excerpt: 'Analysis of ransomware attacks targeting East African organizations, including attack vectors, affected sectors, and prevention strategies.',
    author: 'Dr. Sarah Kimani',
    date: '2024-01-10',
    category: 'Threat Intelligence',
    readTime: '12 min read',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 4,
    title: 'BEC Fraud Prevention for East African SMEs',
    excerpt: 'Business Email Compromise attacks are on the rise. Learn how small and medium enterprises can protect themselves from sophisticated social engineering.',
    author: 'Michael Ochieng',
    date: '2024-01-08',
    category: 'SME Security',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/5380792/pexels-photo-5380792.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 5,
    title: 'Cloud Security for African Financial Institutions',
    excerpt: 'Best practices for securing cloud infrastructure in the African banking sector, with focus on regulatory compliance and data sovereignty.',
    author: 'Grace Wanjiku',
    date: '2024-01-05',
    category: 'Cloud Security',
    readTime: '10 min read',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 6,
    title: 'Incident Response Planning for East African Organizations',
    excerpt: 'Develop effective incident response capabilities tailored to the unique challenges and infrastructure of East African business environments.',
    author: 'David Mutua',
    date: '2024-01-03',
    category: 'Incident Response',
    readTime: '9 min read',
    image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const categories = ['All', 'Mobile Security', 'Compliance', 'Threat Intelligence', 'SME Security', 'Cloud Security', 'Incident Response'];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-gradient-to-br from-background via-primary/20 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Cybersecurity <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8">
              Stay ahead of emerging threats with expert analysis, regional intelligence, 
              and actionable security guidance for East African organizations.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, threats, or topics..."
                className="w-full pl-12 pr-4 py-4 bg-card/50 border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground font-medium">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    category === 'All'
                      ? 'bg-cyan-500 text-primary-foreground shadow-lg shadow-cyan-500/25'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="mb-16">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-2xl p-1 mb-4">
                <div className="bg-card rounded-xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-8 p-8">
                    <div className="order-2 lg:order-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-cyan-500 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                        <span className="text-cyan-400 text-sm">{post.category}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <button className="group flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                          Read More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                    <div className="order-1 lg:order-2">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={100}
                        height={256}
                        className="w-full h-64 lg:h-full object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <article
                key={post.id}
                className="cursor-pointer group bg-card/50 border border-border rounded-xl overflow-hidden hover:border-border/80 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={100}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background/80 backdrop-blur-sm text-cyan-600 dark:text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <button className="group mt-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25"
            >
              Load More Articles
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Informed on East African Cyber Threats
            </h2>
            <p className="text-muted-foreground mb-8">
              Get weekly insights, threat alerts, and security updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-card border border-border rounded-xl placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-primary-foreground px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}