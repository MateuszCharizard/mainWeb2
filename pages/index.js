
import { useTheme } from "/components/themeContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

// Animation Variants - quick and choppy for 8-bit Mario feel
const fadeInOutVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, staggerChildren: 0.1 }
  },
  exit: { opacity: 0, y: 8, transition: { duration: 0.2 } }
};

// Mario Bros. 8-bit Style CSS
const styles = `
  @font-face {
    font-family: 'Alpharush';
    src: url('/fonts/Alpharush.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  .block-effect {
    --td: 0.6s;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 2px 2px #000;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
  }

  .block-reveal {
    display: inline-block;
    overflow: hidden;
    position: relative;
    animation: blockReveal 0.4s steps(8) forwards;
  }

  @keyframes blockReveal {
    0% { width: 0; }
    100% { width: 100%; }
  }

  .header-container {
    position: fixed;
    top: 0.4rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;
    z-index: 100;
  }

  .news-dropdown {
    flex-grow: 0;
    min-width: 200px;
    background: #FF0000;
    color: #FFFFFF;
    font-size: 0.8rem;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
    padding: 0.5rem;
    border: 2px solid #000;
    border-radius: 0;
    box-shadow: 3px 3px #000;
    display: flex;
    flex-direction: column;
    align-items: center;     /* Centers content horizontally */
    justify-content: center; /* Centers  content vertically */
    text-align: center;      /* Ensures text inside is centered */
    gap: 0.3rem;
    margin: 0 auto;          /* Centers the box itself horizontally in the container */
    text-shadow: 1px 1px #000;
  }



  .news-dropdown:hover {
    background: #00FF00;
    color: #FF0000;
  }

  .news-button {
    background: #FFD700;
    color: #000;
    border: 2px solid #000;
    border-radius: 0;
    padding: 0.3rem 0.7rem;
    font-size: 0.7rem;
    box-shadow: 2px 2px #000;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .news-button:hover {
    background: #FF0000;
    color: #FFFFFF;
  }

  .project-box {
    background: #1E90FF;
    border: 2px solid #000;
    border-radius: 0;
    padding: 1rem;
    box-shadow: 4px 4px #000;
    transition: transform 0.2s steps(4);
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
    max-width: 220px;
    text-align: center;
  }

  .project-box:hover {
    transform: scale(1.1);
    box-shadow: 5px 5px #000;
  }

  .project-box h2 {
    font-size: 1rem;
    color: #FF0000;
    text-shadow: 2px 2px #000;
    margin-bottom: 0.6rem;
  }

  .project-box p {
    font-size: 0.7rem;
    color: #FFFFFF;
    text-shadow: 1px 1px #000;
    margin-bottom: 0.8rem;
  }

  .project-box a, .project-box button {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0;
    background: #FFD700;
    color: #000;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid #000;
    box-shadow: 2px 2px #000;
    transition: background 0.2s;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
  }

  .project-box a:hover, .project-box button:hover {
    background: #FF0000;
    color: #FFFFFF;
  }

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
  }

  .loading-gif {
    width: 100%;
    height: 66.67vh;
    object-fit: contain;
    image-rendering: pixelated;
  }

  .skip-button {
    margin-top: 1rem;
    padding: 0.3rem 0.7rem;
    background: #FF0000;
    color: #FFFFFF;
    border: 2px solid #000;
    border-radius: 0;
    font-size: 0.7rem;
    font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
    cursor: pointer;
    box-shadow: 2px 2px #000;
    transition: background 0.2s;
  }

  .skip-button:hover {
    background: #FFD700;
    color: #000;
  }

  .bounce {
    animation: marioBounce 0.3s ease-in-out infinite reverse;
  }

  @keyframes marioBounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }

  .mario-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #87CEEB 70%, #228B22 100%);
    z-index: -1;
    overflow: hidden;
  }

  .mario-background::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 10%;
    width: 80px;
    height: 40px;
    background: #FFFFFF;
    border: 2px solid #000;
    border-radius: 50% 50% 0 0;
    box-shadow: 3px 3px #000;
    image-rendering: pixelated;
  }

  .mario-background::after {
    content: '';
    position: absolute;
    top: 25%;
    right: 15%;
    width: 100px;
    height: 50px;
    background: #FFFFFF;
    border: 2px solid #000;
    border-radius: 50% 50% 0 0;
    box-shadow: 3px 3px #000;
    image-rendering: pixelated;
  }

  .ground {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: repeating-linear-gradient(
      45deg,
      #8B4513 0px,
      #8B4513 10px,
      #228B22 10px,
      #228B22 20px
    );
    border-top: 2px solid #000;
    box-shadow: 0 -3px 0 #000;
    image-rendering: pixelated;
  }

  @media (max-width: 768px) {
    .header-container {
      padding: 0.3rem;
    }
    .news-dropdown {
      font-size: 0.6rem;
      padding: 0.4rem;
      max-width: calc(100% - 4rem);
    }
    .news-button {
      padding: 0.2rem 0.6rem;
      font-size: 0.6rem;
    }
    .project-box {
      padding: 0.8rem;
      max-width: 200px;
    }
    .project-box h2 {
      font-size: 0.9rem;
    }
    .project-box p {
      font-size: 0.6rem;
    }
    .skip-button {
      padding: 0.2rem 0.6rem;
      font-size: 0.6rem;
    }
    .mario-background::before {
      width: 60px;
      height: 30px;
      top: 15%;
    }
    .mario-background::after {
      width: 80px;
      height: 40px;
      top: 20%;
    }
    .ground {
      height: 25%;
    }
  }

  @media (max-width: 480px) {
    .header-container {
      flex-direction: column;
      justify-content: center;
      gap: 0.2rem;
      padding: 0.2rem;
    }
    .news-dropdown {
      font-size: 0.5rem;
      padding: 0.3rem;
      max-width: 100%;
      margin: 0;
    }
    .news-button {
      padding: 0.15rem 0.5rem;
      font-size: 0.5rem;
    }
    .music-button {
      order: 1;
    }
    .theme-button {
      order: 2;
    }
    .project-box {
      padding: 0.6rem;
      max-width: 180px;
    }
    .project-box h2 {
      font-size: 0.8rem;
    }
    .project-box p {
      font-size: 0.5rem;
    }
    .project-box a, .project-box button {
      font-size: 0.5rem;
      padding: 0.2rem 0.5rem;
    }
    .skip-button {
      padding: 0.15rem 0.5rem;
      font-size: 0.5rem;
    }
    .mario-background::before {
      width: 50px;
      height: 25px;
      top: 10%;
    }
    .mario-background::after {
      width: 60px;
      height: 30px;
      top: 15%;
    }
    .ground {
      height: 20%;
    }
  }
`;

