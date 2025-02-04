import { useTheme } from '../components/themeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-black' : 'bg-gray-800'}`}>
      <h1 className={`${theme === 'dark' ? 'text-white' : 'text-gray-200'}`}>My Store</h1>
      <label htmlFor="dark-mode-toggle" className="relative inline-block w-12 h-6 transition duration-300">
        <input
          type="checkbox"
          id="dark-mode-toggle"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="opacity-0 w-0 h-0"
        />
        <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-200 rounded-full transition duration-300"></span>
        <span
          className={`absolute w-6 h-6 bg-gray-800 rounded-full transition-transform duration-300 shadow-md dark:shadow-none ${
            theme === 'dark' ? 'translate-x-6 bg-white' : 'bg-gray-800'
          }`}
        ></span>
      </label>
    </nav>
  );
};

export default Navbar;
