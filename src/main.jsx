import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/Theme-context.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>

)
