import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Trophy, Vote, TrendingUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { Header } from '@/components/Header';

const Dashboard = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const currentUser = storage.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const userBets = storage.getUserBets(currentUser.id);
  const recentBets = userBets.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('dashboard.welcome')}, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground">Student ID: {currentUser.studentId}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.balance')}
              </CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {currentUser.balance}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {t('dashboard.tokens')}
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Bets</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{userBets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {userBets.filter(b => b.status === 'won').length} won
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {userBets.length > 0
                  ? Math.round(
                    (userBets.filter(b => b.status === 'won').length / userBets.length) * 100
                  )
                  : 0}
                %
              </div>
              <p className="text-xs text-muted-foreground mt-1">Success rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button
              className="gradient-primary text-white"
              onClick={() => navigate('/events')}
            >
              <Trophy className="mr-2 h-4 w-4" />
              {t('events.placeBet')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/voting')}>
              <Vote className="mr-2 h-4 w-4" />
              {t('vote.cast')}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bets */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{t('dashboard.recentBets')}</CardTitle>
          </CardHeader>
          <CardContent>
            {recentBets.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                {t('dashboard.noBets')}
              </p>
            ) : (
              <div className="space-y-4">
                {recentBets.map(bet => {
                  const event = storage.getEvent(bet.matchId);
                  return (
                    <div
                      key={bet.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >




                      <div>
                        <p className="font-medium">
                          {event?.homeTeam} vs {event?.awayTeam}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {bet.selection.toUpperCase()} • {bet.stake} tokens
                        </p>
                      </div>
                      <Badge
                        variant={
                          bet.status === 'won'
                            ? 'default'
                            : bet.status === 'lost'
                              ? 'destructive'
                              : 'secondary'
                        }
                      >
                        {bet.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
