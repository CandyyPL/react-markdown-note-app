import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WebFont from 'webfontloader';
import '@/assets/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NotesProvider from '@/context/NotesProvider.tsx';
import TagsProvider from '@/context/TagsProvider.tsx';
import App from '@/App.tsx';

WebFont.load({
  google: {
    families: ['Noto Sans'],
  },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotesProvider>
        <TagsProvider>
          <App />
        </TagsProvider>
      </NotesProvider>
    </QueryClientProvider>
  </StrictMode>
);
