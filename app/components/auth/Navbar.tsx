'use client';

import { useState, useEffect } from 'react';
import UserDetailModal from '../ui/UserDetailModal';

import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Search,
  Notifications,
  ChatBubble,
  Person,
  Settings,
  Menu as MenuIcon,
} from '@mui/icons-material';

interface NavbarProps {
  user?: {
    name: string;
    role: string;
    email?: string;
    avatar?: string;
  };
  onLogout?: () => void;
  onMenuClick?: () => void;
}

export default function Navbar({ user: initialUser, onLogout, onMenuClick }: NavbarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState(initialUser || { name: 'Usuario', role: 'Usuario' });
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        
        if (token) {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            const userInfo = {
              name: userData.full_name || userData.username || 'Usuario',
              role: userData.role === 'admin' ? 'Administrador' : userData.role || 'Usuario',
              email: userData.email,
              avatar: userData.avatar || userData.profilePicture
            };
            setUser(userInfo);
            
            // Set complete user data for profile modal
            setCurrentUserData({
              id: userData.id,
              username: userData.username,
              email: userData.email,
              full_name: userData.full_name,
              role: userData.role,
              phone: userData.phone,
              created_at: userData.created_at,
              updated_at: userData.updated_at,
              is_active: userData.is_active,
              branch: userData.branch,
              avatar: userData.avatar
            });
          }
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    // Mostrar perfil del usuario actual
    handleClose();
    setProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setProfileModalOpen(false);
  };

  const handleSettings = () => {
    // Navegar a ajustes
    handleClose();
    console.log('Ir a ajustes');
  };
  return (
    <Box
      sx={{
        height: { xs: 56, md: 64 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'grey.200',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        gap: { xs: 1, md: 2 },
      }}
    >
      {/* Left side - Menu button + Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 2 }, flex: 1 }}>
        {/* Mobile menu button */}
        <IconButton
          sx={{ 
            display: { xs: 'block', md: 'none' },
            color: 'text.primary',
            p: 1
          }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        {/* Search */}
        <Box sx={{ 
          flex: 1, 
          maxWidth: { xs: 'none', md: 600 },
          display: { xs: 'none', sm: 'block' }
        }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Buscar ventas, productos o clientes..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: 'text.secondary', fontSize: '1.125rem' }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            },
          }}
        />
      </Box>
      </Box>

      {/* Right side - Notifications + User */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 0.5, md: 2 },
        flexShrink: 0
      }}>
        {/* Notifications */}
        <IconButton sx={{ 
          color: 'text.secondary',
          display: { xs: 'none', sm: 'block' }
        }}>
          <Badge badgeContent={1} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        
        <IconButton sx={{ 
          color: 'text.secondary',
          display: { xs: 'none', sm: 'block' }
        }}>
          <ChatBubble />
        </IconButton>
        
        <Divider 
          orientation="vertical" 
          flexItem 
          sx={{ 
            mx: { xs: 0.5, md: 1 },
            display: { xs: 'none', sm: 'block' }
          }} 
        />
        {/* User Profile */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, md: 1.5 }, 
            cursor: 'pointer',
            py: 1,
            px: { xs: 0.5, md: 0 }
          }}
          onClick={handleClick}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Box sx={{ 
            textAlign: 'right', 
            display: { xs: 'none', sm: 'block' },
            minWidth: 0
          }}>
            <Typography variant="body2" sx={{ 
              fontWeight: 700, 
              fontSize: { sm: '0.8rem', md: '0.875rem' }, 
              lineHeight: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: { sm: 100, md: 150 }
            }}>
              {user?.name || 'Usuario'}
            </Typography>
            <Typography variant="caption" sx={{ 
              color: 'text.secondary', 
              fontSize: { sm: '0.625rem', md: '0.6875rem' }, 
              mt: 0.25,
              display: 'block'
            }}>
              {user?.role || 'Usuario'}
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: { xs: 32, md: 36 },
              height: { xs: 32, md: 36 },
              border: 2,
              borderColor: 'primary.light',
              bgcolor: user?.avatar ? 'transparent' : 'primary.main',
              color: 'white',
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
            src={user?.avatar || undefined}
          >
            {!user?.avatar && (user?.name?.charAt(0)?.toUpperCase() || 'U')}
          </Avatar>
        </Box>
        
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              minWidth: 180,
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
        >
          <MenuItem onClick={handleProfile}>
            <ListItemIcon>
              <Person fontSize="small" />
            </ListItemIcon>
            <ListItemText>Mi perfil</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            <ListItemText>Ajustes</ListItemText>
          </MenuItem>
        </Menu>
        
        {/* Profile Modal */}
        <UserDetailModal
          open={profileModalOpen}
          onClose={handleCloseProfileModal}
          user={currentUserData}
          onEditUser={() => {}} // No edit functionality for own profile
          onCreateUser={() => {}} // No create functionality from profile
        />
      </Box>
    </Box>
  );
}