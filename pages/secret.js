import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState({ premium: false, settings: false, updates: false, logout: false });

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleKeyDown = (e, callback) => {
    if (e.key === 'Enter' || e.key === ' ') {
      callback();
    }
  };

  // Animation variants
  const buttonVariants = {
    hover: { 
      scale: 1.1, 
      boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)', 
      transition: { type: 'spring', stiffness: 300 } 
    },
    tap: { scale: 0.95 },
  };

  const logoutButtonVariants = {
    hover: { 
      scale: 1.1, 
      boxShadow: '0 0 10px rgba(255, 79, 91, 0.5)', 
      transition: { type: 'spring', stiffness: 300 } 
    },
    tap: { scale: 0.95 },
  };

  const pillVariants = {
    normal: { scale: 1, padding: '6px 10px', transition: { duration: 0.3, ease: 'easeOut' } },
    expanded: { scale: 1.03, padding: '8px 12px', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-white font-inter relative overflow-hidden">
      <Head>
        <title>Schedl</title>
        <meta name="description" content="Schedl is an innovative platform designed to streamline scheduling and productivity. Whether you are managing meetings, tasks, or team workflows, we have got you covered. Stay tuned for more updates!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <meta http-equiv="Content-Language" content="en" />
        <meta name="theme-color" content="#0F1419" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="https://i.snipp.gg/527450380389318667/25bb7bb8312eda5b906ac51fd3f19bd8.png" />
      </Head>

      {/* Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grok.com/images/stars-bg.png')] bg-cover opacity-20 animate-pulse"></div>
      </div>

      {/* Fixed Header */}
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 bg-transparent py-6 px-4 sm:px-6 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Dynamic Island Pill */}
        <motion.div
          className="bg-[#1C2526]/80 backdrop-blur-lg rounded-full flex items-center space-x-1 sm:space-x-1.5 border border-[#00D4FF]/20 shadow-md"
          variants={pillVariants}
          animate={isSettingsOpen ? 'expanded' : 'normal'}
          initial="normal"
        >
          <motion.div 
            className="relative"
            onHoverStart={() => setShowTooltip({ ...showTooltip, premium: true })}
            onHoverEnd={() => setShowTooltip({ ...showTooltip, premium: false })}
          >
            <Link href="/premium">
              <motion.button
                className="p-3 bg-transparent rounded-full border border-[#00D4FF]/40 hover:bg-[#00D4FF]/15 transition-colors flex items-center justify-center"
                aria-label="Go Premium"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onKeyDown={(e) => handleKeyDown(e, () => window.location.href = '/premium')}
                tabIndex={0}
              >
                <Image
                  src="https://img.icons8.com/ios-filled/50/ffffff/star.png"
                  alt="Go Premium"
                  width={32}
                  height={32}
                  className="select-none"
                  loading="lazy"
                />
              </motion.button>
            </Link>
            <AnimatePresence>
              {showTooltip.premium && (
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2526] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md border border-[#00D4FF]/30"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  Go Premium
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="relative"
            onHoverStart={() => setShowTooltip({ ...showTooltip, settings: true })}
            onHoverEnd={() => setShowTooltip({ ...showTooltip, settings: false })}
          >
            <motion.button
              className="p-3 bg-transparent rounded-full border border-[#00D4FF]/40 hover:bg-[#00D4FF]/15 transition-colors flex items-center justify-center"
              aria-label="Settings"
              onClick={toggleSettings}
              onKeyDown={(e) => handleKeyDown(e, toggleSettings)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
            >
              <Image
                src="https://img.icons8.com/ios-filled/50/ffffff/settings.png"
                alt="Settings"
                width={32}
                height={32}
                className="select-none"
                loading="lazy"
              />
            </motion.button>
            <AnimatePresence>
              {showTooltip.settings && (
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2526] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md border border-[#00D4FF]/30"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  Settings
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.ul
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2526]/80 backdrop-blur-lg rounded-lg shadow-lg w-40 py-2 border border-[#00D4FF]/20"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {['Profile', 'Preferences', 'Notifications', 'Account'].map((item, index) => (
                    <motion.li
                      key={item}
                      className="px-4 py-2 text-white text-sm hover:bg-[#00D4FF]/20 hover:text-[#00D4FF] transition-colors w-full text-center"
                      whileHover={{ scale: 1.03 }}
                      tabIndex={0}
                      onKeyDown={(e) => handleKeyDown(e, () => {})}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="relative"
            onHoverStart={() => setShowTooltip({ ...showTooltip, updates: true })}
            onHoverEnd={() => setShowTooltip({ ...showTooltip, updates: false })}
          >
            <motion.button
              className="p-3 bg-transparent rounded-full border border-[#00D4FF]/40 hover:bg-[#00D4FF]/15 transition-colors flex items-center justify-center"
              aria-label="View Updates"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, () => {})}
            >
              <Image
                src="https://img.icons8.com/ios-filled/50/ffffff/available-updates.png"
                alt="Updates"
                width={32}
                height={32}
                className="select-none"
                loading="lazy"
              />
            </motion.button>
            <AnimatePresence>
              {showTooltip.updates && (
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2526] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md border border-[#00D4FF]/30"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  View Updates
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            className="relative"
            onHoverStart={() => setShowTooltip({ ...showTooltip, logout: true })}
            onHoverEnd={() => setShowTooltip({ ...showTooltip, logout: false })}
          >
            <motion.button
              className="p-3 bg-transparent rounded-full border border-[#FF4F5B]/40 hover:bg-[#FF4F5B]/15 transition-colors flex items-center justify-center"
              aria-label="Log Out"
              variants={logoutButtonVariants}
              whileHover="hover"
              whileTap="tap"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, () => {})}
            >
              <Image
                src="https://img.icons8.com/ios-filled/50/ffffff/logout-rounded.png"
                alt="Log Out"
                width={32}
                height={32}
                className="select-none"
                loading="lazy"
              />
            </motion.button>
            <AnimatePresence>
              {showTooltip.logout && (
                <motion.div
                  className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#1C2526] text-white text-xs font-medium px-2 py-1 rounded-md shadow-md border border-[#FF4F5B]/30"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  Log Out
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
        <motion.div 
          className="text-center max-w-2xl" 
          initial="hidden" 
          animate="visible" 
          variants={textVariants}
        >
          <motion.span
            className="inline-block bg-[#00D4FF]/20 text-[#00D4FF] text-sm font-semibold px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            Beta
          </motion.span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
            {['S', 'c', 'h', 'e', 'd', 'l'].map((char, index) => (
              <motion.span
                key={index}
                className="inline-block text-white hover:text-[#00D4FF] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="inline-block text-[#00D4FF]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              .
            </motion.span>
            {['P', 'r', 'o'].map((char, index) => (
              <motion.span
                key={index + 7}
                className="inline-block text-white hover:text-[#00D4FF] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 7) * 0.05, duration: 0.3 }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
          <p className="text-base sm:text-lg text-gray-300 mb-8">
            Streamline your scheduling and boost productivity with Schedl. Manage meetings, tasks, and workflows effortlessly.
          </p>
          <motion.button
            className="px-6 py-3 bg-[#00D4FF] text-[#0F1419] font-semibold rounded-full hover:bg-[#00B8E6] transition-colors"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Start Scheduling"
            tabIndex={0}
          >
            Start Scheduling
          </motion.button>
        </motion.div>
        <motion.div 
          className="mt-10" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.span className="animate-bounce">
            <Image
              src="https://img.icons8.com/ios-filled/50/ffffff/down.png"
              alt="Scroll Down"
              width={24}
              height={24}
              className="invert"
              loading="lazy"
            />
          </motion.span>
        </motion.div>
      </div>

      {/* About Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0F1419] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={textVariants}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            What Do We Offer?
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            {[
              'Schedl ',
              'is ',
              'an ',
              'innovative ',
              'platform ',
              'designed ',
              'to ',
              'streamline ',
              'scheduling ',
              'and ',
              'productivity. ',
              'Whether ',
              'you ',
              'are ',
              'managing ',
              'meetings, ',
              'tasks, ',
              'or ',
              'team ',
              'workflows, ',
              'we ',
              'have ',
              'got ',
              'you ',
              'covered. ',
              'Stay ',
              'tuned ',
              'for ',
              'more ',
              'updates! ',
            ].map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-1 hover:text-[#00D4FF] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-6 bg-[#0F1419] text-center text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © 2025{' '}
        <Link href="/secret-page">
          <motion.span 
            className="text-[#00D4FF] hover:text-[#00B8E6] transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Schedl.pro
          </motion.span>
        </Link>
        . All rights reserved.
        <div className="mt-2 flex justify-center space-x-4 sm:space-x-6">
          <Link href="/contact">
            <motion.span
              className="text-gray-400 hover:text-[#00D4FF] transition-colors"
              whileHover={{ y: -2 }}
              tabIndex={0}
            >
              Contact Us
            </motion.span>
          </Link>
          <Link href="/terms">
            <motion.span
              className="text-gray-400 hover:text-[#00D4FF] transition-colors"
              whileHover={{ y: -2 }}
              tabIndex={0}
            >
              Terms
            </motion.span>
          </Link>
        </div>
      </motion.footer>

      <div className="hidden">No Data</div>
      <div id="_rht_toaster" className="fixed z-[9999] inset-4 pointer-events-none"></div>
    </div>
  );
}