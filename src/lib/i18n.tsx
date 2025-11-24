import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', fr: 'Accueil' },
  'nav.events': { en: 'Events', fr: 'Événements' },
  'nav.voting': { en: 'Voting', fr: 'Vote' },
  'nav.dashboard': { en: 'Dashboard', fr: 'Tableau de bord' },
  'nav.admin': { en: 'Admin', fr: 'Admin' },
  'nav.login': { en: 'Login', fr: 'Connexion' },
  'nav.signup': { en: 'Sign Up', fr: "S'inscrire" },
  'nav.logout': { en: 'Logout', fr: 'Déconnexion' },
  
  // Hero
  'hero.title': { en: 'FITMAT Institute', fr: 'Institut FITMAT' },
  'hero.subtitle': { en: 'Campus Betting & Voting Platform', fr: 'Plateforme de paris et vote du campus' },
  'hero.description': { en: 'Place virtual bets on school tournaments and vote in secure elections. All with virtual tokens - no real money involved.', fr: 'Placez des paris virtuels sur les tournois scolaires et votez lors d\'élections sécurisées. Tout avec des jetons virtuels - aucun argent réel impliqué.' },
  'hero.cta.events': { en: 'Browse Events', fr: 'Parcourir les événements' },
  'hero.cta.vote': { en: 'Vote Now', fr: 'Voter maintenant' },
  
  // Warning banner
  'warning.virtual': { en: 'This platform uses virtual tokens only. No real-money betting permitted. Designed for educational and recreational use.', fr: 'Cette plateforme utilise uniquement des jetons virtuels. Aucun pari en argent réel autorisé. Conçu pour un usage éducatif et récréatif.' },
  
  // Auth
  'auth.email': { en: 'Email', fr: 'Email' },
  'auth.password': { en: 'Password', fr: 'Mot de passe' },
  'auth.name': { en: 'Full Name', fr: 'Nom complet' },
  'auth.studentId': { en: 'Student ID', fr: 'ID étudiant' },
  'auth.login': { en: 'Login', fr: 'Connexion' },
  'auth.signup': { en: 'Sign Up', fr: "S'inscrire" },
  'auth.loginTitle': { en: 'Welcome Back', fr: 'Bon retour' },
  'auth.signupTitle': { en: 'Create Account', fr: 'Créer un compte' },
  'auth.noAccount': { en: "Don't have an account?", fr: "Vous n'avez pas de compte?" },
  'auth.hasAccount': { en: 'Already have an account?', fr: 'Vous avez déjà un compte?' },
  'auth.ageConfirm': { en: 'I confirm I am 18+ years old', fr: "Je confirme avoir 18 ans et plus" },
  
  // Dashboard
  'dashboard.welcome': { en: 'Welcome back', fr: 'Bon retour' },
  'dashboard.balance': { en: 'Token Balance', fr: 'Solde de jetons' },
  'dashboard.tokens': { en: 'tokens', fr: 'jetons' },
  'dashboard.recentBets': { en: 'Recent Bets', fr: 'Paris récents' },
  'dashboard.noBets': { en: 'No bets placed yet', fr: 'Aucun pari placé pour le moment' },
  'dashboard.quickActions': { en: 'Quick Actions', fr: 'Actions rapides' },
  
  // Events
  'events.title': { en: 'Upcoming Events', fr: 'Événements à venir' },
  'events.live': { en: 'Live', fr: 'En direct' },
  'events.upcoming': { en: 'Upcoming', fr: 'À venir' },
  'events.finished': { en: 'Finished', fr: 'Terminé' },
  'events.placeBet': { en: 'Place Bet', fr: 'Placer un pari' },
  'events.viewDetails': { en: 'View Details', fr: 'Voir les détails' },
  
  // Betting
  'bet.slip': { en: 'Bet Slip', fr: 'Bulletin de pari' },
  'bet.amount': { en: 'Bet Amount', fr: 'Montant du pari' },
  'bet.potential': { en: 'Potential Payout', fr: 'Gain potentiel' },
  'bet.confirm': { en: 'Confirm Bet', fr: 'Confirmer le pari' },
  'bet.home': { en: 'Home', fr: 'Domicile' },
  'bet.draw': { en: 'Draw', fr: 'Match nul' },
  'bet.away': { en: 'Away', fr: 'Extérieur' },
  'bet.odds': { en: 'Odds', fr: 'Cotes' },
  
  // Voting
  'vote.title': { en: 'Active Elections', fr: 'Élections actives' },
  'vote.cast': { en: 'Cast Vote', fr: 'Voter' },
  'vote.voted': { en: 'Voted', fr: 'Voté' },
  'vote.results': { en: 'View Results', fr: 'Voir les résultats' },
  'vote.confirm': { en: 'Confirm Your Vote', fr: 'Confirmez votre vote' },
  'vote.confirmText': { en: 'You are about to cast your vote for', fr: 'Vous êtes sur le point de voter pour' },
  'vote.cannotUndo': { en: 'This action cannot be undone.', fr: 'Cette action ne peut pas être annulée.' },
  
  // Admin
  'admin.title': { en: 'Admin Panel', fr: 'Panneau d\'administration' },
  'admin.events': { en: 'Manage Events', fr: 'Gérer les événements' },
  'admin.elections': { en: 'Manage Elections', fr: 'Gérer les élections' },
  'admin.users': { en: 'Manage Users', fr: 'Gérer les utilisateurs' },
  
  // Common
  'common.loading': { en: 'Loading...', fr: 'Chargement...' },
  'common.error': { en: 'Error', fr: 'Erreur' },
  'common.success': { en: 'Success', fr: 'Succès' },
  'common.cancel': { en: 'Cancel', fr: 'Annuler' },
  'common.save': { en: 'Save', fr: 'Enregistrer' },
  'common.delete': { en: 'Delete', fr: 'Supprimer' },
  'common.edit': { en: 'Edit', fr: 'Modifier' },
  'common.view': { en: 'View', fr: 'Voir' },
  'common.back': { en: 'Back', fr: 'Retour' },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'fr') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};
