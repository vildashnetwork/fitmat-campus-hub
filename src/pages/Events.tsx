import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { Header } from '@/components/Header';
import { Calendar, Trophy } from 'lucide-react';

const Events = () => {
  const { t } = useI18n();
  const [filter, setFilter] = useState<'all' | 'live' | 'upcoming' | 'finished'>('all');

  const allEvents = storage.getEvents();
  const events = filter === 'all' ? allEvents : allEvents.filter(e => e.status === filter);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('events.title')}</h1>
          <p className="text-muted-foreground">
            Place virtual bets on school tournaments
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={(v) => setFilter(v as any)}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="live">
              <span className="mr-1">🔴</span> {t('events.live')}
            </TabsTrigger>
            <TabsTrigger value="upcoming">{t('events.upcoming')}</TabsTrigger>
            <TabsTrigger value="finished">{t('events.finished')}</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <Card key={event.id} className="shadow-card hover:shadow-elevated transition-smooth hover:scale-[1.02]">
              <CardContent className="p-4 md:p-6">

                <div id="matches-images" style={{
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  gap: '12px',
                  height: 200,
                  background: `url(${event?.bg}) center/cover no-repeat`,
                }}>
                  <img
                    src={event?.one}
                    id="img1"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #ccc',
                    }}
                  />
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>vs</p>
                  <img
                    src={event?.two}
                    id="img2"
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '2px solid #ccc',
                    }}
                  />
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{event.tournament}</p>
                    </div>
                    <h3 className="text-lg font-bold mb-1">
                      {event.homeTeam} vs {event.awayTeam}
                    </h3>
                  </div>
                  <Badge
                    variant={
                      event.status === 'live'
                        ? 'destructive'
                        : event.status === 'upcoming'
                          ? 'default'
                          : 'secondary'
                    }
                    className={event.status === 'live' ? 'shadow-glow' : ''}
                  >
                    {event.status}
                  </Badge>
                </div>

                {event.status === 'live' && event.score && (
                  <div className="mb-4 p-3 rounded-lg bg-muted">
                    <p className="text-2xl font-bold text-center text-primary">
                      {event.score.home} - {event.score.away}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.startAt)}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">{t('bet.home')}</p>
                    <p className="font-bold text-primary">{event.odds.home.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">{t('bet.draw')}</p>
                    <p className="font-bold text-primary">{event.odds.draw.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-2 rounded bg-muted">
                    <p className="text-xs text-muted-foreground mb-1">{t('bet.away')}</p>
                    <p className="font-bold text-primary">{event.odds.away.toFixed(2)}</p>
                  </div>
                </div>

                <Link to={`/events/${event.id}`} className="w-full">
                  <Button className="w-full" variant="outline">
                    {event.status === 'finished' ? t('common.view') : t('events.placeBet')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
