import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2, delay: 1 }
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.4 } }
};

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 1 } },
  exit: { opacity: 0, y: 30, transition: { duration: 0.4 } }
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

  const handleRedirect = (url) => {
    toast("Redirecting...");
    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  };

  return (
    
    
    
    
    <motion.div
      className="flex flex-col min-h-screen transition-colors duration-1000 select-none overflow-y-auto no-scrollbar transition"
      style={{ background: colors.background, color: colors.text }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Toaster position="top-center" />
      <motion.button
        onClick={toggleTheme}
        className="w-10 h-10 rounded-full fixed top-4 right-4 flex items-center justify-center shadow-lg z-50"
        style={{ background: colors.primary, color: colors.text, transition: 'background 0.5s, color 0.5s' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 1 }}
      >
        💡
      </motion.button>
      
      <motion.main 
        className="flex-1 flex flex-col items-center font-bold justify-center min-h-screen"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false }}
      >
        <motion.h1 className="text-3xl" variants={textVariant}>
          Welcome to mnty.space
        </motion.h1>
      </motion.main>
      
      <motion.section 
        className="flex flex-col items-center justify-center min-h-screen p-16"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false }}
      >
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-20 w-full max-w-6xl">
          {[{
            title: "SchedlGym",
            text: "Schedule your gym workouts:",
            link: "Start Now!",
            url: "#"
          }, {
            title: "Schedl",
            text: "Schedule tasks with ease:",
            link: "Start Scheduling!",
            url: "#"
          }, {
            title: "BuildWebHost",
            text: "In progress...",
            link: "Coming Soon!",
            url: "#"
          }].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex flex-col items-center justify-center p-10 rounded-xl shadow-lg"
              style={{ background: colors.cardBackground, color: colors.text, transition: 'background 0.5s, color 0.5s' }}
              variants={textVariant}
            >
              <motion.h2 className="text-2xl font-semibold mb-4">
                {item.title}
              </motion.h2>
              <motion.p className="text-lg mb-6">
                {item.text}
              </motion.p>
              <motion.button
                onClick={() => handleRedirect(item.url)}
                className="text-lg font-semibold underline"
                variants={bounceVariant}
                animate="animate"
              >
                {item.link}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
      
      <footer className="fixed bottom-0 text-center p-4 font-semibold">
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;
