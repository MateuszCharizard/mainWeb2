import { useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      // If user is not logged in, redirect to login page
      toast.error('Please log in to proceed');
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Order Confirmation</h2>
        <p className="text-white text-center">
          You are successfully logged in and ready to complete your purchase!
        </p>
      </div>
    </div>
  );
}
