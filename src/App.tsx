import { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import RouteSelectionPage from './components/RouteSelectionPage';
import LocationSharingPage from './components/LocationSharingPage';
import ProfilePage from './components/ProfilePage';
import MapplsMap from './components/MapplsMap';

export type AppPage = 'login' | 'signup' | 'route-selection' | 'location-sharing' | 'profile';

export interface DriverProfile {
  phone: string;
  name: string;
  email: string;
  licenseNumber: string;
  emergencyContact: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('login');
  const [selectedRoute, setSelectedRoute] = useState<string>('');
  const [driverProfile, setDriverProfile] = useState<DriverProfile>({
    phone: '',
    name: '',
    email: '',
    licenseNumber: '',
    emergencyContact: ''
  });

  const handleLogin = (phone: string, password: string) => {
    console.log('Login attempt:', { phone, password });
    setDriverProfile(prev => ({ ...prev, phone }));
    setCurrentPage('route-selection');
  };

  const handleSignup = (profile: DriverProfile, password: string) => {
    console.log('Signup attempt:', { profile, password });
    setDriverProfile(profile);
    setCurrentPage('route-selection');
  };

  const handleGoToSignup = () => {
    setCurrentPage('signup');
  };

  const handleGoToLogin = () => {
    setCurrentPage('login');
  };

  const handleRouteConfirm = (route: string) => {
    setSelectedRoute(route);
    setCurrentPage('location-sharing');
  };

  const handleGoToProfile = () => {
    setCurrentPage('profile');
  };

  const handleBackToLocationSharing = () => {
    setCurrentPage('location-sharing');
  };

  const handleProfileUpdate = (updatedProfile: DriverProfile) => {
    setDriverProfile(updatedProfile);
    setCurrentPage('location-sharing');
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setSelectedRoute('');
    setDriverProfile({
      phone: '',
      name: '',
      email: '',
      licenseNumber: '',
      emergencyContact: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} onGoToSignup={handleGoToSignup} />
      )}
      
      {currentPage === 'signup' && (
        <SignupPage onSignup={handleSignup} onGoToLogin={handleGoToLogin} />
      )}
      
      {currentPage === 'route-selection' && (
        <RouteSelectionPage 
          driverProfile={driverProfile}
          onRouteConfirm={handleRouteConfirm} 
        />
      )}
      
      {currentPage === 'location-sharing' && (
        <LocationSharingPage 
          selectedRoute={selectedRoute}
          driverProfile={driverProfile}
          onGoToProfile={handleGoToProfile}
          onLogout={handleLogout}
        >
          <MapplsMap />
        </LocationSharingPage>
      )}
      
      {currentPage === 'profile' && (
        <ProfilePage 
          driverProfile={driverProfile}
          onProfileUpdate={handleProfileUpdate}
          onBack={handleBackToLocationSharing}
        />
      )}
    </div>
  );
}

export default App;
