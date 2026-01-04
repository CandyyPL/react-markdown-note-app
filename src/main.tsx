import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WebFont from 'webfontloader';
import '@/assets/global.css';
import App from '@/App.tsx';

WebFont.load({
  google: {
    families: ['Noto Sans'],
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
