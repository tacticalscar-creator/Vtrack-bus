import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, LogOut, User } from 'lucide-react';
import type { DriverProfile } from '../App';

interface LocationSharingPageProps {
  selectedRoute: string;
  driverProfile: DriverProfile;
  onGoToProfile: () => void;
  onLogout: () => void;
  children?: React.ReactNode; // 👈 allow MapplsMap (or anything) to be injected
}

const LocationSharingPage: React.FC<LocationSharingPageProps> = ({ 
  selectedRoute, 
  driverProfile,
  onGoToProfile,
  onLogout,
  children // 👈 accept children
}) => {
  const [isSharing, setIsSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  const startLocationShare = () => {
    console.log('Starting location sharing...');
    setIsSharing(true);

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          console.log('Location update:', location);
        },
        (error) => {
          console.error('Location error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
      (window as any).locationWatchId = watchId;
    }
  };

  const stopLocationShare = () => {
    console.log('Stopping location sharing...');
    setIsSharing(false);
    setCurrentLocation(null);

    if ((window as any).locationWatchId) {
      navigator.geolocation.clearWatch((window as any).locationWatchId);
      (window as any).locationWatchId = null;
    }
  };

  const toggleLocationSharing = () => {
    if (isSharing) {
      stopLocationShare();
    } else {
      startLocationShare();
    }
  };

  useEffect(() => {
    return () => {
      if ((window as any).locationWatchId) {
        navigator.geolocation.clearWatch((window as any).locationWatchId);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Bus Tracking</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={onGoToProfile}
                className="flex items-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-lg">Profile</span>
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-lg">Logout</span>
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-600">Driver: {driverProfile.name || driverProfile.phone}</p>
        </div>

        {/* Route Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center">
            <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Active Route</h2>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedRoute}</h3>
            
            {/* Status Indicator */}
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
              isSharing 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-700'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isSharing ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="font-medium">
                {isSharing ? 'Location Sharing Active' : 'Location Sharing Off'}
              </span>
            </div>

            {/* Current Location Display */}
            {currentLocation && (
              <div className="mt-4 p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-700 font-medium">Current Position:</p>
                <p className="text-lg text-green-800 font-mono">
                  {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Location Sharing Toggle */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <button
            onClick={toggleLocationSharing}
            className={`w-full flex items-center justify-center space-x-3 py-6 px-8 rounded-2xl text-2xl font-semibold transition-all duration-300 shadow-lg ${
              isSharing
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            <Navigation className={`w-8 h-8 ${isSharing ? 'animate-spin' : ''}`} />
            <span>
              {isSharing ? 'Stop Sharing Location' : 'Start Sharing Location'}
            </span>
          </button>
          
          <p className="text-center text-gray-600 mt-4 text-lg">
            {isSharing 
              ? 'Your location is being shared in real-time'
              : 'Press to begin sharing your location with dispatch'
            }
          </p>
        </div>

        {/* 👇 Map section injected from App.tsx */}
        {children && (
          <div className="bg-white rounded-2xl shadow-xl p-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSharingPage;
