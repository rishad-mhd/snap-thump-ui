import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';

// routes
import Router from './routes/routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import AuthProvider from './context/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SnackbarProvider>
          <AuthProvider>
            <ThemeProvider>
              <ScrollToTop />
              <Router />
            </ThemeProvider>
          </AuthProvider>
        </SnackbarProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
