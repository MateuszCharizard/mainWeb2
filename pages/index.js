import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

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
      className="flex flex-col min-h-screen transition-colors duration-500 select-none"
      style={{ background: colors.background, color: colors.text }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
    <image className="src">
      
    </image>  
      
      
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
          🔄
        </motion.button>
      </header>
      <main className="flex-1 flex items-center font-bold justify-center ">
        <h1 className="text-3xl">Welcome to mnty.space</h1>
      </main>
      <p className="font-semibold p-2 text-center">
        Ⓒ 2025 Mnty
      </p>
    </motion.div>
  );
};

export default Index;
