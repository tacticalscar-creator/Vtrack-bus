import React, { useState } from 'react';
import { Phone, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (phone: string, password: string) => void;
  onGoToSignup: () => void;
}
<button className="bg-red-500 text-white px-4 py-2 rounded-lg">
  Test Button
</button>

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onGoToSignup }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && password) {
      onLogin(phone, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Bus Driver</h1>
            <p className="text-xl text-gray-600">Please log in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={!phone || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl text-xl transition-colors duration-200 shadow-lg"
            >
              Login
            </button>

            {/* Signup Link */}
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-4">Don't have an account?</p>
              <button
                type="button"
                onClick={onGoToSignup}
                className="text-blue-600 hover:text-blue-700 font-semibold text-xl underline transition-colors"
              >
                Sign Up Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;