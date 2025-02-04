// components/ProductGrid.js
import Image from 'next/image';




const products = [
  { name: "iPhone 15", src: '/iphone.png' },
  { name: "MacBook Air", src: '/macbookair.png' },
  { name: "iPad Pro", src: '/ipadpro.png' },
];

export default function ProductGrid() {
  return (
    <div className="py-40 px-6 flex flex-col gap-24 max-w-5xl mx-auto z-10">
      <h2 className="text-3xl font-bold opacity-0 transition-opacity duration-1000 ease-in-out">Explore Our Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.name} className="relative overflow-hidden rounded-lg">
            <Image 
              src={product.src} 
              alt={product.name} 
              width={600} 
              height={400} 
              layout="responsive" 
              objectFit="cover" 
              className="hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black opacity-70 flex items-center justify-center text-white">
              <h3 className="text-xl font-bold">{product.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}