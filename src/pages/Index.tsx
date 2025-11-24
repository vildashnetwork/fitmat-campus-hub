import { Link } from 'react-router-dom';
import { Trophy, Vote, Shield, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { Header } from '@/components/Header';

const Index = () => {
  const { t } = useI18n();
  const events = storage.getEvents();
  const liveEvent = events.find(e => e.status === 'live');
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="gradient-primary text-white">
                  <Trophy className="mr-2 h-5 w-5" />
                  {t('hero.cta.events')}
                </Button>
              </Link>
              <Link to="/voting">
                <Button size="lg" variant="outline">
                  <Vote className="mr-2 h-5 w-5" />
                  {t('hero.cta.vote')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="border-y bg-warning/10">
        <div className="container py-4">
          <Alert className="border-warning">
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-sm font-medium">
              {t('warning.virtual')}
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Live Event Highlight */}
      {liveEvent && (
        <section className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-destructive animate-pulse"></div>
              <h2 className="text-2xl font-bold">{t('events.live')}</h2>
            </div>
            <Card className="shadow-elevated hover:shadow-xl transition-smooth">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{liveEvent.tournament}</p>
                    <h3 className="text-2xl font-bold mb-2">
                      {liveEvent.homeTeam} vs {liveEvent.awayTeam}
                    </h3>
                    {liveEvent.score && (
                      <p className="text-3xl font-bold text-primary">
                        {liveEvent.score.home} - {liveEvent.score.away}
                      </p>
                    )}
                  </div>
                  <Link to={`/events/${liveEvent.id}`}>
                    <Button size="lg" className="gradient-primary text-white">
                      {t('events.placeBet')}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      <section className="container py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">{t('events.upcoming')}</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="shadow-card hover:shadow-elevated transition-smooth">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">{event.tournament}</p>
                <h3 className="text-lg font-bold mb-4">
                  {event.homeTeam} vs {event.awayTeam}
                </h3>
                <div className="flex justify-between text-sm mb-4">
                  <div className="text-center">
                    <p className="text-muted-foreground">{t('bet.home')}</p>
                    <p className="font-bold text-primary">{event.odds.home.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">{t('bet.draw')}</p>
                    <p className="font-bold text-primary">{event.odds.draw.toFixed(2)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-muted-foreground">{t('bet.away')}</p>
                    <p className="font-bold text-primary">{event.odds.away.toFixed(2)}</p>
                  </div>
                </div>
                <Link to={`/events/${event.id}`} className="w-full">
                  <Button className="w-full" variant="outline">
                    {t('events.viewDetails')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full gradient-primary mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Virtual Betting</h3>
              <p className="text-muted-foreground">
                Place bets with virtual tokens on school tournaments. No real money involved.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full gradient-secondary mb-4">
                <Vote className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Voting</h3>
              <p className="text-muted-foreground">
                Participate in school elections with secure, one-person-one-vote system.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full bg-warning mb-4">
                <Coins className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Free Tokens</h3>
              <p className="text-muted-foreground">
                Get free virtual tokens daily. Earn more through referrals and participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 FITMAT Institute. Educational platform using virtual tokens only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
