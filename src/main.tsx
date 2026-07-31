import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

function AppWrapper() {
  const location = useLocation();
  // Forcer le démontage/remontage complet d'App uniquement quand le pathname change
  // Cela permet de réinitialiser tous les hooks useScroll de framer-motion qui 
  // perdent leurs références DOM après un routage.
  return <App key={location.pathname} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </StrictMode>,
);
