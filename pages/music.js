import { useTheme } from "/components/themeContext";
import { motion, px } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';  // Import Image component from next/image

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
      className="flex flex-col min-h-screen w-full transition-colors duration-1000 select-none overflow-y-auto draggable-false no-scrollbar"
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
        <Image
            className="flex flex-col items-center font-bold justify-center animate-spin "
            src="/CD.jpg"
            alt="Weston-super-mare"
            width={500}
            height={500}
        />
        
        <h1 className="block-effect" style={{ '--td': '1.2s' }}>
          <div
            className="block-reveal"
            style={{
              '--bc': '#4040bf',
              '--d': '.1s',
              fontSize: '3.5rem', // Smaller font size
              color: colors.text, // Dynamic color based on theme
            }}
            variants={fadeInOutVariant}
          >
            Welcome to
          </div>
          <div
            className="block-reveal"
            style={{
              color: colors.text,
              '--bc': '#bf4060',
              '--d': '.5s',
              fontSize: '3.5rem', // Smaller font size
              // Dynamic color based on theme
            }}
            variants={fadeInOutVariant}
          >
            mnty Images
          </div>
        </h1>

        <motion.div className="mt-10 flex flex-col items-center">
          <motion.p className="text-lg font-medium" style={{ color: colors.text }} variants={bounceVariant} animate="animate">
            Scroll down to see my images
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
            '--x': '50%', // Default position of the radial gradient center
            '--y': '50%', // Default position of the radial gradient center 
        }}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        >
         <iframe className="rounded-lg" width="300" height="120" src="https://www.bandlab.com/embed/?id=8e2a6880-6668-ed11-9f5e-000d3a980004" allowfullscreen></iframe>
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
            '--x': '50%', // Default position of the radial gradient center
            '--y': '50%', // Default position of the radial gradient center 
        }}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.1 }}
        >
         <iframe className="rounded-lg" width="300" height="120" src="https://www.bandlab.com/embed/?id=3ccf6baa-3c04-f011-aaa7-0022484892d6" allowfullscreen></iframe>
        </motion.div>

        {/* Third Image (if you need another image, repeat the same structure) */}
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
            '--x': '50%', // Default position of the radial gradient center
            '--y': '50%', // Default position of the radial gradient center 
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
