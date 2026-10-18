'use client';

import * as React from 'react';
import { Logo, Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Label } from '@talentrix/ui';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('admin@talentrix.io');
  const [password, setPassword] = React.useState('password123');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password. Try admin@talentrix.io');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Logo size="lg" />
          <p className="text-sm text-muted-foreground">Enterprise AI Recruitment Platform</p>
        </div>

        <Card className="border shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>Enter your corporate email and password or use SSO</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
              <div className="relative flex py-1 items-center w-full">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase">or SSO</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <Button variant="outline" type="button" className="w-full" onClick={() => router.push('/dashboard')}>
                Continue with Enterprise SAML / Okta
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
