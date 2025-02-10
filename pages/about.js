import { useTheme } from "/components/themeContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

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
const fadeInOutVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    },
    exit: { opacity: 0, y: 20, transition: { duration: 1, delay: 0.4 } }
  };


const About = () => {
  const { theme, colors, toggleTheme } = useTheme();

  const handleRedirect = (url) => {
    toast("Redirecting...");
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen items-center justify-center transition-colors duration-1000 select-none overflow-y-auto no-scrollbar"
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
      >
        💡
      </motion.button>

      <motion.button
        onClick={() => handleRedirect('/')}
        className="text-lg font-semibold mb-4"
        style={{ color: colors.text }}
        variants={bounceVariant}
        animate="animate"
      >
        Home
      </motion.button>

      <motion.main className="flex flex-col items-center text-center max-w-3xl p-6">
        <motion.h1 className="text-4xl font-bold mb-4"variants={fadeInOutVariant}>About Me</motion.h1>
        <motion.p className="text-lg leading-relaxed"variants={fadeInOutVariant}>
          Hi, my name is Mnty, I am 17 years old and one of my hobbies is Web Development and I am very excited to work on SchedlGym as it is a big project I will work on and deliver the best for users as I will see myself using it too as I myself go to the gym.  
        </motion.p>
      </motion.main>
    </motion.div>
  );
};

export default About;
