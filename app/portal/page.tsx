'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  FileText, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  LogIn
} from 'lucide-react';
import { toast } from 'sonner';

interface ServiceRequest {
  id: string;
  service: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalRequests: number;
  activeServices: number;
  completedServices: number;
  pendingServices: number;
  securityScore: number;
  lastAssessment: number;
}

export default function PortalPage() {
  const { data: session, status } = useSession();
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [newRequestForm, setNewRequestForm] = useState({
    service: '',
    description: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const fetchServiceRequests = useCallback(async () => {
    if (!session) return;
    
    try {
      const response = await fetch('/api/service-requests');
      if (response.ok) {
        const data = await response.json();
        setServiceRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching service requests:', error);
    }
  }, [session]);

  const fetchDashboardStats = useCallback(async () => {
    if (!session) return;
    
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        const data = await response.json();
        setDashboardStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchServiceRequests();
      fetchDashboardStats();
    }
  }, [session, fetchServiceRequests, fetchDashboardStats]);

  const handleNewRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequestForm),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Service request created successfully!');
        setIsNewRequestOpen(false);
        setNewRequestForm({ service: '', description: '', priority: 'medium' });
        fetchServiceRequests();
        fetchDashboardStats();
      } else {
        toast.error(data.error || 'Failed to create service request');
      }
    } catch (error) {
      console.error('Error creating service request:', error);
      toast.error('Failed to create service request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
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

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
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
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground mb-6">
                    Sign in with your Google account to access your cybersecurity dashboard
                  </p>
                  
                  <Button 
                    onClick={() => signIn('google', { callbackUrl: '/portal' })}
                    className="w-full"
                    size="lg"
                  >
                    <LogIn className="h-5 w-5 mr-2" />
                    Continue with Google
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy
                  </p>
                </div>
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
              <h1 className="text-3xl font-bold">Welcome back, {session.user.name}</h1>
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
                    <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                    <Shield className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.totalRequests || 0}</div>
                    <p className="text-xs text-muted-foreground">Total service requests</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.activeServices || 0}</div>
                    <p className="text-xs text-muted-foreground">Services in progress</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Security Score</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{dashboardStats?.securityScore || 0}%</div>
                    <Progress value={dashboardStats?.securityScore || 0} className="mt-2" />
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
                    {serviceRequests.length > 0 ? (
                      serviceRequests.slice(0, 3).map((request) => {
                        const StatusIcon = getStatusIcon(request.status);
                        return (
                          <div key={request.id} className="flex items-center space-x-3">
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(request.status).replace('bg-', 'text-')}`} />
                            <div>
                              <p className="font-medium">{request.service}</p>
                              <p className="text-sm text-muted-foreground">{request.description}</p>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-8">
                        <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No recent activity</p>
                        <p className="text-sm text-muted-foreground">Create your first service request to get started</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Service Requests</h2>
                <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Service Request</DialogTitle>
                      <DialogDescription>
                        Submit a new cybersecurity service request. Our team will review and respond within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleNewRequest} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Service Type</label>
                        <Select 
                          value={newRequestForm.service} 
                          onValueChange={(value) => setNewRequestForm(prev => ({ ...prev, service: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Penetration Testing">Penetration Testing</SelectItem>
                            <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                            <SelectItem value="Security Consulting">Security Consulting</SelectItem>
                            <SelectItem value="Employee Training">Employee Training</SelectItem>
                            <SelectItem value="Incident Response">Incident Response</SelectItem>
                            <SelectItem value="Cloud Security">Cloud Security</SelectItem>
                            <SelectItem value="Digital Forensics">Digital Forensics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Priority</label>
                        <Select 
                          value={newRequestForm.priority} 
                          onValueChange={(value) => setNewRequestForm(prev => ({ ...prev, priority: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low Priority</SelectItem>
                            <SelectItem value="medium">Medium Priority</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          value={newRequestForm.description}
                          onChange={(e) => setNewRequestForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Please describe your requirements in detail..."
                          rows={4}
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsNewRequestOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Creating...' : 'Create Request'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {serviceRequests.length > 0 ? serviceRequests.map((request) => {
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
                            Created: {new Date(request.createdAt).toLocaleDateString()}
                          </div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                }) : (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Service Requests Yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Get started by creating your first cybersecurity service request
                      </p>
                      <Button onClick={() => setIsNewRequestOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create First Request
                      </Button>
                    </CardContent>
                  </Card>
                )}
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
                    <Input value={session.user.name || ''} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input value={session.user.email || ''} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Company</label>
                    <Input value={session.user.company || ''} readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Role</label>
                    <Input value={session.user.role || 'client'} readOnly />
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