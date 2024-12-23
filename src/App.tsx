import React, { useState, useEffect } from 'react';
import { Home, Settings, User } from 'lucide-react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Simple PWA</h1>
          {deferredPrompt && !isInstalled && (
            <button
              onClick={handleInstall}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50"
            >
              Install App
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to Simple PWA</h2>
          <p className="text-gray-600">
            This is a simple Progressive Web App that you can install on your device.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Home className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Home</h3>
            <p className="text-gray-600">Access your dashboard quickly and easily.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Settings className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Settings</h3>
            <p className="text-gray-600">Customize your app preferences.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <User className="w-8 h-8 text-indigo-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">Manage your personal information.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Simple PWA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;