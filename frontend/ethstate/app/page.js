'use client';
import React, { useState } from 'react';

const Home = () => {
  const [bedrooms, setBedrooms] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Sample property data - replace with your actual data
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Condo",
      bedrooms: 2,
      city: "Austin",
      state: "TX",
      zipCode: "78701",
      price: "$450,000",
      imageUrl: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Suburban Family Home",
      bedrooms: 4,
      city: "Houston",
      state: "TX",
      zipCode: "77024",
      price: "$750,000",
      imageUrl: "/api/placeholder/400/250"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Web3 Real Estate</span>
              <div className="ml-10 flex items-center space-x-4">
                <button className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  List Property
                </button>
                <button className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  Invest
                </button>
                <button className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
                  Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Find Your Perfect Property</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">Bedrooms</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="City"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <select
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">State</option>
              <option value="TX">Texas</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
            </select>

            <input
              type="text"
              placeholder="ZIP Code"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {property.price}
                </p>
                <div className="text-sm text-gray-500 mb-4">
                  <p>{property.bedrooms} Bedrooms</p>
                  <p>{property.city}, {property.state} {property.zipCode}</p>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;