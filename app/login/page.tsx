'use client';

import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Inventory2,
  LockOpen,
  Person,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2e6b50',
      light: 'rgba(46, 107, 80, 0.1)',
      dark: '#1e4a36',
    },
    background: {
      default: '#f7f7f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#131615',
      secondary: '#6c7f76',
    },
    grey: {
      100: '#f1f3f2',
      200: '#e5e7eb',
      300: '#dee3e1',
      400: '#6c7f76',
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#131615',
            fontWeight: 600,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '0.5rem',
          height: '48px',
          transition: 'all 0.2s ease',
          '&:hover': {
            opacity: 0.95,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
      },
    },
  },
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Plantilla: no hace nada
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.default',
          fontFamily: '"Manrope", sans-serif',
        }}
      >
        {/* Header Navigation */}
        <Box
          component="header"
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'grey.200',
            px: { xs: 2, md: 5 },
            py: 2,
          }}
        >
          <Container
            maxWidth="xl"
            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'primary.light',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Inventory2 sx={{ color: 'primary.main', fontSize: 20 }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  letterSpacing: '-0.025em',
                }}
              >
                Sistema de Inventario
              </Typography>
            </Box>

            <Button variant="contained" color="primary" sx={{ minWidth: 100, fontSize: '0.875rem' }}>
              Ayuda
            </Button>
          </Container>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
            background: 'linear-gradient(135deg, #f7f7f8 0%, #e8eceb 100%)',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 450,
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 4,
              boxShadow:
                '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
              border: 1,
              borderColor: 'grey.100',
            }}
          >
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'primary.light',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <LockOpen sx={{ color: 'primary.main', fontSize: 32 }} />
              </Box>

              <Typography
                variant="h4"
                sx={{
                  color: 'text.primary',
                  fontWeight: 700,
                  mb: 1,
                  letterSpacing: '-0.025em',
                }}
              >
                Bienvenido de nuevo
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                Ingresa tus credenciales para acceder al panel
              </Typography>
            </Box>

            {/* Login Form (plantilla) */}
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    mb: 1,
                    fontSize: '0.875rem',
                  }}
                >
                  Usuario
                </Typography>
                <TextField
                  fullWidth
                  name="username"
                  placeholder="Ingresa tu nombre de usuario"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Person sx={{ color: 'text.secondary', fontSize: 22 }} />
                      </InputAdornment>
                    ),
                    sx: {
                      height: 48,
                      '& .MuiInputBase-input': {
                        color: 'text.primary',
                        fontSize: '1rem',
                        '&::placeholder': {
                          color: 'text.secondary',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                    }}
                  >
                    Contraseña
                  </Typography>

                  <Link
                    href="#"
                    sx={{
                      color: 'primary.main',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Box>

                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.main' },
                          }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      height: 48,
                      '& .MuiInputBase-input': {
                        color: 'text.primary',
                        fontSize: '1rem',
                        '&::placeholder': {
                          color: 'text.secondary',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 0.5,
                  mb: 2.5,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name="rememberMe"
                      color="primary"
                      sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 20,
                          borderRadius: 1,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.primary',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      Recordarme en este equipo
                    </Typography>
                  }
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  mb: 4,
                  fontSize: '1rem',
                  boxShadow: '0 4px 6px -1px rgba(46, 107, 80, 0.2)',
                }}
              >
                Iniciar Sesión
              </Button>
            </form>

            {/* Footer */}
            <Box
              sx={{
                mt: 5,
                pt: 3,
                borderTop: 1,
                borderColor: 'grey.100',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                © 2024 Sistema de Inventario Pro. Todos los derechos reservados.
              </Typography>

              <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Link
                  href="#"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Términos
                </Link>

                <Link
                  href="#"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Privacidad
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Support Footer */}
        <Box component="footer" sx={{ py: 3, px: 5, textAlign: 'center', bgcolor: 'background.paper' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
            ¿Tienes problemas para acceder?{' '}
            <Link
              href="#"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Contactar a soporte técnico
            </Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
