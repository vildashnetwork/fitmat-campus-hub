import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { ArrowLeft, Trophy, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = storage.getCurrentUser();
  
  const [event, setEvent] = useState(id ? storage.getEvent(id) : null);
  const [selectedBet, setSelectedBet] = useState<'home' | 'draw' | 'away' | null>(null);
  const [betAmount, setBetAmount] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Event not found</p>
          <Button onClick={() => navigate('/events')} className="mt-4">
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOdds = () => {
    if (!selectedBet) return 0;
    return event.odds[selectedBet];
  };

  const getPotentialPayout = () => {
    const amount = parseFloat(betAmount) || 0;
    return Math.floor(amount * getOdds());
  };

  const handleBetClick = (selection: 'home' | 'draw' | 'away') => {
    if (event.status === 'finished') {
      toast({
        title: t('common.error'),
        description: 'Cannot bet on finished events',
        variant: 'destructive',
      });
      return;
    }
    setSelectedBet(selection);
  };

  const handlePlaceBet = () => {
    if (!currentUser) return;
    
    const amount = parseFloat(betAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: t('common.error'),
        description: 'Please enter a valid amount',
        variant: 'destructive',
      });
      return;
    }

    if (amount > currentUser.balance) {
      toast({
        title: t('common.error'),
        description: 'Insufficient balance',
        variant: 'destructive',
      });
      return;
    }

    setShowConfirm(true);
  };

  const confirmBet = () => {
    if (!currentUser || !selectedBet) return;

    const amount = parseFloat(betAmount);
    const bet = {
      id: `b_${Date.now()}`,
      userId: currentUser.id,
      matchId: event.id,
      selection: selectedBet,
      stake: amount,
      payout: getPotentialPayout(),
      status: 'pending' as const,
      placedAt: new Date().toISOString(),
    };

    storage.saveBet(bet);
    storage.updateUserBalance(currentUser.id, -amount);

    toast({
      title: t('common.success'),
      description: `Bet placed successfully! Ticket ID: ${bet.id}`,
    });

    setShowConfirm(false);
    setSelectedBet(null);
    setBetAmount('');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      <div className="container py-8 px-4">
        <Button variant="ghost" onClick={() => navigate('/events')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('common.back')}
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Event Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">{event.tournament}</p>
                    </div>
                    <CardTitle className="text-3xl mb-2">
                      {event.homeTeam} vs {event.awayTeam}
                    </CardTitle>
                  </div>
                  <Badge
                    variant={
                      event.status === 'live'
                        ? 'destructive'
                        : event.status === 'upcoming'
                        ? 'default'
                        : 'secondary'
                    }
                    className="text-lg px-3 py-1"
                  >
                    {event.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <Calendar className="h-4 w-4" />
                  {formatDate(event.startAt)}
                </div>

                {event.status === 'live' && event.score && (
                  <div className="mb-6 p-6 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
                    <p className="text-sm text-muted-foreground mb-2 text-center">
                      Current Score
                    </p>
                    <p className="text-5xl font-bold text-center text-primary">
                      {event.score.home} - {event.score.away}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleBetClick('home')}
                    disabled={event.status === 'finished'}
                    className={`p-6 rounded-lg border-2 transition-smooth hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                      selectedBet === 'home'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground mb-2">{t('bet.home')}</p>
                    <p className="text-xl font-bold">{event.homeTeam}</p>
                    <p className="text-2xl font-bold text-primary mt-2">
                      {event.odds.home.toFixed(2)}
                    </p>
                  </button>

                  <button
                    onClick={() => handleBetClick('draw')}
                    disabled={event.status === 'finished'}
                    className={`p-6 rounded-lg border-2 transition-smooth hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                      selectedBet === 'draw'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground mb-2">{t('bet.draw')}</p>
                    <p className="text-xl font-bold">Draw</p>
                    <p className="text-2xl font-bold text-primary mt-2">
                      {event.odds.draw.toFixed(2)}
                    </p>
                  </button>

                  <button
                    onClick={() => handleBetClick('away')}
                    disabled={event.status === 'finished'}
                    className={`p-6 rounded-lg border-2 transition-smooth hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 ${
                      selectedBet === 'away'
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <p className="text-sm text-muted-foreground mb-2">{t('bet.away')}</p>
                    <p className="text-xl font-bold">{event.awayTeam}</p>
                    <p className="text-2xl font-bold text-primary mt-2">
                      {event.odds.away.toFixed(2)}
                    </p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bet Slip */}
          <div className="lg:col-span-1">
            <Card className="glass-panel shadow-glow sticky top-24">
              <CardHeader>
                <CardTitle>{t('bet.slip')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedBet ? (
                  <>
                    <div className="p-4 rounded-lg bg-muted">
                      <p className="text-sm text-muted-foreground mb-1">Selection</p>
                      <p className="font-bold">
                        {selectedBet === 'home'
                          ? event.homeTeam
                          : selectedBet === 'away'
                          ? event.awayTeam
                          : 'Draw'}
                      </p>
                      <p className="text-sm text-primary mt-1">
                        {t('bet.odds')}: {getOdds().toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">{t('bet.amount')}</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        min="1"
                      />
                      {currentUser && (
                        <p className="text-xs text-muted-foreground">
                          Available: {currentUser.balance} tokens
                        </p>
                      )}
                    </div>

                    {betAmount && (
                      <div className="p-4 rounded-lg bg-success/10 border border-success">
                        <p className="text-sm text-muted-foreground mb-1">
                          {t('bet.potential')}
                        </p>
                        <p className="text-2xl font-bold text-success">
                          {getPotentialPayout()} tokens
                        </p>
                      </div>
                    )}

                    <Button
                      className="w-full gradient-primary text-white"
                      onClick={handlePlaceBet}
                      disabled={!betAmount || parseFloat(betAmount) <= 0}
                    >
                      {t('bet.confirm')}
                    </Button>
                  </>
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    Select an outcome to place a bet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Bet</DialogTitle>
            <DialogDescription>
              You are about to place a bet. Please review the details.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Match:</span>
              <span className="font-medium">
                {event.homeTeam} vs {event.awayTeam}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selection:</span>
              <span className="font-medium">
                {selectedBet === 'home'
                  ? event.homeTeam
                  : selectedBet === 'away'
                  ? event.awayTeam
                  : 'Draw'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Stake:</span>
              <span className="font-medium">{betAmount} tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Odds:</span>
              <span className="font-medium">{getOdds().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-medium">Potential Payout:</span>
              <span className="font-bold text-success">{getPotentialPayout()} tokens</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirm(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="gradient-primary text-white" onClick={confirmBet}>
              {t('bet.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventDetail;
