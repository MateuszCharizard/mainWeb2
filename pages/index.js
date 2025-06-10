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

// Updated Styles including News Ticker and Project Boxes
const styles = `
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

  .header-container {
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    z-index: 100;
  }

  .news-ticker {
    flex-grow: 1;
    max-width: calc(100% - 7rem); /* Account for buttons (2.5rem each) + gaps (0.5rem each) */
    height: 2.5rem;
    background: linear-gradient(90deg, #FFD700, #FF4500, #FF69B4);
    background-size: 200% 200%;
    animation: gradientShift 5s ease infinite;
    color: #1A1A1A;
    font-size: 1.25rem;
    font-weight: 700;
    padding: 0.5rem 1rem;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(255, 69, 0, 0.5);
    border-radius: 12px;
    cursor: pointer;
    border: 2px solid #FFD700;
    display: flex;
    align-items: center;
    margin: 0 0.5rem;
  }

  .ticker-content {
    display: inline-block;
    white-space: nowrap;
    padding-left: 100%;
    animation: tickerScroll 20s linear infinite;
    line-height: 1.5rem;
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
    background: linear-gradient(90deg, #FF69B4, #FF4500, #FFD700);
    box-shadow: 0 4px 18px rgba(255, 215, 0, 0.7);
    border-color: #FF4500;
  }

  .project-box {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));
    border: 3px solid transparent;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s, box-shadow 0.3s;
    background: linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at 50% 50%, #00C9A7, #845EC2) border-box;
  }

  .project-box:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 201, 167, 0.5);
  }

  .project-box h2 {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .project-box p {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .project-box a, .project-box button {
    font-size: 1rem;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    background: linear-gradient(90deg, #00C9A7, #845EC2);
    color: white;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.3s;
  }

  .project-box a:hover, .project-box button:hover {
    background: linear-gradient(90deg, #845EC2, #00C9A7);
  }

  /* Mobile Support */
  @media (max-width: 768px) {
    .news-ticker {
      font-size: 1rem;
      padding: 0.4rem 0.8rem;
      border-width: 1.5px;
      max-width: calc(100% - 6rem);
      margin: 0 0.5rem;
    }
    .ticker-content {
      line-height: 1.3rem;
    }
    .project-box {
      padding: 1.5rem;
    }
    .project-box h2 {
      font-size: 1.5rem;
    }
    .project-box p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .header-container {
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem;
    }
    .news-ticker {
      font-size: 0.875rem;
      padding: 0.3rem 0.6rem;
      border-width: 1px;
      max-width: 100%;
      margin: 0;
      order: 3;
    }
    .ticker-content {
      line-height: 1.2rem;
    }
    .music-button {
      order: 1;
    }
    .theme-button {
      order: 2;
    }
    .project-box {
      padding: 1rem;
    }
    .project-box h2 {
      font-size: 1.25rem;
    }
    .project-box p {
      font-size: 0.875rem;
    }
    .project-box a, .project-box button {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
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
      {/* Global Styles */}
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: ${colors.background};
        }
        ${styles}
      `}</style>

      <Toaster position="top-center" />

      {/* Header with Buttons and News Ticker Inline */}
      <div className="header-container">
        {/* Music Button */}
        <motion.button
          aria-label="Go to music"
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg music-button"
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

        {/* Static News Ticker Bar */}
        <div className="news-ticker">
          <div className="ticker-content">
            New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK |
          </div>
        </div>

        {/* Theme Toggle Button */}
        <motion.button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={() => {
            toggleTheme();
            setIsRateLimited(themeChangeCount > 5);
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg theme-button"
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
      </div>

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
              fontSize: '3.5rem',
              color: theme === 'dark' ? 'white' : 'black',
              animation: 'none',
            }}
            variants={fadeInOutVariant}
          >
            Welcome to
          </div>
          <div
            className="block-reveal"
            style={{
              color: theme === 'dark' ? 'white' : colors.text,
              '--bc': '#bf4060',
              '--d': '.5s',
              fontSize: '3.5rem',
              animation: 'none',
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
        <motion.div className="flex flex-row flex-wrap justify-center gap-20 w-full max-w-6xl">
          {/* GambleIt.site */}
          <motion.div
            className="project-box max-w-[300px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-2xl font-bold text-white mb-4">GambleIt.site</h2>
            <p className="text-lg text-white font-semibold mb-6">A platform for Weston College DPDD students to collaborate and learn.</p>
            <Link href="#" className="text-lg font-semibold">
              Visit Now!
            </Link>
          </motion.div>

          {/* Schedl.pro */}
          <motion.div
            className="project-box max-w-[300px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Schedl.pro</h2>
            <p className="text-lg text-white font-semibold  mb-6">Effortlessly schedule your tasks and stay organized.</p>
            <button 
              className="text-lg font-semibold"
              onClick={() => handleRedirect('#')}
            >
              Start Scheduling!
            </button>
          </motion.div>

          {/* Noteify.uk */}
          <motion.div
            className="project-box max-w-[300px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Noteify.uk</h2>
            <p className="text-lg text-white font-semibold mb-6">Capture and organize your notes with ease.</p>
            <button 
              className="text-lg font-semibold"
              onClick={() => handleRedirect('#')}
            >
              Start Noting!
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