import { useTheme } from "/components/themeContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

// Animation Variants
const fadeInOutVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.6, delay: 0.2 } }
};

const bounceVariant = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};

// Updated Styles including News Ticker with Mobile Support
const blockRevealStyles = `
  .block-effect {
    --td: 1.2s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .block-reveal {
    display: inline-block;
    overflow: hidden;
    position: relative;
    animation: blockReveal 1s ease-out forwards;
  }

  @keyframes blockReveal {
    0% { width: 0; }
    100% { width: 100%; }
  }

  .news-ticker {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    background: linear-gradient(90deg, #1E1E1E, #4A00E0, #8E2DE2);
    background-size: 200% 200%;
    animation: gradientShift 6s ease infinite;
    color: #FFFFFF;
    font-size: 1.25rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    overflow: hidden;
    z-index: 50;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    cursor: pointer;
  }

  .ticker-content {
    display: inline-block;
    white-space: nowrap;
    padding-left: 100%; /* Ensures text starts visible */
    animation: tickerScroll 20s linear infinite; /* Reduced duration for testing */
  }

  @keyframes tickerScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 0%; }
    50% { background-position: 100% 100%; }
    100% { background-position: 0% 0%; }
  }

  .news-ticker:hover {
    background: linear-gradient(90deg, #4A00E0, #8E2DE2, #1E1E1E);
    box-shadow: 0 2px 15px rgba(142, 45, 226, 0.7);
  }

  /* Mobile Support */
  @media (max-width: 768px) {
    .news-ticker {
      width: 90%;
      font-size: 1rem;
      padding: 0.4rem 0.8rem;
    }
  }

  @media (max-width: 480px) {
    .news-ticker {
      width: 95%;
      font-size: 0.875rem;
      padding: 0.3rem 0.6rem;
    }
  }
`;

const Index = () => {
  const { theme, colors, toggleTheme } = useTheme();
  const [prevTheme, setPrevTheme] = useState(theme);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (prevTheme !== theme) {
      if (isRateLimited) {
        toast.error("Please slow down!");
        return;
      }
      setThemeChangeCount((count) => count + 1);
      toast.success(`Switched to ${theme} mode!`);
      setPrevTheme(theme);
    }
  }, [theme, prevTheme, isRateLimited]);

  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => setIsRateLimited(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  const handleRedirect = (url) => {
    setTimeout(() => {
      router.push(url);
    }, 1000);
  };

  const handleTickerClick = () => {
    handleRedirect('/music');
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full transition-colors duration-1000 select-none overflow-y-auto no-scrollbar draggable-false"
      style={{
        background: colors.background,
        color: colors.text
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Global Styles including News Ticker */}
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: ${colors.background};
        }
        ${blockRevealStyles}
      `}</style>

      <Toaster position="top-center" />

      {/* News Ticker Bar */}
      <div className="news-ticker" onClick={handleTickerClick}>
        <div className="ticker-content">
          New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | 
        </div>
      </div>

      {/* Theme Toggle Button (Top Right) */}
      <motion.button
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={() => {
          toggleTheme();
          setIsRateLimited(themeChangeCount > 5);
        }}
        className="w-10 h-10 rounded-full fixed top-4 right-4 flex items-center justify-center shadow-lg z-50"
        style={{
          appearance: "none",
          padding: "1em 2em",
          color: colors.text,
          cursor: "pointer",
          outline: "none",
          borderRadius: "100px",
          border: "2px solid transparent",
          background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
          '--x': '50%',
          '--y': '50%',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'dark' ? '🌞' : '🌘'}
      </motion.button>

      {/* Music Button (Top Left) */}
      <motion.button
        aria-label="Go to music"
        className="w-10 h-10 rounded-full fixed top-4 left-4 flex items-center justify-center shadow-lg z-50"
        onClick={() => handleRedirect('/music')}
        style={{
          appearance: "none",
          padding: "1em 2em",
          color: colors.text,
          cursor: "pointer",
          outline: "none",
          borderRadius: "100px",
          border: "2px solid transparent",
          background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
          '--x': '50%',
          '--y': '50%',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        🎵
      </motion.button>

      {/* Main Content */}
      <motion.main 
        className="flex-1 flex flex-col items-center font-bold justify-center min-h-screen pt-20"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeInOutVariant}
      >
        <motion.button 
          className="text-lg font-semibold mb-4" 
          style={{ color: colors.text }} 
          variants={bounceVariant} 
          animate="animate"
          onClick={() => handleRedirect('/about')}
        >
          About Me
        </motion.button>

        {/* Block Reveal Animation for Heading */}
        <h1 className="block-effect" style={{ '--td': '1.2s' }}>
        <div
          className="block-reveal"
          style={{
            '--bc': '#4040bf',
            '--d': '.1s',
            fontSize: '3.5rem', // Smaller font size
            color: theme === 'dark' ? 'white' : 'black', // Set to white in dark mode, black in light mode
            animation: 'none', // Disable any animation that might override the color
          }}
          variants={fadeInOutVariant}
        >
          Welcome to
        </div>
        <div
          className="block-reveal"
          style={{
            color: theme === 'dark' ? 'white' : colors.text, // Set to white in dark mode, or dynamic text color in light mode
            '--bc': '#bf4060',
            '--d': '.5s',
            fontSize: '3.5rem', // Smaller font size
            animation: 'none', // Disable any animation that might override the color
          }}
          variants={fadeInOutVariant}
        >
          mnty music 
        </div>
        </h1>

        <motion.div className="mt-10 flex flex-col items-center">
          <motion.p className="text-lg font-medium" style={{ color: colors.text }} variants={bounceVariant} animate="animate">
            Scroll down to see my work
          </motion.p>
          <motion.span className="text-2xl" style={{ color: colors.text }} variants={bounceVariant} animate="animate">
            ⬇️
          </motion.span>
        </motion.div>
      </motion.main>

      {/* Projects Section */}
      <motion.section
        className="flex flex-col items-center justify-center min-h-screen p-16"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeInOutVariant}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-6xl">
          {/* SchedlGym */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
            style={{
              color: colors.text,
              transition: 'background 0.5s, color 0.5s',
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4">SchedlGym</h2>
            <p className="text-lg mb-6">Schedule your gym workouts:</p>
            <Link href="/secret" className="text-lg font-semibold underline">
              Coming Really Soon!
            </Link>
          </motion.div>

          {/* Schedl */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
            style={{
              color: colors.text,
              transition: 'background 0.5s, color 0.5s',
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Schedl</h2>
            <p className="text-lg mb-6">Schedule tasks with ease:</p>
            <button 
              className="text-lg font-semibold underline" 
              onClick={() => handleRedirect('#')} 
              style={{ transform: 'translateY(-3.368px)' }}
            >
              Start Scheduling!
            </button>
          </motion.div>

          {/* BuildWebHost */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
            style={{
              color: colors.text,
              transition: 'background 0.5s, color 0.5s',
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-semibold mb-4">BuildWebHost</h2>
            <p className="text-lg mb-6">In progress...</p>
            <button 
              className="text-lg font-semibold underline" 
              onClick={() => handleRedirect('#')} 
              style={{ transform: 'translateY(-3.368px)' }}
            >
              Coming Soon!
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="fixed bottom-0 text-center p-2 font-semibold" style={{ color: colors.text }}>
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;