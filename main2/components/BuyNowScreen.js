import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTheme } from '../components/themeContext';

export default function ProductPage() {
  const router = useRouter();
  const { theme } = useTheme(); // Access the current theme

  const [selectedModel, setSelectedModel] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleBuyNow = () => {
    if (selectedModel && selectedStorage && selectedColor) {
      // Navigate to BuyNowScreen with selected options
      router.push({
        pathname: '/buy', // your BuyNowScreen page
        query: {
          model: selectedModel,
          storage: selectedStorage,
          color: selectedColor,
        },
      });
    } else {
      toast.error('Please fill out all options');
    }
  };

  // Define dynamic classes based on the theme
  const themeStyles = {
    light: {
      background: 'bg-white',
      text: 'text-gray-800',
      selectBg: 'bg-gray-100',
      selectText: 'text-gray-700',
      buttonBg: 'bg-blue-600',
      buttonHover: 'hover:bg-blue-500',
      pageBackground: 'bg-gray-50', // Light page background
    },
    dark: {
      background: 'bg-gray-800',
      text: 'text-white',
      selectBg: 'bg-gray-700',
      selectText: 'text-white', // White text in the dark theme for the dropdown
      buttonBg: 'bg-blue-400',
      buttonHover: 'hover:bg-blue-300',
      pageBackground: 'bg-gray-900', // Dark page background
    },
  };

  const currentStyles = themeStyles[theme];

  return (
    <div className={`${currentStyles.pageBackground} min-h-screen flex items-center justify-center`}>
      <div className={`p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 ${currentStyles.text}`}>
        <h2 className="text-3xl font-semibold text-center mb-6">
          Select Your Product
        </h2>

        {/* Dropdowns for Model, Storage, and Color */}
        <div className="space-y-4">
          <select
            onChange={(e) => setSelectedModel(e.target.value)}
            value={selectedModel}
            className={`${currentStyles.selectBg} ${currentStyles.selectText} p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full`}
          >
            <option value="">Select Model</option>
            <option value="iPhone 15">iPhone 15</option>
            <option value="MacBook Air">MacBook Air</option>
            <option value="iPad Pro">iPad Pro</option>
          </select>

          <select
            onChange={(e) => setSelectedStorage(e.target.value)}
            value={selectedStorage}
            className={`${currentStyles.selectBg} ${currentStyles.selectText} p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full`}
          >
            <option value="">Select Storage</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
          </select>

          <select
            onChange={(e) => setSelectedColor(e.target.value)}
            value={selectedColor}
            className={`${currentStyles.selectBg} ${currentStyles.selectText} p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-full`}
          >
            <option value="">Select Color</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Black">Black</option>
          </select>
        </div>

        <button
          onClick={handleBuyNow}
          className={`${currentStyles.buttonBg} text-white p-3 rounded-lg w-full ${currentStyles.buttonHover} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
