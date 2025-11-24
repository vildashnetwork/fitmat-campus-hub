import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';

const Signup = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    password: '',
    ageConfirm: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.ageConfirm) {
      toast({
        title: t('common.error'),
        description: 'You must confirm you are 18+ years old',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.email.endsWith('@fitmat.edu')) {
      toast({
        title: t('common.error'),
        description: 'Please use your FITMAT email address',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    // Check if user already exists
    const existingUser = storage.getUserByEmail(formData.email);
    if (existingUser) {
      toast({
        title: t('common.error'),
        description: 'An account with this email already exists',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      id: `u_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      studentId: formData.studentId,
      role: 'student' as const,
      balance: 1000, // Starting balance
      age: 18,
      verified: true,
      createdAt: new Date().toISOString(),
    };

    storage.saveUser(newUser);
    storage.setCurrentUser(newUser.id);

    toast({
      title: t('common.success'),
      description: 'Account created successfully!',
    });

    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container flex items-center justify-center py-20">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader>
            <CardTitle className="text-2xl">{t('auth.signupTitle')}</CardTitle>
            <CardDescription>Create your FITMAT account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.name')}</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@fitmat.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">{t('auth.studentId')}</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="S12345"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="age"
                  checked={formData.ageConfirm}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, ageConfirm: checked as boolean })
                  }
                />
                <label htmlFor="age" className="text-sm">
                  {t('auth.ageConfirm')}
                </label>
              </div>
              <Button type="submit" className="w-full gradient-primary text-white" disabled={loading}>
                {loading ? t('common.loading') : t('auth.signup')}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('auth.login')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
