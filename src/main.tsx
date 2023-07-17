import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';
import './index.css';
import { AppProvider } from './utils/context/Context';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <App />
        </AppProvider>
    </StrictMode>,
);
