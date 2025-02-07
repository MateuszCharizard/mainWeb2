import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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

  return (
    <motion.div
      className="flex flex-col min-h-screen transition-colors duration-1000 select-none overflow-y-auto"
      style={{ background: colors.background, color: colors.text }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 4 }}
    >
      <Toaster position="top-center" />
      <header className="flex p-4 relative transition ">
        <motion.button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full absolute top-4 right-4 flex items-center justify-center shadow-lg"
          style={{ background: colors.primary, color: colors.text, transition: 'background 0.5s, color 0.5s' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 1 }}
        >
          💡
        </motion.button>
      </header>
      
      <motion.main 
        className="flex-1 flex flex-col items-center font-bold justify-center min-h-screen"
        variants={fadeInVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h1 className="text-3xl">Welcome to mnty.space</h1>
      </motion.main>
      
      {[1, 2, 3].map((page) => (
        <motion.section 
          key={page} 
          className="flex flex-col items-center justify-center min-h-screen p-8 border-t"
          variants={fadeInVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold mb-4">Check out my other website #{page}</h2>
          <p className="text-lg">Here's a great project you might like: <a href="#" className="underline text-blue-500">Visit now</a></p>
        </motion.section>
      ))}
      
      <footer 
        className="fixed bottom-0 text-center p-4 font-semibold"
      >
        Ⓒ 2025 Mnty
      </footer>
    </motion.div>
  );
};

export default Index;
