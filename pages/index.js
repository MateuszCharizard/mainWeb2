import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';

const fadeInOutVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 1, delay: 0.4 } }
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

  // Reset rate limit state after 3 seconds
  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => setIsRateLimited(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  const handleRedirect = (url) => {
    toast("Redirecting...");
    setTimeout(() => {
      router.push(url); // Use Next.js router for internal links
    }, 1000);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen w-full transition-colors duration-1000 select-none overflow-y-auto no-scrollbar"
      style={{
        background: colors.background, // Dynamic background based on theme
        color: colors.text // Dynamic text color based on theme
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      
    >
      {/* This will apply a global background to the entire page */}
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          background-color: ${colors.background}; /* Dynamically set background color */
        }
      `}</style>

      <Toaster position="top-center" />
      
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
          '--x': '50%', // Default position of the radial gradient center
          '--y': '50%', // Default position of the radial gradient center
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        💡
      </motion.button>
      <motion.button
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
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
          '--x': '50%', // Default position of the radial gradient center
          '--y': '50%', // Default position of the radial gradient center
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/images">
          📷
        </Link>
      </motion.button>
      <motion.button
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="absolute top-4 inset-x-0 mx-auto w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50"
        style={{
          appearance: "none",
          padding: "1em 2em",
          color: colors.text,
          cursor: "pointer",
          outline: "none",
          borderRadius: "100px",
          border: "2px solid transparent",
          background: `linear-gradient(#000, #000) padding-box, radial-gradient(farthest-corner at var(--x) var(--y), #00C9A7, #845EC2) border-box`,
          '--x': '50%', // Default position of the radial gradient center
          '--y': '50%', // Default position of the radial gradient center
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link href="/music">
          📷
        </Link>
      </motion.button>



      <motion.main 
        className="flex-1 flex flex-col items-center font-bold justify-center min-h-screen"
        variants={fadeInOutVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.button
          onClick={() => handleRedirect('/apple')}
          className="text-lg font-semibold mb-4"
          style={{ color: colors.text }}
          variants={bounceVariant}
          animate="animate"
        >
          About Me
        </motion.button>

        <h1 className="block-effect" style={{ color: colors.text,  '--td': '1.2s'  }}>
          <div
            className="block-reveal"
            style={{
              '--bc': '#4040bf',
              '--d': '.1s',
              fontSize: '3.5rem', 
              color: colors.text, 
            }}
          >
            Welcome to
          </div>
          <div
            className="block-reveal"
            style={{
            color: colors.text,
            '--bc': '#bf4060',
            '--d': '.5s',
            fontSize: '3.5rem', 
            }}
          >
            mnty.space
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
      
      <motion.section 
        className="flex flex-col items-center justify-center min-h-screen p-16"
        variants={fadeInOutVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-6xl">
          {[{
            title: "SchedlGym",
            text: "Schedule your gym workouts:",
            link: "Coming Really Soon!",
            href: "/secret"  // Internal link for the /secret page
          }, {
            title: "Schedl",
            text: "Schedule tasks with ease:",
            link: "Start Scheduling!",
            url: "https://schedl.pro" // External URL
          }, {
            title: "BuildWebHost",
            text: "In progress...",
            link: "Coming Soon!",
            url: "#" // External URL placeholder
          }].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
              style={{ background: colors.cardBackground, color: colors.text, transition: 'background 0.5s, color 0.5s' }}
              variants={fadeInOutVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
            >
              <motion.h2 className="text-2xl font-semibold mb-4">
                {item.title}
              </motion.h2>
              <motion.p className="text-lg mb-6">
                {item.text}
              </motion.p>
              {item.href ? (
                <Link href={item.href} className="text-lg font-semibold underline">
                  {item.link}
                </Link>
              ) : (
                <motion.button
                  onClick={() => handleRedirect(item.url)}
                  className="text-lg font-semibold underline"
                  variants={bounceVariant}
                  animate="animate"
                >
                  {item.link}
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      <footer className="fixed bottom-0 text-center p-2 font-semibold">
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;
