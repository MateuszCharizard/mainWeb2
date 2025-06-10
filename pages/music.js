import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

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

// New Party Effect Styles (updated to exclude static elements)
const partyEffectStyles = `
  .party-mode-content {
    animation: partyLights 4s infinite;
  }

  @keyframes partyLights {
    0% { filter: hue-rotate(0deg) brightness(100%); }
    25% { filter: hue-rotate(90deg) brightness(150%); }
    50% { filter: hue-rotate(180deg) brightness(100%); }
    75% { filter: hue-rotate(270deg) brightness(150%); }
    100% { filter: hue-rotate(360deg) brightness(100%); }
  }

  .confetti {
    position: fixed;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #ff0;
    border-radius: 50%;
    animation: fall 3s linear infinite;
    pointer-events: none; /* Ensure confetti doesn't interfere with clicks */
    z-index: 1; /* Below static elements */
  }

  @keyframes fall {
    0% { top: -50px; opacity: 0; transform: translateX(0); }
    25% { opacity: 1; }
    100% { top: 100vh; opacity: 0; transform: translateX(calc(var(--confetti-x) * 100px)); }
  }
`;

// Redesigned News Ticker Styles with New Colors and Theme
const tickerStyles = `
  .header-container {
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    z-index: 100; /* Higher than confetti and party effects */
  }

  .news-ticker {
    flex-grow: 1;
    max-width: calc(100% - 7rem); /* Account for buttons (2.5rem each) + gaps (0.5rem each) */
    height: 2.5rem; /* Same height as buttons (h-10 = 2.5rem) */
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
    align-items: center; /* Center content vertically */
    margin: 0 0.5rem; /* 0.5rem gap from buttons */
  }

  .ticker-content {
    display: inline-block;
    white-space: nowrap;
    padding-left: 100%;
    animation: tickerScroll 20s linear infinite;
    line-height: 1.5rem; /* Ensure text aligns well within fixed height */
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

  /* Mobile Support */
  @media (max-width: 768px) {
    .news-ticker {
      font-size: 1rem;
      padding: 0.4rem 0.8rem;
      border-width: 1.5px;
      height: 2.5rem;
      max-width: calc(100% - 6rem); /* Adjust for smaller buttons/gaps */
      margin: 0 0.5rem;
    }
    .ticker-content {
      line-height: 1.3rem;
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
      height: 2.5rem;
      max-width: 100%; /* Full width on small screens */
      margin: 0;
      order: 3; /* Move news ticker below buttons */
    }
    .ticker-content {
      line-height: 1.2rem;
    }
    .home-button {
      order: 1;
    }
    .theme-button {
      order: 2;
    }
  }
`;

