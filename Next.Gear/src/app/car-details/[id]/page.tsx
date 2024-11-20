import { notFound } from 'next/navigation';
import { carsData } from '../../data/carsData';
import Image from 'next/image';

// Define the type for the params in the Props interface
interface Props {
  params: { id: string };
}

// Static generation function to generate dynamic routes at build time
export async function generateStaticParams() {
  // Generate static params with IDs as strings
  const cars = carsData.map(car => ({
    id: car.id.toString(),  // Ensure that the ID is a string for each car
  }));

  // Return the params for each car as an array
  return cars.map(car => ({
    params: car,
  }));
}

const CarDetails = ({ params }: Props) => {
  const { id } = params;

  // Find the car based on the ID (converted to number)
  const car = carsData.find((car) => car.id === parseInt(id));

  // If no car is found, show a 404 error page
  if (!car) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Use next/image for optimized image rendering */}
        <Image
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
          width={800}
          height={600}
        />
        <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
        <p className="text-gray-700 mb-2">Manufacturer: {car.manufacturer}</p>
        <p className="text-gray-700 mb-2">Color: {car.color}</p>
        <p className="text-gray-700 mb-2">Price: {car.price}</p>

        <p className="text-gray-700 mt-4">Description: {car.description}</p>

        <a
          href="/car-listing"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

export default CarDetails;
