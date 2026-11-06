import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { OrderGrabRoomScreen } from './components/screens/OrderGrabRoomScreen';
import { CommissionScreen } from './components/screens/CommissionScreen';
import { RecordsScreen } from './components/screens/RecordsScreen';
import { DepositScreen } from './components/screens/DepositScreen';
import { WithdrawScreen } from './components/screens/WithdrawScreen';
import { InviteScreen } from './components/screens/InviteScreen';
import { SupportScreen } from './components/screens/SupportScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { AllScreensGallery } from './components/screens/AllScreensGallery';

const MainLayout: React.FC = () => {
  const { currentScreen, viewMode } = useApp();

  const renderActiveScreen = () => {
    if (viewMode === 'gallery') {
      return <AllScreensGallery />;
    }

    switch (currentScreen) {
      case 'login':
        return <LoginScreen />;
      case 'home':
        return <HomeScreen />;
      case 'room-alibaba':
        return <OrderGrabRoomScreen forcedPlatformId="alibaba" />;
      case 'room-amazon':
        return <OrderGrabRoomScreen forcedPlatformId="amazon" />;
      case 'room-aliexpress':
        return <OrderGrabRoomScreen forcedPlatformId="aliexpress" />;
      case 'commission':
        return <CommissionScreen />;
      case 'records':
        return <RecordsScreen />;
      case 'deposit':
        return <DepositScreen />;
      case 'withdraw':
        return <WithdrawScreen />;
      case 'invite':
        return <InviteScreen />;
      case 'support':
        return <SupportScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'leaderboard':
        return <LeaderboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Top Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {renderActiveScreen()}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