// Button animation variants
const buttonVariants = {
  initial: { scale: 1, boxShadow: '2px 2px #000' },
  hover: { scale: 1.1, boxShadow: '3px 3px #000', transition: { duration: 0.2 } },
  tap: { scale: 0.9, boxShadow: '1px 1px #000', transition: { duration: 0.2 } },
};

const Index = () => {
  const { theme, colors, toggleTheme } = useTheme();
  const [prevTheme, setPrevTheme] = useState(theme);
  const [themeChangeCount, setThemeChangeCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Handle theme change effects
  useEffect(() => {
    if (prevTheme !== theme) {
      if (isRateLimited) {
        toast.error("YO, CHILL! 🍄");
        return;
      }
      setThemeChangeCount((count) => count + 1);
      toast.success(`SWITCHED TO ${theme.toUpperCase()} MODE! ⭐`);
      setPrevTheme(theme);
    }
  }, [theme, prevTheme, isRateLimited]);

  // Handle rate limiting
  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => setIsRateLimited(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  // Handle loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  const handleRedirect = (url) => {
    toast("Redirecting...");
    setTimeout(() => {
      router.push(url);
    }, 400);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full transition-colors duration-400 select-none overflow-y-auto no-scrollbar draggable-false"
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
          font-family: 'Alpharush', 'Segoe UI Emoji', sans-serif;
        }
        ${styles}
      `}</style>

      {/* Mario Background */}
      <div className="mario-background">
        <div className="ground"></div>
      </div>

      <Toaster position="top-center" />

      {/* Loading Screen - Mario style with GIF */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src="https://i.imgur.com/3KnppRH.gif"
              alt="Loading MNTY"
              className="loading-gif"
            />
            <button
              className="skip-button"
              onClick={() => setIsLoading(false)}
            >
              JUMP PAST! 🔥
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Buttons and News Dropdown */}
      <div className="header-container">

        <motion.div
          className="news-dropdown"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
        >
          <span>NEW MUSIC RELEASED - MK MK</span>
          <motion.button
            className="news-button"
            onClick={() => handleRedirect('/music')}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            CHECK IT OUT 🔥
          </motion.button>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center min-h-screen pt-14"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeInOutVariant}
      >
        <motion.button 
          className="text-sm font-bold mb-2 bounce" 
          style={{ color: '#FFD700', textShadow: '2px 2px #000' }} 
          onClick={() => handleRedirect('/about')}
        >
          ABOUT ME 🍄
        </motion.button>

        <h1 className="block-effect" style={{ '--td': '0.6s' }}>
          <div
            className="block-reveal"
            style={{
              fontSize: '1.8rem',
              color: '#FFFFFF',
              textShadow: '2px 2px #000',
              animation: 'none'
            }}
            variants={fadeInOutVariant}
          >
            WELCOME TO
          </div>
          <div
            className="block-reveal"
            style={{
              color: '#FF0000',
              textShadow: '2px 2px #000',
              fontSize: '1.8rem',
              animation: 'none'
            }}
            variants={fadeInOutVariant}
          >
            MNTY MUSIC 🔥
          </div>
        </h1>

        <motion.div className="mt-6 flex flex-col items-center">
          <motion.p className="text-sm font-bold bounce" style={{ color: '#FFD700', textShadow: '1px 1px #000' }}>
            SCROLL FOR WORK ⭐
          </motion.p>
          <motion.span className="text-lg bounce" style={{ color: '#FFFFFF', textShadow: '1px 1px #000' }}>
            ⬇️
          </motion.span>
        </motion.div>
      </motion.main>

      {/* Projects Section */}
      <motion.section
        className="flex flex-col items-center justify-center min-h-screen p-10"
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        variants={fadeInOutVariant}
      >
        <motion.div className="flex flex-row flex-wrap justify-center gap-12 w-full max-w-4xl">
          <motion.div
            className="project-box max-w-[220px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-sm font-bold mb-2">GAMBLEIT.SITE</h2>
            <p className="text-xs font-bold mb-3">DPDD CREW HUB 🍄</p>
            <Link href="#" className="text-xs font-bold">
              GO NOW! 🔥
            </Link>
          </motion.div>

          <motion.div
            className="project-box max-w-[220px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-sm font-bold mb-2">SCHEDL.PRO</h2>
            <p className="text-xs font-bold mb-3">PLAN LIKE MARIO ⭐</p>
            <button 
              className="text-xs font-bold"
              onClick={() => handleRedirect('#')}
            >
              SCHEDULE IT! 🔥
            </button>
          </motion.div>

          <motion.div
            className="project-box max-w-[220px] w-full"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.1 }}
            variants={fadeInOutVariant}
          >
            <h2 className="text-sm font-bold mb-2">NOTEIFY.UK</h2>
            <p className="text-xs font-bold mb-3">NOTES LIKE 1-UP 🍄</p>
            <button 
              className="text-xs font-bold"
              onClick={() => handleRedirect('#')}
            >
              NOTE IT! 🔥
            </button>
          </motion.div>
        </motion.div>
      </motion.section>

      <footer className="fixed bottom-0 text-center p-1 font-bold" style={{ color: '#FFD700', textShadow: '1px 1px #000', fontFamily: "'Alpharush', 'Segoe UI Emoji', sans-serif'" }}>
        Ⓒ 2025 MNTY 🍄
      </footer>
    </motion.div>
  );
};

export default Index;