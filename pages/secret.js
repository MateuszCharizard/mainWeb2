import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const addWorkout = (e) => {
    e.preventDefault();
    if (!workout || !date || !weight) return;
    setWorkouts([...workouts, { workout, date, weight }]);
    toast.success("Workout added successfully!");
    setWorkout('');
    setDate('');
    setWeight('');
  };

  const removeWorkout = (index) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
    toast.error("Workout removed");
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Toaster position="top-center" />
      <nav className={`p-4 flex justify-between items-center shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-xl font-bold">Gym Scheduler</h1>
        <button
          className="p-2 rounded-md transition-all duration-300"
          style={{ background: darkMode ? '#555' : '#ddd', color: darkMode ? 'white' : 'black' }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>

      <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold">Plan Your Gym Workouts</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Schedule your workouts with weight tracking.</p>

        <form onSubmit={addWorkout} className="mt-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
          <h2 className="text-lg font-bold mb-2">Add Workout</h2>
          <input
            type="text"
            placeholder="Workout name"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <input
            type="number"
            placeholder="Weight (kg/lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 mb-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
          <button className="w-full bg-blue-500 text-white p-2 rounded-md">Add Workout</button>
        </form>

        <div className="mt-4">
          <h2 className="text-lg font-bold">Your Workouts</h2>
          {workouts.length === 0 && <p className="text-gray-600">No workouts scheduled.</p>}
          <ul className="mt-2">
            {workouts.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md mt-1 flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{item.workout} - {item.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weight: {item.weight} kg/lbs</p>
                </div>
                <button
                  onClick={() => removeWorkout(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  ❌
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
