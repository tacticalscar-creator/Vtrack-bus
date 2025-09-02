import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, LogOut, User } from 'lucide-react';
import type { DriverProfile } from '../App';

interface LocationSharingPageProps {
  selectedRoute: string;
  driverProfile: DriverProfile;
  onGoToProfile: () => void;
  onLogout: () => void;
  children?: React.ReactNode; // Map component
}

const LocationSharingPage: React.FC<LocationSharingPageProps> = ({
  selectedRoute,
  driverProfile,
  onGoToProfile,
  onLogout,
  children
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const startLocationShare = () => {
    setIsSharing(true);
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => setCurrentLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error(err),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
      (window as any).locationWatchId = watchId;
    }
  };

  const stopLocationShare = () => {
    setIsSharing(false);
    setCurrentLocation(null);
    if ((window as any).locationWatchId) {
      navigator.geolocation.clearWatch((window as any).locationWatchId);
      (window as any).locationWatchId = null;
    }
  };

  const toggleLocationSharing = () => (isSharing ? stopLocationShare() : startLocationShare());

  useEffect(() => {
    return () => {
      if ((window as any).locationWatchId) navigator.geolocation.clearWatch((window as any).locationWatchId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Bus Tracking</h1>
          <div className="flex space-x-3">
            <button onClick={onGoToProfile} className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-lg">
              <User className="w-5 h-5" /> <span>Profile</span>
            </button>
            <button onClick={onLogout} className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
              <LogOut className="w-5 h-5" /> <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Route */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 text-center">
          <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold">{selectedRoute}</h2>
          <div className={`inline-flex items-center space-x-2 px-4 py-2 mt-4 rounded-full ${isSharing ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'}`}>
            <div className={`w-3 h-3 rounded-full ${isSharing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span>{isSharing ? 'Sharing Active' : 'Sharing Off'}</span>
          </div>
          {currentLocation && (
            <p className="mt-2 text-sm font-mono">{currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
          )}
        </div>

        {/* Share Toggle */}
        <button
          onClick={toggleLocationSharing}
          className={`w-full py-4 rounded-2xl font-semibold text-white ${isSharing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} mb-6`}
        >
          {isSharing ? 'Stop Sharing Location' : 'Start Sharing Location'}
        </button>

        {/* Map */}
        {children && <div className="bg-white rounded-2xl shadow-xl p-4">{children}</div>}
      </div>
    </div>
  );
};

export default LocationSharingPage;
