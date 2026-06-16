import React from 'react';
import Dashboard from './pages/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Dashboard />
      <Toaster 
        position="top-right"
        toastOptions={{
          className: '!bg-zinc-900 !border !border-zinc-800 !text-zinc-200 !text-xs !rounded-lg shadow-xl',
          duration: 3000,
        }}
      />
    </>
  );
}

export default App;