const Index = () => {
  const { theme, colors, toggleTheme } = useTheme();
  const [prevTheme, setPrevTheme] = useState(theme);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
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
    toast("Redirecting...");
    setTimeout(() => {
      router.push(url);
    }, 1000);
  };

  const togglePartyMode = () => {
    setIsPartyMode(!isPartyMode);
    toast.success(`Party mode ${isPartyMode ? 'disabled' : 'enabled'}!`);
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1, rotate: 0, background: 'linear-gradient(to right, #9333ea, #d946ef)' },
    hover: { scale: 1.1, rotate: 5, background: 'linear-gradient(to right, #7e22ce, #c026d3)', transition: { duration: 0.3 } },
    tap: { scale: 0.95, rotate: -5, background: 'linear-gradient(to right, #a21caf, #e11d48)', transition: { duration: 0.2 } },
    pressed: { scale: 1.05, rotate: 0, boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)', transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full transition-colors duration-1000 select-none overflow-y-auto draggable-false no-scrollbar"
      style={{
        background: colors.background,
        color: colors.text,
        position: 'relative', // Ensure confetti layers correctly
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Global Styles including News Ticker and Party Effects */}
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: ${colors.background};
          position: relative; /* Ensure confetti layers correctly over content */
        }
        ${tickerStyles}
        ${partyEffectStyles}
      `}</style>

      <Toaster position="top-center" zIndex={101} /> {/* Ensure Toaster is above everything */}

      {/* Header with Buttons and News Ticker Inline */}
      <div className="header-container">
        {/* Static Home Button */}
        <motion.button
          aria-label="Go to home"
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg home-button"
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
          <Link href="/">🏠</Link>
        </motion.button>

        {/* Static News Ticker Bar */}
        <div className="news-ticker">
          <div className="ticker-content">
            New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK | New Music Dropped | MK MK |
          </div>
        </div>

        {/* Static Theme Button */}
        <motion.button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
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
          🌘
        </motion.button>
      </div>

      <motion.main 
        className={`flex-1 flex flex-col items-center font-bold justify-center min-h-screen ${isPartyMode ? 'party-mode-content' : ''}`} // Apply party mode only to content
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="relative flex justify-center items-center">
          <Image
            className="flex flex-col items-center justify-center"
            src="/WhatsApp_Image_2025-03-18_at_17.09.28_5df25a50-removebg-preview.png"
            alt="CD"
            width={130}
            height={100}
          />
          <Image
            className={`absolute flex flex-col items-center justify-center ${theme === 'dark' ? 'invert' : ''}`}
            src="/WhatsApp_Image_2025-03-18_at_19.19.01_6ebc38d7-removebg-preview.png"
            alt="matix"
            width={1600}
            height={600}
            style={{ width: '600px', height: '600px', maxWidth: 'none', maxHeight: 'none' }}
          />
        </div>

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
            Scroll down to see my music
          </motion.p>
          <motion.span className="text-2xl" style={{ color: colors.text }} variants={bounceVariant} animate="animate">
            ⬇️
          </motion.span>
        </motion.div>
      </motion.main>

      <motion.section
        className={`flex flex-col items-center justify-center min-h-screen p-16 ${isPartyMode ? 'party-mode-content' : ''}`} // Apply party mode only to content
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div className="w-full max-w-6xl">
          <motion.div className="flex flex-row flex-wrap justify-center gap-20 w-full">
            {/* First Image */}
            <motion.div
              className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg max-w-[300px] w-full"
              style={{
                appearance: "none",
                padding: "1em 2em",
                color: colors.text,
                outline: "none",
                borderRadius: "20px",
                border: "3px solid transparent",
                background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
                '--x': '50%',
                '--y': '50%',
                boxSizing: 'border-box',
              }}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.1 }}
            >
              <iframe 
                className="rounded-lg" 
                width="100%" 
                height="120" 
                src="https://www.bandlab.com/embed/?id=4ebac4d1-a411-f011-aaa7-0022484892d6" 
                allowFullScreen
                style={{ maxWidth: '100%' }}
              ></iframe>
            </motion.div>

            {/* Second Image */}
            <motion.div
              className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg max-w-[300px] w-full"
              style={{
                appearance: "none",
                padding: "1em 2em",
                color: colors.text,
                outline: "none",
                borderRadius: "20px",
                border: "3px solid transparent",
                background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
                '--x': '50%',
                '--y': '50%',
                boxSizing: 'border-box',
              }}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.1 }}
            >
              <iframe 
                className="rounded-lg" 
                width="100%" 
                height="120" 
                src="https://www.bandlab.com/embed/?id=ce1b7ae5-2646-f011-8f7d-6045bd381261" 
                allowFullScreen
                style={{ maxWidth: '100%' }}
              ></iframe>
            </motion.div>

            {/* Third Image */}
            <motion.div
              className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg max-w-[300px] w-full"
              style={{
                appearance: "none",
                padding: "1em 2em",
                color: colors.text,
                outline: "none",
                borderRadius: "20px",
                border: "3px solid transparent",
                background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
                '--x': '50%',
                '--y': '50%',
                boxSizing: 'border-box',
              }}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: false, amount: 0.1 }}
            >
              <iframe 
                className="rounded-lg" 
                width="100%" 
                height="120" 
                src="https://www.bandlab.com/embed/?id=6757ac3a-eee0-ef11-88f6-6045bd3473c0" 
                allowFullScreen
                style={{ maxWidth: '100%' }}
              ></iframe>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Party Mode Button */}
        <motion.button
          onClick={togglePartyMode}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          animate={isPartyMode ? 'pressed' : 'initial'}
          className="mt-10 px-8 py-4 text-white rounded-full shadow-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(to right, #9333ea, #d946ef)',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            fontWeight: 'bold',
            letterSpacing: '1px',
            zIndex: 10, // Ensure button is above confetti but below static elements
          }}
        >
          {isPartyMode ? 'Disable Party Mode' : 'Enable Party Mode'}
        </motion.button>
      </motion.section>

      {/* Full-Page Confetti Effect */}
      {isPartyMode && (
        <div>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}vw`,
                '--confetti-x': Math.random() * 2 - 1, // Random horizontal drift
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
                animationDelay: `${Math.random() * 2}s`,
                zIndex: 1, // Below static elements
              }}
            />
          ))}
        </div>
      )}

      <footer className="fixed bottom-0 text-center p-2 font-semibold" style={{ zIndex: 100 }}>
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;