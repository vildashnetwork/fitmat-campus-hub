import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';

const Login = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simple mock authentication
    const user = storage.getUserByEmail(email);
    
    if (user) {
      storage.setCurrentUser(user.id);
      toast({
        title: t('common.success'),
        description: `${t('dashboard.welcome')}, ${user.name}!`,
      });
      navigate('/dashboard');
    } else {
      toast({
        title: t('common.error'),
        description: 'Invalid email or password',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-20">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl">{t('auth.loginTitle')}</CardTitle>
            <CardDescription>Enter your FITMAT email to login</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@fitmat.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full gradient-primary text-white" disabled={loading}>
                {loading ? t('common.loading') : t('auth.login')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {t('auth.noAccount')}{' '}
              <Link to="/signup" className="text-primary hover:underline">
                {t('auth.signup')}
              </Link>
            </div>
            <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-2">Demo Accounts:</p>
              <p className="text-muted-foreground">Student: jane@fitmat.edu</p>
              <p className="text-muted-foreground">Admin: admin@fitmat.edu</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
