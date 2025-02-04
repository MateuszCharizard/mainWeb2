import { useRouter } from 'next/router';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const getPrice = (model, storage) => {
  const prices = {
    'iPhone 15': { '128GB': 799, '256GB': 899, '512GB': 999 },
    'MacBook Air': { '128GB': 1299, '256GB': 1399, '512GB': 1499 },
    'iPad Pro': { '128GB': 799, '256GB': 899, '512GB': 999 },
  };
  return prices[model] ? prices[model][storage] : 0;
};

export default function BuyNowScreen() {
  const router = useRouter();
  const { model, storage, color } = router.query;

  const handleBuyNow = () => {
    if (model && storage && color) {
      // If all options are selected, show success toast
      toast.success('Successfully toasted! Redirecting...');
      setTimeout(() => {
        // Redirect to some page after buying (e.g., Order Confirmation)
        router.push('/register'); // Adjust the route as needed
      }, 1500);
    } else {
      toast.error('Please fill out all options');
    }
  };

  // Calculate the price based on the selections
  const price = getPrice(model, storage);

  return (
    <div className="bg-neutral-800 text-white h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-neutral-900 p-8 rounded-3xl shadow-3xl flex flex-col space-y-6 shadow-lg">
        <h2 className="text-4xl font-bold text-center mb-6">Ready to Purchase?</h2>

        {/* Display selected options and price */}
        <div className="space-y-4 p-4">
          <p className="text-lg">Model: {model}</p>
          <p className="text-lg">Storage: {storage}</p>
          <p className="text-lg">Color: {color}</p>

          {model && storage && color ? (
            <p className="text-lg mt-2 text-center">
              Price: ${price}
            </p>
          ) : null}
        </div>

        {/* Buy Now button */}
        <Button 
          onClick={handleBuyNow} 
          className="mt-6 bg-slate-500 text-black px-6 py-2 text-lg rounded-full hover:bg-gray-600 mx-auto transition-all"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
