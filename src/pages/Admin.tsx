import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Shield, Users, Trophy, Vote } from 'lucide-react';

const Admin = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  if (!currentUser || currentUser.role !== 'admin') return null;

  const allUsers = storage.getUsers();
  const allEvents = storage.getEvents();
  const allBets = storage.getBets();
  const allElections = storage.getElections();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">{t('admin.title')}</h1>
          </div>
          <p className="text-muted-foreground">
            Manage events, elections, and users
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allUsers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {allUsers.filter(u => u.role === 'student').length} students
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allEvents.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {allEvents.filter(e => e.status === 'live').length} live
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allBets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {allBets.filter(b => b.status === 'pending').length} pending
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Elections</CardTitle>
              <Vote className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{allElections.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {allElections.filter(e => e.status === 'active').length} active
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('admin.events')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create and manage sporting events, set odds, and update results.
              </p>
              <div className="space-y-2">
                <Button className="w-full gradient-primary text-white">
                  Create New Event
                </Button>
                <Button variant="outline" className="w-full">
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('admin.elections')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create elections, add candidates, and publish results.
              </p>
              <div className="space-y-2">
                <Button className="w-full gradient-secondary text-white">
                  Create New Election
                </Button>
                <Button variant="outline" className="w-full">
                  View All Elections
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>{t('admin.users')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manage user accounts, adjust balances, and view activity.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  View All Users
                </Button>
                <Button variant="outline" className="w-full">
                  Audit Logs
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure platform settings and security options.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Platform Settings
                </Button>
                <Button variant="outline" className="w-full">
                  Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-card mt-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allBets.slice(-5).reverse().map(bet => {
                const user = storage.getUser(bet.userId);
                const event = storage.getEvent(bet.matchId);
                return (
                  <div key={bet.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">
                        {user?.name} placed a bet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {event?.homeTeam} vs {event?.awayTeam} • {bet.stake} tokens
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(bet.placedAt).toLocaleTimeString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
