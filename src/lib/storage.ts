// LocalStorage service for managing app data

export interface User {
  id: string;
  name: string;
  email: string;
  studentId: string;
  role: 'student' | 'admin';
  balance: number;
  age: number;
  verified: boolean;
  createdAt: string;
}

export interface Event {
  id: string;
  tournament: string;
  homeTeam: string;
  awayTeam: string;
  startAt: string;
  status: 'upcoming' | 'live' | 'finished';
  odds: {
    home: number;
    draw: number;
    away: number;
  };
  score?: {
    home: number;
    away: number;
  };
}

export interface Bet {
  id: string;
  userId: string;
  matchId: string;
  selection: 'home' | 'draw' | 'away';
  stake: number;
  payout: number;
  status: 'pending' | 'won' | 'lost' | 'voided';
  placedAt: string;
}

export interface Candidate {
  id: string;
  name: string;
  manifesto: string;
  photo: string;
  color?: string;
  colorIndex?: number;
}

export interface Election {
  id: string;
  title: string;
  candidates: Candidate[];
  startAt: string;
  endAt: string;
  status: 'upcoming' | 'active' | 'closed';
  eligibility: string;
}

export interface Vote {
  id: string;
  electionId: string;
  userId: string;
  candidateId: string;
  votedAt: string;
}

