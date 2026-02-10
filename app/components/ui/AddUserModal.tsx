'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  PersonAdd,
  LockReset,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: any) => void;
  editUser?: any;
}

export default function AddUserModal({ open, onClose, onSave, editUser }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    role: 'cajero',
    phone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordLabel, setPasswordLabel] = useState('');

  // Actualizar formulario cuando se edita un usuario
  useEffect(() => {
    if (editUser) {
      setFormData({
        username: editUser.username || '',
        email: editUser.email || '',
        full_name: editUser.full_name || '',
        role: editUser.role || 'cajero',
        phone: editUser.phone || '',
        password: '',
      });
    } else {
      setFormData({
        username: '',
        email: '',
        full_name: '',
        role: 'cajero',
        phone: '',
        password: '',
      });
    }
    setPasswordStrength(0);
    setPasswordLabel('');
    setShowPassword(false);
  }, [editUser]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Calcular fortaleza de contraseña
    if (field === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    let label = '';

    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;

    if (strength <= 25) label = 'Débil';
    else if (strength <= 50) label = 'Moderada';
    else if (strength <= 75) label = 'Fuerte';
    else label = 'Muy Fuerte';

    setPasswordStrength(strength);
    setPasswordLabel(label);
  };

  const getPasswordColor = () => {
    if (passwordStrength <= 25) return '#ef4444';
    if (passwordStrength <= 50) return '#f59e0b';
    if (passwordStrength <= 75) return '#10b981';
    return '#059669';
  };

  const getSegmentColors = () => {
    const segments = [false, false, false, false];
    if (passwordStrength > 25) segments[0] = true;
    if (passwordStrength > 50) segments[1] = true;
    if (passwordStrength > 75) segments[2] = true;
    if (passwordStrength === 100) segments[3] = true;
    return segments;
  };

  const handleSubmit = async () => {
    // Validación básica
    if (!formData.username || !formData.email || !formData.full_name) {
      await Swal.fire({
        title: 'Campos requeridos',
        text: 'Por favor completa todos los campos obligatorios marcados con *',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'swal2-confirm swal2-warning-btn'
        }
      });
      return;
    }

    // Para usuarios nuevos, la contraseña es obligatoria
    if (!editUser && !formData.password) {
      await Swal.fire({
        title: 'Contraseña requerida',
        text: 'La contraseña es obligatoria para usuarios nuevos',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'swal2-confirm swal2-warning-btn'
        }
      });
      return;
    }

    // Crear objeto de datos limpio
    const dataToSend = { ...formData };
    if (editUser && !dataToSend.password) {
      const { password, ...dataWithoutPassword } = dataToSend;
      onSave(dataWithoutPassword);
    } else {
      onSave(dataToSend);
    }
    
    handleClose();
  };

  const handleClose = () => {
    onClose();
    setFormData({
      username: '',
      email: '',
      full_name: '',
      role: 'cajero',
      phone: '',
      password: '',
    });
    setPasswordStrength(0);
    setPasswordLabel('');
    setShowPassword(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <PersonAdd />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {editUser ? 'Editar Usuario' : 'Nuevo Usuario'}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' },
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          {/* Username */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              Nombre de usuario *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Ej: j.doe"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {/* Email */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              Email Corporativo *
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="email"
              placeholder="email@ejemplo.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {/* Full Name */}
          <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              Nombre Completo *
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Nombre y Apellido"
              value={formData.full_name}
              onChange={(e) => handleInputChange('full_name', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {/* Role */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              Rol de Usuario
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                sx={{
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                }}
              >
                <MenuItem value="admin">ADMIN (Administrador)</MenuItem>
                <MenuItem value="worker">WORKER (Trabajador)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Phone */}
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              Teléfono de Contacto
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="+XX XXX XXX XXX"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Password Section */}
        <Box
          sx={{
            gridColumn: '1 / -1',
            mt: 4,
            pt: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Password Section Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <LockReset sx={{ color: 'primary.main', fontSize: '1.25rem' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {editUser ? 'Cambio de Contraseña' : 'Contraseña de Acceso'}
            </Typography>
          </Box>

          {/* Password Field */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'text.secondary',
                display: 'block',
                mb: 1,
              }}
            >
              {editUser ? 'Nueva Contraseña' : 'Contraseña *'}
            </Typography>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 8 caracteres"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              helperText={editUser ? "Deja en blanco para mantener la contraseña actual" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'grey.100',
                  borderRadius: 2,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': {
                    border: '2px solid',
                    borderColor: 'primary.main',
                  },
                },
              }}
            />
          </Box>

          {/* Password Strength Indicator */}
          {formData.password && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'text.secondary',
                  }}
                >
                  Seguridad de la clave
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.625rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: getPasswordColor(),
                  }}
                >
                  {passwordLabel}
                </Typography>
              </Box>

              {/* 4-Segment Progress Bar */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.75, mb: 1 }}>
                {getSegmentColors().map((isActive, index) => (
                  <Box
                    key={index}
                    sx={{
                      height: 6,
                      borderRadius: 1,
                      bgcolor: isActive ? getPasswordColor() : 'grey.200',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                ))}
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.6875rem',
                  display: 'block',
                }}
              >
                Usa una combinación de letras, números y símbolos para mayor protección.
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      {/* Actions */}
      <DialogActions
        sx={{
          px: 4,
          py: 3,
          bgcolor: 'grey.50',
          borderTop: '1px solid',
          borderColor: 'divider',
          justifyContent: 'flex-end',
          gap: 1.5,
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: 'text.secondary',
            fontWeight: 700,
            px: 3,
            '&:hover': { bgcolor: 'grey.200' },
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: 'primary.main',
            fontWeight: 700,
            px: 4,
            boxShadow: '0 8px 16px rgba(46, 107, 80, 0.2)',
            '&:hover': { opacity: 0.9 },
          }}
        >
          {editUser ? 'Guardar Cambios' : 'Crear Usuario'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
