// pages/index.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  const [isDark, setIsDark] = useState(true);
  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [taskInput, setTaskInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const suggestions = [
    "Plan your next meeting",
    "Track project deadlines",
    "Sync with your team",
    "Organize daily goals",
    "Schedule a review"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim()) {
      setTaskInput('');
      // Task handling logic here
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 15 } },
  };

  const glowVariants = {
    hover: {
      scale: 1.06,
      boxShadow: [
        "0 0 8px rgba(59, 130, 246, 0.8)",
        "0 0 20px rgba(59, 130, 246, 0.6)",
        "0 0 40px rgba(59, 130, 246, 0.4)"
      ].join(','),
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.97 },
  };

  const titleVariants = {
    hover: { y: -8, color: '#60a5fa', transition: { type: 'spring', stiffness: 500, damping: 20 } },
  };

  const suggestionVariants = {
    initial: { opacity: 0, y: 15, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.95 },
  };

  return (
    <>
      <Head>
        <title>Schedl - Next-Level Scheduling</title>
        <meta name="description" content="Experience the future of productivity with Schedl's intelligent scheduling platform." />
        <link rel="icon" href="https://i.snipp.gg/527450380389318667/4625d74623760414a9751881a96a1a5c.png" />
      </Head>

      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[#0a0f1a] via-[#1a2338] to-[#2a3555]' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'} 
        transition-all duration-1000 overflow-x-hidden font-sans relative`}>
        
        {/* Background Particles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: isDark ? 0.15 : 0.05 }}
          transition={{ duration: 1 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-blue-400/30 rounded-full"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>

        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 backdrop-blur-md bg-opacity-80"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.span className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            Schedl
          </motion.span>
          <div className="flex items-center space-x-4">
            <motion.button
              variants={glowVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleTheme}
              className={`p-2.5 rounded-full ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} shadow-xl backdrop-blur-sm`}
            >
              <motion.img
                src={isDark ? "https://img.icons8.com/ios-filled/50/ffffff/sun.png" : "https://img.icons8.com/ios-filled/50/000000/moon-symbol.png"}
                alt="Theme toggle"
                width={24}
                height={24}
                className={isDark ? 'invert' : ''}
                animate={{ rotate: isDark ? 360 : 0 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
            <Link href="/login">
              <motion.button
                variants={glowVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full font-medium text-white shadow-xl"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-24 pb-16"
        >
          <div className="text-center max-w-5xl mx-auto relative z-10">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-12 tracking-tight"
              variants={itemVariants}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {['S', 'c', 'h', 'e', 'd', 'l', '.', 'P', 'r', 'o'].map((letter, index) => (
                <motion.span
                  key={index}
                  variants={titleVariants}
                  whileHover="hover"
                  className={`${letter === '.' ? 'bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent' : ''} inline-block`}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl lg:text-3xl mb-12 font-light max-w-3xl mx-auto leading-relaxed ${isDark ? 'text-white' : 'text-black'}`}
            >
              Redefine productivity with intelligent scheduling
            </motion.p>

            {/* Task Input */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleTaskSubmit}
              className="max-w-2xl mx-auto flex gap-4 items-center relative"
            >
              <motion.input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder={suggestions[currentSuggestion]}
                className={`flex-1 p-4 md:p-5 rounded-2xl ${isDark ? 'bg-gray-900/70 text-white' : 'bg-white/70 text-gray-900'} 
                  border ${isDark ? 'border-gray-800' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-400 
                  backdrop-blur-md shadow-lg`}
                whileFocus={{ scale: 1.03, boxShadow: '0 0 15 patienterpx rgba(59, 130, 246, 0.3)' }}
                transition={{ duration: 0.3 }}
              />
              <motion.button
                variants={glowVariants}
                whileHover="hover"
                whileTap="tap"
                type="submit"
                className="px-8 py-4 md:py-5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-2xl font-medium text-white shadow-xl"
              >
                Add Task
              </motion.button>
            </motion.form>

            {/* Task Suggestions and Scroll Arrow Container */}
            <div className="mt-8 relative">
              <motion.div variants={itemVariants} className="text-sm md:text-base text-gray-400/80">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentSuggestion}
                    variants={suggestionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="inline-block bg-gray-800/20 px-3 py-1 rounded-full backdrop-blur-sm"
                  >
                    {suggestions[currentSuggestion]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* Scroll Indicator */}
              <motion.div
                className="mt-6 flex justify-center"
                animate={{ y: [0, 20, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.img
                  src="https://img.icons8.com/ios-filled/50/000000/down.png"
                  alt="Scroll down"
                  width={32}
                  height={32}
                  className={isDark ? 'invert' : 'opacity-60'}
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="py-28 px-4 md:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.04 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Master Your Time
            </motion.h2>
            <motion.p
              className={`text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-3xl mx-auto ${isDark ? 'text-white' : 'text-black'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Schedl empowers you with a sleek, futuristic platform to manage meetings, tasks, and workflows effortlessly.
            </motion.p>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="py-10 px-4 backdrop-blur-lg border-t border-gray-800/30 relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p className={`text-sm md:text-base ${isDark ? 'text-white' : 'text-black'}`}>
              © 2025{' '}
              <Link href="/secret-page">
                <motion.span
                  whileHover={{ color: '#60a5fa' }}
                  className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}
                >
                  Schedl.pro
                </motion.span>
              </Link>
              . All rights reserved.
            </p>
            <div className="mt-6 flex justify-center gap-10 text-sm md:text-base">
              <Link href="/contact">
                <motion.span
                  whileHover={{ y: -4, color: '#60a5fa' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`relative ${isDark ? 'text-white' : 'text-black'}`}
                >
                  Contact Us
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
              <Link href="/terms">
                <motion.span
                  whileHover={{ y: -4, color: '#60a5fa' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className={`relative ${isDark ? 'text-white' : 'text-black'}`}
                >
                  Terms
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  );
};

export default Home;