import React, { useState } from 'react';
import { User, Phone, Mail, CreditCard, Users, ArrowLeft, Save } from 'lucide-react';
import type { DriverProfile } from '../App';

interface ProfilePageProps {
  driverProfile: DriverProfile;
  onProfileUpdate: (updatedProfile: DriverProfile) => void;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  driverProfile, 
  onProfileUpdate, 
  onBack 
}) => {
  const [profile, setProfile] = useState<DriverProfile>(driverProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onProfileUpdate(profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(driverProfile);
    setIsEditing(false);
  };

  const updateProfile = (field: keyof DriverProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Driver Profile</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {profile.name || 'Driver Profile'}
            </h2>
          </div>

          {/* Profile Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full pl-14 pr-4 py-4 text-xl border-2 rounded-xl transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500 focus:outline-none bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                  placeholder="Enter full name"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full pl-14 pr-4 py-4 text-xl border-2 rounded-xl transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500 focus:outline-none bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full pl-14 pr-4 py-4 text-xl border-2 rounded-xl transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500 focus:outline-none bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* License Number */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Driver's License Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  value={profile.licenseNumber}
                  onChange={(e) => updateProfile('licenseNumber', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full pl-14 pr-4 py-4 text-xl border-2 rounded-xl transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500 focus:outline-none bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                  placeholder="Enter license number"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="tel"
                  value={profile.emergencyContact}
                  onChange={(e) => updateProfile('emergencyContact', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full pl-14 pr-4 py-4 text-xl border-2 rounded-xl transition-colors ${
                    isEditing 
                      ? 'border-gray-300 focus:border-blue-500 focus:outline-none bg-white' 
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                  }`}
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg"
              >
                Edit Profile
              </button>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleSave}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Save className="w-6 h-6" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;