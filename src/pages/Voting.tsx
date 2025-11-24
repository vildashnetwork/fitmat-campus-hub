import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/Header';
import { Vote as VoteIcon, CheckCircle2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Voting = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = storage.getCurrentUser();
  
  const [selectedCandidate, setSelectedCandidate] = useState<{ electionId: string; candidateId: string } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const elections = storage.getElections();
  const activeElections = elections.filter(e => e.status === 'active');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const hasVoted = (electionId: string) => {
    if (!currentUser) return false;
    return !!storage.getUserVoteForElection(currentUser.id, electionId);
  };

  const getVoteCounts = (electionId: string) => {
    return storage.getVoteCountsForElection(electionId);
  };

  const getTotalVotes = (electionId: string) => {
    const counts = getVoteCounts(electionId);
    return Object.values(counts).reduce((sum, count) => sum + count, 0);
  };

  const handleVoteClick = (electionId: string, candidateId: string) => {
    if (hasVoted(electionId)) {
      toast({
        title: t('common.error'),
        description: 'You have already voted in this election',
        variant: 'destructive',
      });
      return;
    }
    setSelectedCandidate({ electionId, candidateId });
    setShowConfirm(true);
  };

  const confirmVote = () => {
    if (!currentUser || !selectedCandidate) return;

    const vote = {
      id: `v_${Date.now()}`,
      electionId: selectedCandidate.electionId,
      userId: currentUser.id,
      candidateId: selectedCandidate.candidateId,
      votedAt: new Date().toISOString(),
    };

    storage.saveVote(vote);

    toast({
      title: t('common.success'),
      description: 'Your vote has been recorded successfully!',
    });

    setShowConfirm(false);
    setSelectedCandidate(null);
    window.location.reload(); // Refresh to show updated vote status
  };

  const getCandidate = (election: any, candidateId: string) => {
    return election.candidates.find((c: any) => c.id === candidateId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('vote.title')}</h1>
          <p className="text-muted-foreground">
            Participate in secure school elections
          </p>
        </div>

        {activeElections.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="py-12 text-center">
              <VoteIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active elections at the moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {activeElections.map(election => {
              const voted = hasVoted(election.id);
              const voteCounts = getVoteCounts(election.id);
              const totalVotes = getTotalVotes(election.id);

              return (
                <Card key={election.id} className="shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl mb-2">{election.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Ends: {new Date(election.endAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={voted ? 'default' : 'secondary'}>
                        {voted ? t('vote.voted') : 'Active'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {election.candidates.map(candidate => {
                        const voteCount = voteCounts[candidate.id] || 0;
                        const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                        return (
                          <Card key={candidate.id} className="border-2 hover:border-primary transition-smooth">
                            <CardContent className="p-6">
                              <div className="text-5xl mb-4 text-center">{candidate.photo}</div>
                              <h3 className="text-xl font-bold mb-2 text-center">
                                {candidate.name}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {candidate.manifesto}
                              </p>
                              
                              {totalVotes > 0 && (
                                <div className="mb-4">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-muted-foreground">Votes</span>
                                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                                  </div>
                                  <Progress value={percentage} className="h-2" />
                                </div>
                              )}

                              <Button
                                className="w-full gradient-primary text-white"
                                onClick={() => handleVoteClick(election.id, candidate.id)}
                                disabled={voted}
                              >
                                {voted ? (
                                  <>
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    {t('vote.voted')}
                                  </>
                                ) : (
                                  <>
                                    <VoteIcon className="mr-2 h-4 w-4" />
                                    {t('vote.cast')}
                                  </>
                                )}
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      {selectedCandidate && (
        <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('vote.confirm')}</DialogTitle>
              <DialogDescription>
                {t('vote.confirmText')}{' '}
                <span className="font-bold">
                  {getCandidate(
                    elections.find(e => e.id === selectedCandidate.electionId),
                    selectedCandidate.candidateId
                  )?.name}
                </span>
                . {t('vote.cannotUndo')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConfirm(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="gradient-primary text-white" onClick={confirmVote}>
                {t('vote.cast')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Voting;
