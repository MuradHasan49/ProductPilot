import React from 'react';
import { User, Bell, Shield, CreditCard, Palette, Globe, Key, Save } from 'lucide-react';

export default function SettingsPage() {
  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'account', name: 'Account', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'api', name: 'API Keys', icon: Key },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-4 lg:pb-0">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = idx === 0; // Profile active by default for UI mockup
              return (
                <button
                  key={tab.id}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow space-y-6">
          
          {/* Profile Section */}
          <div className="bg-[#1e2330]/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-semibold text-white">Public Profile</h2>
              <p className="text-sm text-gray-400 mt-1">This information will be displayed publicly so be careful what you share.</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                  JD
                </div>
                <div>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/5">
                    Change avatar
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="John"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="john.doe@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-gray-400 cursor-not-allowed focus:outline-none"
                    disabled
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-300">Bio</label>
                  <textarea 
                    rows={4}
                    defaultValue="Senior Product Manager building the future of AI tools."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-black/20 border-t border-white/5 flex justify-end">
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-blue-500/25 transition-all">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-[#1e2330]/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h2 className="text-xl font-semibold text-white">Preferences</h2>
              <p className="text-sm text-gray-400 mt-1">Manage your regional and accessibility settings.</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Language</h4>
                  <p className="text-sm text-gray-400">Select your preferred language.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white hover:bg-white/5 transition-colors">
                  <Globe className="w-4 h-4 text-gray-400" />
                  English (US)
                </button>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Marketing Emails</h4>
                  <p className="text-sm text-gray-400">Receive emails about new products and features.</p>
                </div>
                {/* Custom Toggle Switch */}
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500 transition-colors">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 rounded-2xl border border-red-500/20 overflow-hidden mt-8">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
              <p className="text-sm text-red-400/80 mt-1 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
              <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-sm font-medium rounded-lg border border-red-500/20 transition-colors">
                Delete Account
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
