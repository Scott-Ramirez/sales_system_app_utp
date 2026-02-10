'use client';

import { ReactNode, useState } from 'react';
import { Box, NoSsr } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from '../auth/Navbar';

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    role: string;
  };
  onLogout?: () => void;
}

export default function DashboardLayout({ children, user, onLogout }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <NoSsr>
      <Box sx={{ 
        display: 'flex', 
        height: '100vh', 
        overflow: 'hidden', 
        bgcolor: 'background.default'
      }}>
        {/* Sidebar */}
        <Sidebar 
          onLogout={onLogout} 
          mobileOpen={mobileOpen}
          onMobileClose={handleDrawerClose}
        />
        
        {/* Main Content */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden',
          minWidth: 0
        }}>
          {/* Top Navbar */}
          <Navbar 
            user={user || { name: 'Usuario', role: 'user' }} 
            onLogout={onLogout} 
            onMenuClick={handleDrawerToggle}
          />
          
          {/* Page Content */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            overflowX: 'hidden'
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    </NoSsr>
  );
}