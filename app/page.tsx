'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  FileText, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';

// Mock user data - In a real app, this would come from authentication
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  company: 'Example Corp',
  role: 'client'
};

// Mock service requests
const mockServiceRequests = [
  {
    id: '1',
    service: 'Penetration Testing',
    description: 'Web application security assessment for our e-commerce platform',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-12')
  },
  {
    id: '2',
    service: 'Risk Assessment',
    description: 'Comprehensive cybersecurity risk evaluation',
    priority: 'medium',
    status: 'completed',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-08')
  },
  {
    id: '3',
    service: 'Employee Training',
    description: 'Cybersecurity awareness training for 50 employees',
    priority: 'low',
    status: 'pending',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12')
  }
];

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    company: '', 
    phone: '' 
  });
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    // Check if user is authenticated (mock implementation)
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        toast.success(data.message || 'Login successful!');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuthenticated(true);
        toast.success(data.message || 'Registration successful! Welcome to EastSecure.');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return AlertCircle;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="py-20 mt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Client Portal</CardTitle>
                <CardDescription>
                  Access your cybersecurity services and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Password</label>
                        <Input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Your password"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Full Name *</label>
                        <Input
                          required
                          value={registerForm.name}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          required
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Password *</label>
                        <Input
                          type="password"
                          required
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                          placeholder="Create a strong password"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Company</label>
                        <Input
                          value={registerForm.company}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="Your organization"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <Input
                          value={registerForm.phone}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+254 700 123 456"
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Register
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="py-8 bg-background min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {mockUser.name}</h1>
              <p className="text-muted-foreground">Manage your cybersecurity services and view reports</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Services in progress</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <Progress value={92} className="mt-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Assessment</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5 days</div>
                    <p className="text-xs text-muted-foreground">ago</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest cybersecurity service updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Risk Assessment Completed</p>
                        <p className="text-sm text-muted-foreground">Your comprehensive risk report is ready for review</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Penetration Testing In Progress</p>
                        <p className="text-sm text-muted-foreground">Testing phase 2 of 3 currently underway</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Training Session Scheduled</p>
                        <p className="text-sm text-muted-foreground">Employee cybersecurity training on January 20th</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Service Requests</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>

              <div className="space-y-4">
                {mockServiceRequests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{request.service}</CardTitle>
                            <CardDescription>{request.description}</CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={request.priority === 'high' ? 'destructive' : request.priority === 'medium' ? 'default' : 'secondary'}
                            >
                              {request.priority} priority
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Created: {request.createdAt.toLocaleDateString()}
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <h2 className="text-2xl font-bold">Security Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Assessment Report</CardTitle>
                    <CardDescription>Comprehensive cybersecurity risk evaluation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Overall Risk Score</span>
                        <Badge variant="default">Medium Risk</Badge>
                      </div>
                      <Progress value={35} className="h-2" />
                      <p className="text-sm text-muted-foreground">
                        Last updated: January 8, 2025
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Penetration Test Results</CardTitle>
                    <CardDescription>Web application security assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-destructive">2</div>
                          <div className="text-xs text-muted-foreground">Critical</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-500">5</div>
                          <div className="text-xs text-muted-foreground">High</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-500">8</div>
                          <div className="text-xs text-muted-foreground">Medium</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Status: In Progress
                      </p>
                      <Button variant="outline" className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input value={mockUser.name} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                      <Input value={mockUser.email} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company</label>
                      <Input value={mockUser.company} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role</label>
                      <Input value={mockUser.role} readOnly />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}