// Initialize default data
const initializeData = () => {
  if (!localStorage.getItem('users')) {
    const defaultUsers: User[] = [
      {
        id: 'u_admin',
        name: 'Admin User',
        email: 'admin@fitmat.edu',
        studentId: 'ADMIN001',
        role: 'admin',
        balance: 10000,
        age: 25,
        verified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'u_student1',
        name: 'Jane Doe',
        email: 'jane@fitmat.edu',
        studentId: 'S12345',
        role: 'student',
        balance: 1500,
        age: 20,
        verified: true,
        createdAt: new Date().toISOString()
      },
      {
        id: 'u_student2',
        name: 'John Smith',
        email: 'john@fitmat.edu',
        studentId: 'S12346',
        role: 'student',
        balance: 2000,
        age: 21,
        verified: true,
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem('events')) {
    const defaultEvents: Event[] = [
      {
        id: 'm_001',
        tournament: 'Inter-FITMAT Cup',
        homeTeam: 'Blue Falcons',
        awayTeam: 'Red Lions',
        startAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        odds: { home: 1.75, draw: 3.25, away: 4.2 }
      },
      {
        id: 'm_002',
        tournament: 'Basketball Championship',
        homeTeam: 'Thunder Hawks',
        awayTeam: 'Storm Eagles',
        startAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        odds: { home: 2.1, draw: 15.0, away: 1.8 }
      },
      {
        id: 'm_003',
        tournament: 'Volleyball Tournament',
        homeTeam: 'Fire Phoenixes',
        awayTeam: 'Ice Dragons',
        startAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'live',
        odds: { home: 1.9, draw: 10.0, away: 2.2 },
        score: { home: 2, away: 1 }
      },
      {
        id: 'm_004',
        tournament: 'Track & Field',
        homeTeam: 'Swift Cheetahs',
        awayTeam: 'Fast Leopards',
        startAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'finished',
        odds: { home: 1.5, draw: 8.0, away: 3.5 },
        score: { home: 5, away: 3 }
      },
      {
        id: 'm_005',
        tournament: 'Tennis Open',
        homeTeam: 'Net Masters',
        awayTeam: 'Court Kings',
        startAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'upcoming',
        odds: { home: 2.5, draw: 20.0, away: 1.6 }
      }
    ];
    localStorage.setItem('events', JSON.stringify(defaultEvents));
  }

  if (!localStorage.getItem('elections')) {
    const defaultElections: Election[] = [
      {
        id: 'e_001',
        title: 'School Prefect Election 2026',
        candidates: [
          {
            id: 'c1',
            name: 'Amina Hassan',
            manifesto: 'I will work to improve student welfare, promote inclusivity, and create more opportunities for extracurricular activities.',
            photo: '👩‍🎓',
            colorIndex: 1
          },
          {
            id: 'c2',
            name: 'Baba Mensah',
            manifesto: 'My focus is on academic excellence, better facilities, and stronger communication between students and administration.',
            photo: '👨‍🎓',
            colorIndex: 2
          },
          {
            id: 'c3',
            name: 'Chioma Okafor',
            manifesto: 'I promise to enhance campus security, organize more social events, and support mental health initiatives.',
            photo: '👩‍💼',
            colorIndex: 3
          }
        ],
        startAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        eligibility: 'all_students'
      }
    ];
    localStorage.setItem('elections', JSON.stringify(defaultElections));
  }

  if (!localStorage.getItem('bets')) {
    localStorage.setItem('bets', JSON.stringify([]));
  }

  if (!localStorage.getItem('votes')) {
    localStorage.setItem('votes', JSON.stringify([]));
  }
};

// Initialize on load
initializeData();

// Storage API
export const storage = {
  // Users
  getUsers: (): User[] => JSON.parse(localStorage.getItem('users') || '[]'),
  getUser: (id: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.id === id);
  },
  getUserByEmail: (email: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.email === email);
  },
  saveUser: (user: User) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));
  },
  updateUserBalance: (userId: string, amount: number) => {
    const users = storage.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.balance += amount;
      localStorage.setItem('users', JSON.stringify(users));
    }
  },

  // Events
  getEvents: (): Event[] => JSON.parse(localStorage.getItem('events') || '[]'),
  getEvent: (id: string): Event | undefined => {
    const events = storage.getEvents();
    return events.find(e => e.id === id);
  },
  saveEvent: (event: Event) => {
    const events = storage.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
    } else {
      events.push(event);
    }
    localStorage.setItem('events', JSON.stringify(events));
  },

  // Bets
  getBets: (): Bet[] => JSON.parse(localStorage.getItem('bets') || '[]'),
  getUserBets: (userId: string): Bet[] => {
    const bets = storage.getBets();
    return bets.filter(b => b.userId === userId);
  },
  saveBet: (bet: Bet) => {
    const bets = storage.getBets();
    bets.push(bet);
    localStorage.setItem('bets', JSON.stringify(bets));
  },

  // Elections
  getElections: (): Election[] => JSON.parse(localStorage.getItem('elections') || '[]'),
  getElection: (id: string): Election | undefined => {
    const elections = storage.getElections();
    return elections.find(e => e.id === id);
  },
  saveElection: (election: Election) => {
    const elections = storage.getElections();
    const index = elections.findIndex(e => e.id === election.id);
    if (index >= 0) {
      elections[index] = election;
    } else {
      elections.push(election);
    }
    localStorage.setItem('elections', JSON.stringify(elections));
  },

  // Votes
  getVotes: (): Vote[] => JSON.parse(localStorage.getItem('votes') || '[]'),
  getUserVoteForElection: (userId: string, electionId: string): Vote | undefined => {
    const votes = storage.getVotes();
    return votes.find(v => v.userId === userId && v.electionId === electionId);
  },
  saveVote: (vote: Vote) => {
    const votes = storage.getVotes();
    votes.push(vote);
    localStorage.setItem('votes', JSON.stringify(votes));
  },
  getVoteCountsForElection: (electionId: string): Record<string, number> => {
    const votes = storage.getVotes();
    const counts: Record<string, number> = {};
    votes.filter(v => v.electionId === electionId).forEach(vote => {
      counts[vote.candidateId] = (counts[vote.candidateId] || 0) + 1;
    });
    return counts;
  },

  // Auth
  getCurrentUser: (): User | null => {
    const userId = localStorage.getItem('currentUserId');
    return userId ? storage.getUser(userId) || null : null;
  },
  setCurrentUser: (userId: string | null) => {
    if (userId) {
      localStorage.setItem('currentUserId', userId);
    } else {
      localStorage.removeItem('currentUserId');
    }
  }
};
