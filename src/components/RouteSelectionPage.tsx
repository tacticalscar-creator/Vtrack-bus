import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import type { DriverProfile } from '../App';

interface RouteSelectionPageProps {
  driverProfile: DriverProfile;
  onRouteConfirm: (route: string) => void;
}

const RouteSelectionPage: React.FC<RouteSelectionPageProps> = ({ 
  driverProfile, 
  onRouteConfirm 
}) => {
  const [selectedRoute, setSelectedRoute] = useState('');

  // Placeholder routes - you can populate these later
  const routes = [
   'Route 1 - Padi Saravana ',
  'Route 1A - Padi Saravana - Thirumullaivayal',
  'Route 2 - Ayanavaram',
  'Route 2A - Ayanavaram - Maduravoyal',
  'Route 3 - Anna Nagar Roundtana',
  'Route 3A - Anna Nagar Roundtana - Wavin',
  'Route 4 - Nolambur - Vanagaram',
  'Route 4A - Nolambur - MGR University',
  'Route 5 - Perambur Church',
  'Route 5A - Perambur Church - Kolathur Police Station',
  'Route 6 - Purasaiwakkam',
  'Route 6A - Purasaiwakkam - Power House',
  'Route 7 - Avichi School - Virugambakkam',
  'Route 7A - Avichi School via Porur',
  'Route 8 - K.K.Nagar',
  'Route 8A - K.K.Nagar via Porur',
  'Route 8B - K.K.Nagar via Kovur',
  'Route 9 - Ramapuram Junction',
  'Route 9A - Ramapuram Junction via Ayyappanthangal',
  'Route 10 - CMBT',
  'Route 10A - CMBT - Nanganallur',
  'Route 11 - Sterling Road',
  'Route 11A - Sterling Road - Ayodhya Mandapam',
  'Route 12 - Red Hills',
  'Route 12A - Red Hills - Ambattur OT',
  'Route 13 - Mandaveli',
  'Route 13A - Mandaveli - Saidapet',
  'Route 13B - Mandaveli - Balaji Dental College',
  'Route 14 - Triplicane',
  'Route 14A - Triplicane - Gandhi Mandapam',
  'Route 14B - Triplicane - Velcahery Bus Stand',
  'Route 15 - Thiruvottiyur',
  'Route 15A - Parrys',
  'Route 15B - Parrys - Santhome',
  'Route 16 - Adyar - Besant Nagar',
  'Route 16A - Adyar - Neelankarai',
  'Route 17 - Kutchery Road',
  'Route 17A - Kuthery Road - Tansi Nagar',
  'Route 18 - Kundrathur',
  'Route 18A - Kundrathur - Pallavaram',
  'Route 19 - Natraja Theater',
  'Route 19A - Natraja Theater - Nerkundram',
  'Route 20 - Adyar Aavin',
  'Route 20A - Adyar Aavin - Baby Nagar',
  'Route 21 - Chengalpattu',
  'Route 21A - Chengalpattu - Pothery',
  'Route 22 - MCC - Tambaram Hindu Mission Hospital',
  'Route 22A - Madras Christian College (MCC)',
  'Route 23A - Moolakadai - Padi',
  'Route 24 - Amma Nana',
  'Route 24A - Amma Nana - Sholinganallur',
  'Route 25 - Madipakkam - MRTS Road Adambakkam',
  'Route 25A - Madipakkam - Keelkattalai',
  'Route 25B - Madipakkam - Medavakkam',
  'Route 26 - Santhosapuram',
  'Route 26A - Santhosapuram - Rajkilpakkam',
  'Route 27 - Ashok Pillar',
  'Route 27A - Ekkatuthangal - Adambakkam Police Booth',
  'Route 28A - ICF',
  'Route 29 - Kalpakkam',
  'Route 30 - Thiruvallur',
  'Route 31 - Karasangal',
  'Route 32 - Thiruvanmiyur',
  'Route 33 - Madhyakailash',
  'Route 34 - Velachery',
  'Route 35 - Kaiveli',
  'Route 36 - Madhavaram Roundana',
  'Route 37 - Thirumangalam',
  'Route 38 - Golden Flats',
  'Route 39 - Guindy',
  'Route 40 - Avadi',
  'Route 41 - Bollineni Hills',
  'Route 42 - Thillai Ganga Nagar Subway',
  ];

  const handleConfirm = () => {
    if (selectedRoute) {
      onRouteConfirm(selectedRoute);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Select Your Route</h1>
            <p className="text-lg text-gray-600">Welcome, {driverProfile.name || driverProfile.phone}</p>
          </div>

          {/* Route Selection */}
          <div className="space-y-6">
            <div>
              <label htmlFor="route" className="block text-lg font-medium text-gray-700 mb-3">
                Choose your bus route
              </label>
              <div className="relative">
                <select
                  id="route"
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="w-full appearance-none bg-white border-2 border-gray-300 rounded-xl py-4 px-6 pr-12 text-xl text-gray-900 focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select a route...</option>
                  {routes.map((route, index) => (
                    <option key={index} value={route}>
                      {route}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 pointer-events-none" />
              </div>
            </div>

            {/* Selected Route Display */}
            {selectedRoute && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <p className="text-lg font-medium text-blue-800">Selected Route:</p>
                <p className="text-xl font-semibold text-blue-900">{selectedRoute}</p>
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={!selectedRoute}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg"
            >
              Confirm Route
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteSelectionPage;