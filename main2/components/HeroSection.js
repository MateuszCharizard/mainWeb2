// components/HeroSection.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../components/Button';




export default function HeroSection() {
  const [heroImage, setHeroImage] = useState('/hero.png');

  useEffect(() => {
    const images = ['/hero1.png', '/hero2.png', '/hero3.png'];
    let currentIndex = 0;

    setInterval(() => {
      setHeroImage(images[currentIndex]);
      currentIndex = (currentIndex + 1) % images.length;
    }, 5000);
  }, []);

  return (
    <div className="relative bg-black text-white min-h-screen flex items-center justify-center z-10">
      <h1 
        className="text-5xl md:text-7xl font-bold opacity-0 transition-opacity duration-1000 ease-in-out"
      >
        Get Ready to Experience
      </h1>
      <p className="text-lg md:text-xl mt-4 max-w-2xl opacity-0 transition-opacity duration-1000 ease-in-out">
        The latest in technology is here.
      </p>

      <Button className="mt-6 bg-white text-black px-6 py-2 text-lg rounded-full hover:bg-gray-300">
        Learn More
      </Button>
      
      {/* Parallax effect for hero background */}
      <div 
        className="absolute inset-0 -z-10 parallax-background"
      >
        <Image 
          src={heroImage} 
          alt="Hero" 
          layout="fill" 
          objectFit="cover" 
          className="opacity-30 transition-opacity duration-1000 ease-in-out"
        />
      </div>
    </div>
  );
}