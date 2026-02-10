'use client';

import { Box, Typography, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter, usePathname } from 'next/navigation';
import {
  Dashboard as DashboardIcon,
  Group,
  Inventory2,
  PointOfSale,
  AccountBalanceWallet,
  LocalShipping,
  ShoppingCart,
  BarChart,
  Logout,
} from '@mui/icons-material';

interface SidebarProps {
  onLogout?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navItems = [
  { icon: <DashboardIcon />, label: 'Dashboard', route: '/dashboard' },
  { icon: <Group />, label: 'Usuarios', route: '/users' },
  { icon: <Inventory2 />, label: 'Productos', route: '/products' },
  { icon: <PointOfSale />, label: 'Ventas', route: '/sales' },
  { icon: <Inventory2 />, label: 'Inventario', route: '/inventory' },
  { icon: <AccountBalanceWallet />, label: 'Caja', route: '/cash-register' },
  { icon: <LocalShipping />, label: 'Proveedores', route: '/suppliers' },
  { icon: <ShoppingCart />, label: 'Compras', route: '/purchases' },
  { icon: <BarChart />, label: 'Reportes', route: '/reports' },
];

export default function Sidebar({ onLogout, mobileOpen = false, onMobileClose }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();
  
  const handleNavigation = (route: string) => {
    router.push(route);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };
  
  const handleLogout = async () => {
    try {
      // Llamar al endpoint de logout
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar storage y llamar función de logout
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      if (onMobileClose) onMobileClose(); // Cerrar drawer en móvil
      if (onLogout) onLogout();
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        width: 256,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        borderRight: { xs: 0, md: 1 },
        borderColor: 'grey.200',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Inventory2 />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1 }}>
            Gestión Pro
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.6875rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mt: 0.25,
            }}
          >
            Admin Panel
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, px: 2, py: 1, overflowY: 'auto' }}>
        {navItems.map((item, index) => {
          const isActive = pathname === item.route;
          return (
            <Box
              key={index}
              onClick={() => handleNavigation(item.route)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1.25,
                mb: 0.5,
                borderRadius: 1.5,
                cursor: 'pointer',
                transition: 'all 0.2s',
                bgcolor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'white' : 'text.secondary',
                '&:hover': {
                  bgcolor: isActive ? 'primary.main' : 'grey.100',
                },
              }}
            >
              <Box sx={{ fontSize: '1.25rem' }}>{item.icon}</Box>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      {/* Logout */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'grey.200' }}>
        <Box
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 1.25,
            borderRadius: 1.5,
            cursor: 'pointer',
            color: 'error.main',
            '&:hover': { bgcolor: 'error.50' },
          }}
        >
          <Logout sx={{ fontSize: '1.25rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            Cerrar Sesión
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: 256 },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 256,
            borderRadius: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}