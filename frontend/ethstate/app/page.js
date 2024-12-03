'use client';
import { useEffect, useState } from "react";
import { getContract } from "../components/ui/ethereum";
import Lock from "../contracts/Lock.json";
import { Search, MapPin, Home, Filter, Bed, Bath, Square } from "lucide-react";

export default function DashboardHome() {
  const [properties, setProperties] = useState([]);
  const [contract, setContract] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Real property data
  const realProperties = [
    {
      id: 1,
      title: "Luxury Spindrift Estate",
      address: "1900 Spindrift Dr, La Jolla, CA 92037",
      broker: "COMPASS",
      price: "108,000,000",
      beds: "10",
      baths: "17",
      sqft: "12,981",
      url: "https://www.zillow.com/homedetails/1900-Spindrift-Dr-La-Jolla-CA-92037/16839110_zpid/",
      available: true
    },
    {
      id: 2,
      address: "801 La Jolla Rancho Rd, La Jolla, CA 92037",
      broker: "BERKSHIRE HATHAWAY HOMESERVICES CALIFORNIA PROPERTIES",
      price: "3,995,000",
      beds: "3",
      baths: "3",
      sqft: "2,890",
      url: "https://www.zillow.com/homedetails/801-La-Jolla-Rancho-Rd-La-Jolla-CA-92037/16855358_zpid/",
      available: true
    },
    {
      id: 3,
      address: "6283 La Jolla Scenic Dr S, La Jolla, CA 92037",
      broker: "EXP REALTY OF CALIFORNIA, INC.",
      price: "22,500,000",
      beds: "7",
      baths: "10",
      sqft: "12,842",
      url: "https://www.zillow.com/homedetails/6283-La-Jolla-Scenic-Dr-S-La-Jolla-CA-92037/16852003_zpid/",
      available: true
    },
    {
      id: 4,
      address: "6653 Neptune Pl, La Jolla, CA 92037",
      broker: "PACASO INC.",
      price: "1,300,000",
      beds: "4",
      baths: "5",
      sqft: "3,124",
      url: "https://www.zillow.com/homedetails/6653-Neptune-Pl-La-Jolla-CA-92037/16850262_zpid/",
      available: true
    },
    {
      id: 5,
      address: "5740 La Jolla Corona Dr, La Jolla, CA 92037",
      broker: "PACIFIC SOTHEBY'S INT'L REALTY",
      price: "14,750,000",
      beds: "6",
      baths: "8",
      sqft: "8,810",
      url: "https://www.zillow.com/homedetails/5740-La-Jolla-Corona-Dr-La-Jolla-CA-92037/16856415_zpid/",
      available: true
    }
  ];

  useEffect(() => {
    async function initContract() {
      const contract = getContract(
        "0x433220a86126eFe2b8C98a723E73eBAd2D0CbaDc",
        Lock.abi,
        0
      );
      setContract(contract);
      setProperties(realProperties);
      setFilteredProperties(realProperties);
    }
    initContract();
  }, []);

  // Search functionality
  useEffect(() => {
    const filtered = properties.filter(property => 
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.broker.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  async function buyProperty(propertyId) {
    if (!contract) return;
    try {
      const tx = await contract.increment();
      await tx.wait();
      const updatedProperties = properties.map(p => 
        p.id === propertyId ? {...p, available: false} : p
      );
      setProperties(updatedProperties);
      setFilteredProperties(updatedProperties);
    } catch (error) {
      console.error("Error buying property:", error);
    }
  }

  const formatPrice = (price) => {
    return `$${price.replace(/,/g, ',')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Home className="h-8 w-8 text-rose-500" />
              <h1 className="ml-2 text-xl font-semibold text-gray-900">PropChain</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  placeholder="Search by address or broker..."
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Filter Button */}
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5 mr-2" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Count */}
        <div className="mb-6">
          <h2 className="text-lg text-gray-700">
            {filteredProperties.length === 0 
              ? "No properties found" 
              : `Showing ${filteredProperties.length} ${filteredProperties.length === 1 ? 'property' : 'properties'}`
            }
            {searchTerm && ` for "${searchTerm}"`}
          </h2>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* Property Iframe */}
              <div className="relative h-64 w-full bg-gray-200">
                <iframe
                  src={property.url}
                  title={property.address}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>

              {/* Property Details */}
              <div className="p-6">
                {/* Title Section - Two lines with ellipsis */}
                <div className="min-h-[4rem]"> {/* Fixed height for two lines */}
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {property.address}
                  </h3>
                </div>
                
                {/* Price directly under title */}
                <div className="mt-2">
                  <p className="text-xl font-bold text-rose-600">{formatPrice(property.price)}</p>
                  <p className="text-sm text-gray-500 mt-1">{property.broker}</p>
                </div>

                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.beds} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.baths} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    <span>{property.sqft} sqft</span>
                  </div>
                </div>

                <button
                  onClick={() => buyProperty(property.id)}
                  disabled={!property.available}
                  className={`mt-4 w-full py-2 px-4 rounded-lg text-white font-medium
                    ${property.available 
                      ? 'bg-rose-500 hover:bg-rose-600' 
                      : 'bg-gray-400 cursor-not-allowed'
                    } transition-colors duration-200`}
                >
                  {property.available ? 'Buy Property' : 'Sold'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No properties found matching your search</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}