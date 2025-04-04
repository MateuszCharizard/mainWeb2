import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion"; // Removed unused `px`
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

// News Ticker Styles
const tickerStyles = `
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
    padding-left: 100%;
    animation: tickerScroll 20s linear infinite;
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
    toast("Redirecting...");
    setTimeout(() => {
      router.push(url);
    }, 1000);
  };



  return (
    <motion.div
      className="flex flex-col min-h-screen w-full transition-colors duration-1000 select-none overflow-y-auto draggable-false no-scrollbar"
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
        ${tickerStyles}
      `}</style>

      <Toaster position="top-center" />

      {/* News Ticker Bar */}
      <div className="news-ticker">
        <div className="ticker-content">
          New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses | New Music Dropped | Dark Mouses |
        </div>
      </div>

      <motion.button
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
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
        🌘
      </motion.button>
      <motion.button
        aria-label="Go to home"
        className="w-10 h-10 rounded-full fixed top-4 left-4 flex items-center justify-center shadow-lg z-50"
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
        <Link href="/">
          🏠
        </Link>
      </motion.button>

      <motion.main 
        className="flex-1 flex flex-col items-center font-bold justify-center min-h-screen"
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
        className="flex flex-col items-center justify-center min-h-screen p-16"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-6xl">
          {/* First Image */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
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
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
          >
            <iframe width="300" height="120" src="https://www.bandlab.com/embed/?id=4ebac4d1-a411-f011-aaa7-0022484892d6" allowfullscreen></iframe>
          </motion.div>

          {/* Second Image */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
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
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
          >
            <iframe className="rounded-lg" width="300" height="120" src="https://www.bandlab.com/embed/?id=5cbad79f-2705-f011-aaa7-0022484892d6" allowfullscreen></iframe>
          </motion.div>

          {/* Third Image */}
          <motion.div
            className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
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
            }}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
          >
            <iframe className="rounded-lg" width="300" height="120" src="https://www.bandlab.com/embed/?id=6757ac3a-eee0-ef11-88f6-6045bd3473c0" allowfullscreen></iframe>
          </motion.div>
        </motion.div>
      </motion.section>

      <footer className="fixed bottom-0 text-center p-2 font-semibold">
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;