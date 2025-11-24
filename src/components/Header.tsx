import { Link } from 'react-router-dom';
import { Trophy, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitch } from './LanguageSwitch';
import { useI18n } from '@/lib/i18n';
import { storage } from '@/lib/storage';

export const Header = () => {
  const { t } = useI18n();
  const currentUser = storage.getCurrentUser();

  const handleLogout = () => {
    storage.setCurrentUser(null);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="p-2 rounded-lg gradient-primary">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <span className="hidden sm:inline">FAAP</span>
        </Link>

        <nav className="flex items-center gap-1">
          {currentUser ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-smooth">
                {t('nav.dashboard')}
              </Link>
              <Link to="/events" className="text-sm font-medium hover:text-primary transition-smooth">
                {t('nav.events')}
              </Link>
              <Link to="/voting" className="text-sm font-medium hover:text-primary transition-smooth">
                {t('nav.voting')}
              </Link>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="text-sm font-medium hover:text-primary transition-smooth">
                  {t('nav.admin')}
                </Link>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {currentUser.balance} {t('dashboard.tokens')}
                </span>
                <LanguageSwitch />
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/events" className="text-sm font-medium hover:text-primary transition-smooth">
                {t('nav.events')}
              </Link>
              <Link to="/voting" className="text-sm font-medium hover:text-primary transition-smooth">
                {t('nav.voting')}
              </Link>
              <LanguageSwitch />
              <Link to="/login">
                <Button variant="ghost">{t('nav.login')}</Button>
              </Link>
              <Link to="/signup">
                <Button>{t('nav.signup')}</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
