'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail } from 'lucide-react';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

interface EmailAuthForm {
  email: string;
  code: string;
  name: string;
  company: string;
  phone: string;
}

export default function EmailAuthDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<EmailAuthForm>({
    email: '',
    code: '',
    name: '',
    company: '',
    phone: ''
  });

  const handleSendCode = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Verification code sent to your email!');
        setStep('verify');
      } else {
        toast.error(data.error || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      toast.error('Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Email verified successfully! Signing you in...');
        setIsOpen(false);
        setStep('email');
        setForm({
          email: '',
          code: '',
          name: '',
          company: '',
          phone: ''
        });
        
        // Sign in with credentials
        await signIn('credentials', { 
          email: form.email,
          callbackUrl: '/portal'
        });
      } else {
        toast.error(data.error || 'Failed to verify email');
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      toast.error('Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('email');
    setForm({
      email: '',
      code: '',
      name: '',
      company: '',
      phone: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" size="lg">
          <Mail className="h-5 w-5 mr-2" />
          Continue with Email
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {step === 'email' ? 'Sign in with Email' : 'Verify Your Email'}
          </DialogTitle>
          <DialogDescription>
            {step === 'email' 
              ? 'Enter your email to receive a verification code'
              : 'Enter the verification code sent to your email'
            }
          </DialogDescription>
        </DialogHeader>
        
        {step === 'email' ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Email Address</label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                required
              />
            </div>
            <Button 
              onClick={handleSendCode} 
              disabled={loading || !form.email}
              className="w-full"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Verification Code</label>
              <Input
                value={form.code}
                onChange={(e) => setForm(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Enter 6-digit code"
                maxLength={6}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Full Name (Optional)</label>
              <Input
                value={form.name}
                onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Company (Optional)</label>
              <Input
                value={form.company}
                onChange={(e) => setForm(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Your company"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Phone (Optional)</label>
              <Input
                value={form.phone}
                onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+254 700 123 456"
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('email')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleVerifyEmail} 
                disabled={loading || !form.code}
                className="flex-1"
              >
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}