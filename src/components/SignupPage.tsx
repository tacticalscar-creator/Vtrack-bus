import React, { useState } from 'react';
import { UserPlus, Phone, Lock, User, Mail, CreditCard, Users } from 'lucide-react';
import type { DriverProfile } from '../App';

interface SignupPageProps {
  onSignup: (profile: DriverProfile, password: string) => void;
  onGoToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onGoToLogin }) => {
  const [profile, setProfile] = useState<DriverProfile>({
    phone: '',
    name: '',
    email: '',
    licenseNumber: '',
    emergencyContact: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (profile.phone && profile.name && password) {
      onSignup(profile, password);
    }
  };

  const updateProfile = (field: keyof DriverProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-xl text-gray-600">Create your driver account</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter full name"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* License Number */}
            <div>
              <label htmlFor="license" className="block text-lg font-medium text-gray-700 mb-2">
                Driver's License Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="license"
                  type="text"
                  value={profile.licenseNumber}
                  onChange={(e) => updateProfile('licenseNumber', e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter license number"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergency" className="block text-lg font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="emergency"
                  type="tel"
                  value={profile.emergencyContact}
                  onChange={(e) => updateProfile('emergencyContact', e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Emergency contact number"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={!profile.phone || !profile.name || !password || !confirmPassword}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">Already have an account?</p>
              <button
                type="button"
                onClick={onGoToLogin}
                className="text-green-600 hover:text-green-700 font-semibold text-xl underline transition-colors"
              >
                Login Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;