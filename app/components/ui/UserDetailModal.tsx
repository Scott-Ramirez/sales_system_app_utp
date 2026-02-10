'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Divider,
} from '@mui/material';
import {
  Close,
  Edit,
  PersonAdd,
  ArrowBack,
  MoreVert,
  Delete,
} from '@mui/icons-material';

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  branch?: string;
  avatar?: string;
}

interface CreatedUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_activity?: string;
  is_active: boolean;
}

interface UserDetailModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onEditUser: (user: User) => void;
  onCreateUser: () => void;
}

export default function UserDetailModal({
  open,
  onClose,
  user,
  onEditUser,
  onCreateUser,
}: UserDetailModalProps) {
  const [createdUsers, setCreatedUsers] = useState<CreatedUser[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userStats, setUserStats] = useState({
    usersCreated: 0,
    salesManaged: 0,
  });

  useEffect(() => {
    if (user && open) {
      fetchCreatedUsers();
      fetchUserStats();
    }
  }, [user, open, page]);

  const fetchCreatedUsers = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/created-by/${user.id}?page=${page}&limit=${rowsPerPage}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCreatedUsers(data.users || []);
        setTotalUsers(data.total || 0);
      }
    } catch (error) {
      console.error('Error fetching created users:', error);
    }
  };

  const fetchUserStats = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/stats`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserStats({
          usersCreated: data.usersCreated || 0,
          salesManaged: data.salesManaged || 0,
        });
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return { bg: '#f3e8ff', color: '#7c3aed' };
      case 'worker':
        return { bg: '#dbeafe', color: '#2563eb' };
      default:
        return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'Administrador';
      case 'worker':
        return 'Trabajador';
      default:
        return role;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatLastActivity = (dateString?: string) => {
    if (!dateString) return 'Nunca';
    
    const now = new Date();
    const activity = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - activity.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Hace unos minutos';
    if (diffInHours < 24) return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ayer';
    if (diffInDays < 7) return `Hace ${diffInDays} días`;
    
    return activity.toLocaleDateString('es-ES');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (!user) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          minHeight: '80vh',
          maxHeight: '90vh',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton onClick={onClose} size="small">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Detalle de Usuario
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4, overflow: 'auto' }}>
        {/* User Profile Card */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 4,
                alignItems: { xs: 'center', lg: 'flex-start' },
              }}
            >
              {/* Profile Info */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  borderBottom: { xs: '1px solid', lg: 'none' },
                  borderRight: { xs: 'none', lg: '1px solid' },
                  borderColor: 'divider',
                  pb: { xs: 3, lg: 0 },
                  pr: { xs: 0, lg: 4 },
                  minWidth: { lg: 280 },
                }}
              >
                <Box sx={{ position: 'relative', mb: 2 }}>
                  <Avatar
                    src={user.avatar}
                    sx={{
                      width: 96,
                      height: 96,
                      fontSize: '2rem',
                      fontWeight: 700,
                      bgcolor: 'primary.main',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }}
                  >
                    {getInitials(user.full_name)}
                  </Avatar>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -8,
                      right: -8,
                      width: 24,
                      height: 24,
                      bgcolor: user.is_active ? 'success.main' : 'grey.400',
                      border: '2px solid white',
                      borderRadius: '50%',
                    }}
                  />
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {user.full_name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    mb: 2,
                  }}
                >
                  {getRoleDisplayName(user.role)}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    onClick={() => onEditUser(user)}
                    sx={{
                      bgcolor: 'primary.main',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      px: 2,
                      py: 1,
                    }}
                  >
                    Editar Perfil
                  </Button>
                </Box>
              </Box>

              {/* User Details */}
              <Box
                sx={{
                  flex: 1,
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' },
                  gap: 3,
                  alignContent: 'start',
                }}
              >
                {/* Información de Contacto */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Nombre de Usuario
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Correo Electrónico
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.email}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Teléfono
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.phone || 'No especificado'}
                  </Typography>
                </Box>

                {/* Información de Sistema */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    Estado de Cuenta
                  </Typography>
                  <Chip
                    label={user.is_active ? 'Activo' : 'Inactivo'}
                    size="small"
                    sx={{
                      bgcolor: user.is_active ? 'success.100' : 'grey.100',
                      color: user.is_active ? 'success.700' : 'grey.600',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Sucursal
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {user.branch || 'Centro Logístico Principal'}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Fecha de Registro
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatDate(user.created_at)}
                  </Typography>
                </Box>

                {/* Información de Actividad */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Última Actividad
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatLastActivity(user.updated_at)}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.6875rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'text.secondary',
                      display: 'block',
                    }}
                  >
                    Última Actualización
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {formatDate(user.updated_at)}
                  </Typography>
                </Box>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  pl: { lg: 4 },
                  minWidth: 180,
                }}
              >
                <Card
                  sx={{
                    bgcolor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        color: 'primary.main',
                        display: 'block',
                      }}
                    >
                      Usuarios Creados
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 900, color: 'primary.main' }}
                    >
                      {userStats.usersCreated}
                    </Typography>
                  </CardContent>
                </Card>

                <Card
                  sx={{
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 3,
                  }}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        color: 'text.secondary',
                        display: 'block',
                      }}
                    >
                      Ventas Gestionadas
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>
                      {userStats.salesManaged}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Created Users Section */}
        <Box sx={{ mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 3,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Usuarios creados por mí
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Lista detallada de cuentas registradas bajo su administración.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={onCreateUser}
              sx={{
                bgcolor: 'primary.main',
                fontWeight: 700,
                boxShadow: '0 8px 16px rgba(46, 107, 80, 0.2)',
                minWidth: 'fit-content',
              }}
            >
              Nuevo Usuario
            </Button>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    Usuario
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    Rol
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    Fecha Alta
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    Última Actividad
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}>
                    Estado
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 700, fontSize: '0.6875rem', textTransform: 'uppercase' }}
                  >
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {createdUsers.map((createdUser) => (
                  <TableRow
                    key={createdUser.id}
                    hover
                    sx={{ '&:hover': { bgcolor: 'grey.50' } }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            bgcolor: 'grey.200',
                            color: 'primary.main',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                          }}
                        >
                          {getInitials(createdUser.full_name)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {createdUser.full_name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', fontSize: '0.6875rem' }}
                          >
                            {createdUser.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={createdUser.role}
                        size="small"
                        sx={{
                          bgcolor: getRoleColor(createdUser.role).bg,
                          color: getRoleColor(createdUser.role).color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {formatDate(createdUser.created_at)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {formatLastActivity(createdUser.last_activity)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: createdUser.is_active ? 'success.main' : 'grey.400',
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.6875rem',
                            color: createdUser.is_active ? 'success.600' : 'grey.600',
                          }}
                        >
                          {createdUser.is_active ? 'Activo' : 'Inactivo'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                        <IconButton size="small" sx={{ color: 'text.secondary' }}>
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'error.main' }}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination Footer */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'grey.50',
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                Mostrando {createdUsers.length} de {totalUsers} usuarios
              </Typography>
              <Pagination
                count={Math.ceil(totalUsers / rowsPerPage)}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 700,
                    fontSize: '0.75rem',
                  },
                }}
              />
            </Box>
          </TableContainer>
        </Box>
      </Box>
    </Dialog>
  );
}