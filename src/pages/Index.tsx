import { Link } from 'react-router-dom';
import { Trophy, Vote, Shield, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { Header } from '@/components/Header';
import heroImage from '@/assets/hero-campus.jpg';
import studentsCheeringImage from '@/assets/students-cheering.jpg';

const Index = () => {
  const { t } = useI18n();
  const events = storage.getEvents();
  const liveEvent = events.find(e => e.status === 'live');
  const upcomingEvents = events.filter(e => e.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden h-[500px] md:h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.6)'
          }}
        />
        <div className="container relative z-10 px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-2xl">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-2xl mb-4 drop-shadow-lg">
              {t('hero.subtitle')}
            </p>
            <p className="text-base md:text-lg mb-8 drop-shadow-md opacity-90">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link to="/events">
                <Button size="lg" className="gradient-primary text-white shadow-glow w-full sm:w-auto">
                  <Trophy className="mr-2 h-5 w-5" />
                  {t('hero.cta.events')}
                </Button>
              </Link>
              <Link to="/voting">
                <Button size="lg" className="glass-panel border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
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
        <section className="container py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-3 w-3 rounded-full bg-destructive animate-pulse shadow-glow"></div>
              <h2 className="text-xl md:text-2xl font-bold">{t('events.live')}</h2>
            </div>
            <Card className="shadow-elevated hover:shadow-glow transition-smooth hover:scale-[1.02]">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">{liveEvent.tournament}</p>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">
                      {liveEvent.homeTeam} vs {liveEvent.awayTeam}
                    </h3>
                    {liveEvent.score && (
                      <p className="text-2xl md:text-3xl font-bold text-primary">
                        {liveEvent.score.home} - {liveEvent.score.away}
                      </p>
                    )}
                  </div>
                  <Link to={`/events/${liveEvent.id}`} className="w-full md:w-auto">
                    <Button size="lg" className="gradient-primary text-white w-full md:w-auto">
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
      <section className="container py-8 md:py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">{t('events.upcoming')}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {upcomingEvents.map(event => (
            <Card key={event.id} className="shadow-card hover:shadow-elevated transition-smooth hover:scale-[1.02]">
              <CardContent className="p-4 md:p-6">
                <p className="text-sm text-muted-foreground mb-2">{event.tournament}</p>
                <h3 className="text-base md:text-lg font-bold mb-4">
                  {event.homeTeam} vs {event.awayTeam}
                </h3>
                <div className="flex justify-between text-xs md:text-sm mb-4">
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
      <section 
        className="relative py-16 md:py-20 overflow-hidden"
        style={{
          backgroundImage: `url(${studentsCheeringImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-secondary/95" />
        <div className="container relative z-10 px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="inline-flex p-3 md:p-4 rounded-full bg-white/20 mb-4 shadow-glow">
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Virtual Betting</h3>
              <p className="text-white/90 text-sm md:text-base">
                Place bets with virtual tokens on school tournaments. No real money involved.
              </p>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg">
              <div className="inline-flex p-3 md:p-4 rounded-full bg-white/20 mb-4 shadow-glow">
                <Vote className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Secure Voting</h3>
              <p className="text-white/90 text-sm md:text-base">
                Participate in school elections with secure, one-person-one-vote system.
              </p>
            </div>
            <div className="text-center glass-panel p-6 rounded-lg sm:col-span-2 lg:col-span-1">
              <div className="inline-flex p-3 md:p-4 rounded-full bg-white/20 mb-4 shadow-glow">
                <Coins className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Free Tokens</h3>
              <p className="text-white/90 text-sm md:text-base">
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
