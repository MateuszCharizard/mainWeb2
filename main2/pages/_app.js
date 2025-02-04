import { ThemeProvider } from '../components/themeContext'; // Adjust this path as needed
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Toaster /> {/* Add this here to make sure toasts are rendered globally */}
    </ThemeProvider>
  );
}

export default MyApp;
