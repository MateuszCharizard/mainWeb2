import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }

    const savedWorkouts = JSON.parse(localStorage.getItem("workouts"));
    if (savedWorkouts) {
      setWorkouts(savedWorkouts);
      setFilteredWorkouts(savedWorkouts);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
    setFilteredWorkouts(workouts.filter(item =>
      item.workout.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [workouts, searchTerm]);

  const addWorkout = (e) => {
    e.preventDefault();
    if (!workout || !date || !weight || !category) return;

    const newWorkout = { workout, date, weight, category };
    setWorkouts([...workouts, newWorkout]);
    toast.success("Workout added successfully!");
    setWorkout('');
    setDate('');
    setWeight('');
    setCategory('');
  };

  const removeWorkout = (index) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
    toast.error("Workout removed");
  };

  const weightData = {
    labels: workouts.map((item) => item.date),
    datasets: [{
      label: 'Weight Progress',
      data: workouts.map((item) => parseFloat(item.weight)),
      fill: false,
      borderColor: '#4CAF50',
      tension: 0.1,
    }],
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Toaster position="top-center" />
      
      <nav className={`p-6 flex justify-between items-center shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold tracking-tight">Gym Scheduler</h1>
        <button
          className="p-3 rounded-md text-sm transition-all duration-300 font-semibold"
          style={{ background: darkMode ? '#555' : '#ddd', color: darkMode ? 'white' : 'black' }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>

      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-2">Plan Your Gym Workouts</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Schedule your workouts with weight tracking.</p>

        <form onSubmit={addWorkout} className="mt-6 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">Add a New Workout</h3>
          
          <input
            type="text"
            placeholder="Workout name"
            value={workout}
            onChange={(e) => setWorkout(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300 focus:outline-none focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Weight (kg/lbs)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300 focus:outline-none focus:border-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Flexibility">Flexibility</option>
          </select>
          
          <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-lg hover:bg-blue-600 focus:outline-none transition duration-300">
            Add Workout
          </button>
        </form>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Your Workouts</h3>
          <input
            type="text"
            placeholder="Search workouts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 mb-4 rounded-md border-2 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition duration-300 focus:outline-none focus:border-blue-500"
          />
          {filteredWorkouts.length === 0 && <p className="text-gray-600">No workouts found.</p>}
          <ul className="space-y-4">
            {filteredWorkouts.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700 rounded-xl shadow-md"
              >
                <div>
                  <p className="font-semibold text-lg">{item.workout} - {item.date}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Weight: {item.weight} kg/lbs | Category: {item.category}</p>
                </div>
                <button
                  onClick={() => removeWorkout(index)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                >
                  ❌
                </button>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Weight Progress</h3>
          {workouts.length > 0 && (
            <Line data={weightData} options={{ responsive: true }} />
          )}
        </div>
      </div>
    </div>
  );
}
