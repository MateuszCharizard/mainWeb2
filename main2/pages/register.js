import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    // Check if the user already exists
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser) {
      setError('User already exists!');
      toast.error('User already exists!');
      return;
    }

    // Store the new user's details in localStorage
    const newUser = { username, password };
    localStorage.setItem('user', JSON.stringify(newUser));

    toast.success('Account created successfully!');
    router.push('/login'); // Redirect to login page after registration
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="bg-neutral-700 text-white px-4 py-2 w-full rounded-lg mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-neutral-700 text-white px-4 py-2 w-full rounded-lg mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-green-600 text-white px-6 py-2 w-full rounded-lg hover:bg-green-500"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <p className="text-white">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
