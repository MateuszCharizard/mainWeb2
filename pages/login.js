import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    
    // Check if the user exists and the password matches
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      // If login is successful, redirect to the order-confirmation page
      toast.success('Login successful!');
      router.push('/order-confirmation');
    } else {
      setError('Invalid username or password');
      toast.error('Invalid username or password');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>
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
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-2 w-full rounded-lg hover:bg-blue-500"
        >
          Log In
        </button>
        <div className="mt-4 text-center">
          <p className="text-white">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-500">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
