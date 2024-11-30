import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { createRoot } from 'react-dom/client';

startTransition(() => {
  const root = document.getElementById('root');
  if (root) {
    createRoot(root).render(<RemixBrowser />);
  }
});
