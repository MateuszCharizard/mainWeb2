import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { Moon, Sun, PlusCircle, Trash2, Menu } from 'lucide-react';
import { Combobox } from '@headlessui/react'; // For searchable dropdown

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goal, setGoal] = useState(null);

  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');
  const [dailyIntake, setDailyIntake] = useState({ calories: 0, proteins: 0 });
  const [dayHistory, setDayHistory] = useState([]);
  const [todayDate, setTodayDate] = useState('');

  // Predefined list of workout names
  const workoutOptions = [
    'Push-ups', 'Squats', 'Deadlifts', 'Pull-ups', 'Lunges', 'Bench Press', 
    'Running', 'Cycling', 'Jump Rope', 'Yoga', 'Plank', 'Mountain Climbers', 
    'Burpees', 'Kettlebell Swing', 'Box Jumps', 'Dumbbell Rows', 'Leg Press', 
    'Overhead Press', 'Bicep Curls', 'Tricep Dips', 'Crunches', 'Leg Raises', 
    'Russian Twists', 'Chest Fly', 'Glute Bridges', 'Step-ups', 'High Knees', 
    'Treadmill Sprints', 'Barbell Squat', 'Lateral Raises', 'Push Press', 'Treadmill Walk'
  ];

  useEffect(() => {
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts'));
    if (savedWorkouts) setWorkouts(savedWorkouts);

    const savedGoal = JSON.parse(localStorage.getItem('goal'));
    if (savedGoal) setGoal(savedGoal);

    // Get today's date for calorie reset
    const currentDate = new Date().toISOString().split('T')[0];
    setTodayDate(currentDate);

    const savedDayHistory = JSON.parse(localStorage.getItem('dayHistory')) || [];
    setDayHistory(savedDayHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
    localStorage.setItem('goal', JSON.stringify(goal));
    localStorage.setItem('dayHistory', JSON.stringify(dayHistory));
  }, [workouts, goal, dayHistory]);

  const addWorkout = (e) => {
    e.preventDefault();
    if (!workout || !date || !weight || !category) return;

    const newWorkout = { workout, date, weight, category };
    setWorkouts([...workouts, newWorkout]);
    toast.success('Workout added!');
    setWorkout(''); setDate(''); setWeight(''); setCategory('');
  };

  const removeWorkout = (index) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
    toast.error('Workout removed');
  };

  const weightData = {
    labels: workouts.map((item) => item.date),
    datasets: [{
      label: 'Weight Progress',
      data: workouts.map((item) => parseFloat(item.weight)),
      borderColor: '#4CAF50',
      tension: 0.3,
    }],
  };

  const filteredWorkouts = workouts.filter(workout =>
    workout.workout.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGoalChange = (e) => {
    const newGoal = { ...goal, target: e.target.value };
    setGoal(newGoal);
    localStorage.setItem('goal', JSON.stringify(newGoal));
  };

  const handleAddFood = () => {
    if (!food || !calories || !proteins) {
      toast.error('Please enter food details');
      return;
    }

    const foodItem = { food, calories: parseFloat(calories), proteins: parseFloat(proteins) };
    
    // Update daily intake
    setDailyIntake(prev => ({
      calories: prev.calories + foodItem.calories,
      proteins: prev.proteins + foodItem.proteins
    }));

    // Add food to today's history
    const newHistory = {
      date: todayDate,
      foodItems: [...(dayHistory.filter(day => day.date === todayDate).map(day => day.foodItems).flat() || []), foodItem],
    };

    // Update the history with today's food
    setDayHistory(prev => {
      const filteredHistory = prev.filter(day => day.date !== todayDate);
      return [...filteredHistory, newHistory];
    });

    // Reset food input fields
    setFood('');
    setCalories('');
    setProteins('');
    toast.success('Food item added!');
  };

  const resetDailyIntake = () => {
    setDailyIntake({ calories: 0, proteins: 0 });
  };

  return (
    <div className={`min-h-screen flex bg-gray-950 text-white transition-all`}>
      <Toaster position="top-center" />

      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }} 
        animate={{ x: sidebarOpen ? 0 : -250 }} 
        transition={{ duration: 0.3 }}
        className="w-64 h-full bg-gray-900 p-6 fixed top-0 left-0 flex flex-col space-y-4 shadow-lg"
      >
        <button onClick={() => setSidebarOpen(false)} className="self-end text-gray-400">✖</button>
        <h2 className="text-xl font-semibold">Settings</h2>
        <button 
          className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 flex items-center gap-2" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />} Toggle Theme
        </button>

        {/* Goal Setting */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Set Your Goal</h3>
          <input 
            type="number" 
            placeholder="Target Weight (kg)" 
            value={goal ? goal.target : ''} 
            onChange={handleGoalChange}
            className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-screen-lg mx-auto flex space-x-6">
        {/* Left Section: Workouts */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Track Your Workouts</h2>
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
              <Menu size={24} />
            </button>
          </div>

          <motion.form onSubmit={addWorkout} className="bg-gray-900 p-6 rounded-xl shadow-lg">
            <div className="space-y-4">
              {/* Workout selection */}
              <Combobox value={workout} onChange={setWorkout}>
                <Combobox.Input
                  className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search workouts"
                />
                <Combobox.Options>
                  {workoutOptions.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase())).map((option, index) => (
                    <Combobox.Option key={index} value={option}>
                      {({ active }) => (
                        <div className={`p-3 ${active ? 'bg-gray-600' : ''}`}>{option}</div>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>

              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
              <input 
                type="number" 
                placeholder="Weight (kg/lbs)" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" 
              />
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >

                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Flexibility">Flexibility</option>
              </select>
            </div>

            <button className="w-full py-3 mt-4 flex items-center justify-center bg-green-500 rounded-md hover:bg-green-600">
              <PlusCircle size={20} className="mr-2" /> Add Workout
            </button>
          </motion.form>
        </div>

        {/* Right Section: Calorie Tracker */}
        <div className="w-1/3 bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Calorie Tracker</h2>
          
          <div>
            <input 
              type="text" 
              placeholder="Food Name" 
              value={food} 
              onChange={(e) => setFood(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500" 
            />
            <input 
              type="number" 
              placeholder="Calories" 
              value={calories} 
              onChange={(e) => setCalories(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-2" 
            />
            <input 
              type="number" 
              placeholder="Proteins" 
              value={proteins} 
              onChange={(e) => setProteins(e.target.value)} 
              className="w-full p-3 rounded-md bg-gray-800 border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 mt-2" 
            />
          </div>

          <button 
            onClick={handleAddFood} 
            className="w-full py-3 mt-4 flex items-center justify-center bg-green-500 rounded-md hover:bg-green-600"
          >
            <PlusCircle size={20} className="mr-2" /> Add Food
          </button>

          <div className="mt-6">
            <div className="text-lg font-semibold">Today's Intake</div>
            <div className="mt-2 text-sm">Calories: {dailyIntake.calories} kcal</div>
            <div className="mt-1 text-sm">Proteins: {dailyIntake.proteins} g</div>
            <button 
              onClick={resetDailyIntake} 
              className="mt-4 w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
              Reset Today's Intake
            </button>

          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Day History</h3>
            {dayHistory.map((day, index) => (
              <div key={index} className="mt-2">
                <div className="text-sm font-semibold">{day.date}</div>
                {day.foodItems.map((item, idx) => (
                  <div key={idx} className="text-sm">{item.food} - {item.calories} kcal, {item.proteins} g</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
