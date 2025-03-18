import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";


const Button = ({ children, className }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "#ffffff", color: "#000000" }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default function Iphone16Landing() {
  const [bgColor, setBgColor] = useState("bg-black");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("black");

  return (
    <div className={`min-h-screen ${bgColor} text-white flex flex-col items-center justify-center px-12 py-8 transition-colors duration-700`}> 
      {/* Dynamic Island */}
      <motion.div 
        className="fixed top-4 bg-gray-900 px-6 py-3 rounded-full cursor-pointer shadow-lg"
        initial={{ width: 120, height: 40, borderRadius: 50 }}
        animate={isNavOpen ? { width: 400, height: 80, borderRadius: 20 } : { width: 120, height: 40 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <AnimatePresence>
          {isNavOpen ? (
            <motion.div 
              className="flex justify-around items-center w-full text-lg font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <a href="#" className="text-white">Home</a>
              <a href="#features" className="text-white">Features</a>
              <a href="#buy" className="text-white">Buy Now</a>
              <a href="#contact" className="text-white">Contact</a>
            </motion.div>
          ) : (
            <motion.p className="text-white text-center text-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>●</motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-center max-w-3xl mt-24"
      >
        <h1 className="text-7xl font-bold tracking-tight">iPhone 16 Pro</h1>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="text-2xl text-gray-300 mt-4"
        >
          The most advanced iPhone ever. Experience the future with groundbreaking technology.
        </motion.p>
        <div className="mt-6 space-x-4">
          <Button className="bg-white text-black shadow-lg hover:shadow-xl">Buy Now</Button>
          <Button className="bg-gray-800 text-white hover:bg-gray-700">Learn More</Button>
        </div>
      </motion.div>

      {/* 3D iPhone Model */}
      <div className="mt-12 w-full h-[500px] flex flex-col items-center">
        <Canvas className="w-full h-full">
          <OrbitControls enableZoom={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <IphoneModel color={selectedColor} />
        </Canvas>
        <div className="mt-4 flex space-x-4">
          {['black', 'white', 'blue', 'gold'].map((color) => (
            <button 
              key={color}
              className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 w-full bg-gray-900 py-6 text-center text-gray-400 text-sm">
        <p>&copy; 2025 Apple Inc. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </footer>
    </div>
  );
}
