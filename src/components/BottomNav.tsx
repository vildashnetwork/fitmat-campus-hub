import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Vote, User, Trophy } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export const BottomNav = () => {
  const location = useLocation();
  const { t } = useI18n();
  const currentUser = localStorage.getItem('currentUser');

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/events', icon: Calendar, label: t('events.title') },
    { path: '/voting', icon: Vote, label: t('vote.title') },
    { path: currentUser ? '/dashboard' : '/login', icon: User, label: currentUser ? t('nav.dashboard') : t('nav.login') },
  ];

  if (currentUser) {
    const user = JSON.parse(currentUser);
    if (user.role === 'admin') {
      navItems.push({ path: '/admin', icon: Trophy, label: 'Admin' });
    }
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t shadow-elevated">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-smooth ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'shadow-glow' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
