'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Card,
  Grid,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close,
  Share,
  Edit,
  Info,
  Analytics,
  Warning,
  ShoppingCartCheckout,
  Add,
  Remove,
  Inventory,
  Star,
  AddCircle,
  NotificationImportant,
} from '@mui/icons-material';

interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  stock: number;
  minStock: number;
  category: {
    name: string;
  };
  images?: string[];
}

interface ProductDetailModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

export default function ProductDetailModal({ open, onClose, productId }: ProductDetailModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const mockProduct: Product = {
    id: '1',
    name: 'Aceite de Oliva Extra Virgen - 500ml',
    description: 'Aceite de primera prensada en frío, recolectado de olivares orgánicos. Aroma frutado intenso con notas de hierba recién cortada.',
    sku: 'AO-2394-EV',
    price: 24.50,
    stock: 2,
    minStock: 10,
    category: {
      name: 'Gourmet'
    },
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=400',
      'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400',
    ]
  };

  const lowStockProducts = [
    { id: 1, name: 'Harina de Trigo Integral 1kg', category: 'Panadería', price: 3.20, stock: 2, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200' },
    { id: 2, name: 'Cartón Huevos Orgánicos x30', category: 'Fresco', price: 8.50, stock: 1, image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200' },
    { id: 3, name: 'Queso Parmesano Reggiano', category: 'Lácteos', price: 18.90, stock: 5, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=200' },
  ];

  const movements = [
    { type: 'sale', id: 'VF-9021', quantity: -2, time: 'Hace 2h' },
    { type: 'stock', id: 'Lote 45', quantity: 12, time: '24 May' },
    { type: 'adjustment', id: 'Ajuste', quantity: -1, time: '22 May', reason: 'Daño' },
  ];

  useEffect(() => {
    if (open && productId) {
      // Aquí harías la llamada a la API para obtener el producto
      setProduct(mockProduct);
      setSelectedImage(0);
    }
  }, [open, productId]);

  const handleClose = () => {
    setProduct(null);
    setSelectedImage(0);
    onClose();
  };

  if (!product) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xl"
      fullWidth
      fullScreen={fullScreen}
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 3,
          bgcolor: '#f6f7f7',
        }
      }}
    >
      <DialogContent sx={{ p: 0, position: 'relative', bgcolor: '#f6f7f7' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          p: 3,
          bgcolor: 'white',
          borderBottom: '1px solid #dee3e1',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#131615' }}>
            Detalle de Producto
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: '#6c7f76', '&:hover': { bgcolor: '#f1f3f2' } }}>
              <Share />
            </IconButton>
            <IconButton sx={{ color: '#6c7f76', '&:hover': { bgcolor: '#f1f3f2' } }}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleClose} sx={{ color: '#6c7f76', '&:hover': { bgcolor: '#f1f3f2' } }}>
              <Close />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid item xs={12} lg={8}>
              <Stack spacing={4}>
                {/* Product Details Card */}
                <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}>
                  <Grid container spacing={4}>
                    {/* Images Section */}
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{
                          aspectRatio: '1',
                          bgcolor: '#f1f3f2',
                          borderRadius: 3,
                          overflow: 'hidden',
                          border: '1px solid #dee3e1',
                        }}>
                          <img 
                            src={product.images?.[selectedImage] || 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400'}
                            alt="Producto Principal"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      </Box>
                      <Grid container spacing={1}>
                        {product.images?.slice(0, 4).map((image, index) => (
                          <Grid item xs={3} key={index}>
                            <Box sx={{
                              aspectRatio: '1',
                              bgcolor: '#f1f3f2',
                              borderRadius: 2,
                              border: selectedImage === index ? '2px solid #2e6b50' : '1px solid #dee3e1',
                              cursor: 'pointer',
                              overflow: 'hidden',
                              opacity: selectedImage === index ? 0.5 : 1,
                            }}
                            onClick={() => setSelectedImage(index)}
                            >
                              <img 
                                src={image}
                                alt={`Vista ${index + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>

                    {/* Product Info */}
                    <Grid item xs={12} md={6}>
                      <Stack spacing={3}>
                        <Box>
                          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                            <Chip 
                              label={`Categoría: ${product.category.name}`}
                              size="small" 
                              sx={{ 
                                bgcolor: 'rgba(46, 107, 80, 0.1)', 
                                color: '#2e6b50',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                              }} 
                            />
                            <Chip 
                              label={`SKU: ${product.sku}`}
                              size="small" 
                              sx={{ 
                                bgcolor: 'rgba(255, 152, 0, 0.1)', 
                                color: '#ff9800',
                                fontSize: '0.65rem',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                              }} 
                            />
                          </Box>
                          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#6c7f76', lineHeight: 1.6 }}>
                            {product.description}
                          </Typography>
                        </Box>

                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ p: 2, bgcolor: '#f8faf9', borderRadius: 2 }}>
                              <Typography variant="caption" sx={{ 
                                fontSize: '0.7rem', 
                                color: '#6c7f76', 
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                display: 'block'
                              }}>
                                Precio Unitario
                              </Typography>
                              <Typography variant="h5" sx={{ fontWeight: 900, color: '#2e6b50' }}>
                                ${product.price.toFixed(2)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ p: 2, bgcolor: '#f8faf9', borderRadius: 2 }}>
                              <Typography variant="caption" sx={{ 
                                fontSize: '0.7rem', 
                                color: '#6c7f76', 
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                display: 'block'
                              }}>
                                Stock Actual
                              </Typography>
                              <Typography variant="h5" sx={{ 
                                fontWeight: 900, 
                                color: product.stock <= product.minStock ? '#ef4444' : '#2e6b50' 
                              }}>
                                {product.stock} Unds.
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>

                        <Box>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 700, 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1,
                            mb: 2
                          }}>
                            <Info sx={{ fontSize: 16 }} />
                            Especificaciones Técnicas
                          </Typography>
                          <Stack spacing={1}>
                            {[
                              { label: 'Origen', value: 'España (Jaén)' },
                              { label: 'Acidez Máxima', value: '0.2%' },
                              { label: 'Vencimiento Prox. Lote', value: '12/12/2025' }
                            ].map((spec, index) => (
                              <Box key={index} sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                py: 0.5,
                                borderBottom: '1px solid #f1f3f2'
                              }}>
                                <Typography variant="caption" sx={{ color: '#6c7f76', fontSize: '0.75rem' }}>
                                  {spec.label}
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                                  {spec.value}
                                </Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>

                {/* Chart and Movements */}
                <Grid container spacing={4}>
                  <Grid item xs={12} lg={8}>
                    <Card sx={{ p: 4, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}>
                      <Box sx={{ mb: 4 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          Histórico de Stock (30 días)
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c7f76' }}>
                          Variación de unidades en almacén
                        </Typography>
                      </Box>
                      <Box sx={{ height: 200, bgcolor: '#f8faf9', borderRadius: 2, p: 2 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          height: '100%',
                          color: '#6c7f76'
                        }}>
                          Gráfico de Stock - Integrar con Chart.js o similar
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                        Movimientos Recientes
                      </Typography>
                      <Stack spacing={2}>
                        {movements.map((movement, index) => (
                          <Box key={index} sx={{ 
                            display: 'flex', 
                            alignItems: 'flex-start', 
                            gap: 1.5,
                            pb: 2,
                            borderBottom: index < movements.length - 1 ? '1px solid #f1f3f2' : 'none'
                          }}>
                            <Avatar sx={{ 
                              width: 32, 
                              height: 32,
                              bgcolor: movement.type === 'sale' ? '#fef2f2' : 
                                       movement.type === 'stock' ? '#f0fdf4' : '#f9fafb',
                              color: movement.type === 'sale' ? '#ef4444' : 
                                     movement.type === 'stock' ? '#22c55e' : '#6b7280'
                            }}>
                              {movement.type === 'sale' ? <Remove sx={{ fontSize: 14 }} /> :
                               movement.type === 'stock' ? <Add sx={{ fontSize: 14 }} /> :
                               <Inventory sx={{ fontSize: 14 }} />}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                                {movement.type === 'sale' ? `Venta #${movement.id}` :
                                 movement.type === 'stock' ? `Entrada Stock (${movement.id})` :
                                 `Ajuste de Inventario`}
                              </Typography>
                              <Typography variant="caption" sx={{ 
                                color: '#6c7f76', 
                                fontSize: '0.7rem', 
                                display: 'block' 
                              }}>
                                {movement.quantity > 0 ? '+' : ''}{movement.quantity} unidad{Math.abs(movement.quantity) !== 1 ? 'es' : ''}
                                {movement.reason && ` (${movement.reason})`}
                              </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#6c7f76', fontSize: '0.7rem' }}>
                              {movement.time}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                      <Button 
                        fullWidth 
                        sx={{ 
                          mt: 2, 
                          color: '#2e6b50', 
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          '&:hover': { bgcolor: '#f8faf9' }
                        }}
                      >
                        Ver historial completo
                      </Button>
                    </Card>
                  </Grid>
                </Grid>
              </Stack>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} lg={4}>
              <Stack spacing={4}>
                {/* Metrics Card */}
                <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0,0,0,0.05)' }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Analytics sx={{ color: '#2e6b50' }} />
                    Métricas de Venta (30d)
                  </Typography>
                  <Stack spacing={3}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <Box>
                        <Typography variant="caption" sx={{ 
                          color: '#6c7f76', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          fontSize: '0.7rem'
                        }}>
                          Total Vendido
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 900 }}>
                          42 Unds.
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#22c55e', fontWeight: 700 }}>
                        +15% vs mes ant.
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="caption" sx={{ 
                        color: '#6c7f76', 
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        fontSize: '0.7rem'
                      }}>
                        Ingresos Generados
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        $1,029.00
                      </Typography>
                    </Box>

                    <Box sx={{ pt: 2, borderTop: '1px solid #f1f3f2' }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, mb: 1, display: 'block' }}>
                        Frecuencia de Reposición
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={85} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 1,
                          bgcolor: '#f1f3f2',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: '#ff9800'
                          }
                        }} 
                      />
                      <Typography variant="caption" sx={{ 
                        color: '#6c7f76', 
                        fontSize: '0.65rem',
                        fontStyle: 'italic',
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5
                      }}>
                        Crítica - Reponer cada 15 días
                      </Typography>
                    </Box>
                  </Stack>
                </Card>

                {/* Stock Alert */}
                <Card sx={{ 
                  p: 3, 
                  borderRadius: 3, 
                  bgcolor: '#2e6b50',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="caption" sx={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.7rem'
                    }}>
                      Estado de Alerta
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
                      Stock Muy Bajo
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mt: 1 }}>
                      Este producto está por debajo del stock mínimo (10 unds).
                    </Typography>
                    <Button 
                      fullWidth 
                      variant="contained"
                      sx={{ 
                        mt: 2, 
                        bgcolor: 'white', 
                        color: '#2e6b50',
                        fontWeight: 700,
                        '&:hover': { bgcolor: '#f8faf9' }
                      }}
                    >
                      Generar Orden de Compra
                    </Button>
                  </Box>
                  <Warning sx={{ 
                    position: 'absolute',
                    right: -16,
                    bottom: -16,
                    fontSize: 80,
                    opacity: 0.1
                  }} />
                </Card>
              </Stack>
            </Grid>
          </Grid>

          {/* Low Stock Alerts */}
          <Box sx={{ mt: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <NotificationImportant sx={{ color: '#ff9800' }} />
                Alertas de Stock Bajo
              </Typography>
              <Button sx={{ color: '#2e6b50', fontWeight: 700 }}>
                Gestionar Todo
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {lowStockProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderRadius: 3, 
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                    borderLeft: '4px solid #ef4444',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
                    },
                    transition: 'all 0.2s ease'
                  }}>
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <Box sx={{
                        height: 120,
                        bgcolor: '#f1f3f2',
                        borderRadius: 2,
                        overflow: 'hidden'
                      }}>
                        <img 
                          src={product.image}
                          alt={product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                      <Chip
                        label={`${product.stock} Unidad${product.stock !== 1 ? 'es' : ''}`}
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: '#ef4444',
                          color: 'white',
                          fontSize: '0.65rem',
                          fontWeight: 700
                        }}
                      />
                    </Box>
                    <Typography variant="caption" sx={{ 
                      color: '#6c7f76', 
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '0.65rem',
                      display: 'block',
                      mb: 0.5
                    }}>
                      {product.category}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 900, color: '#2e6b50' }}>
                        ${product.price.toFixed(2)}
                      </Typography>
                      <IconButton 
                        size="small"
                        sx={{ 
                          bgcolor: '#f8faf9',
                          '&:hover': { bgcolor: '#2e6b50', color: 'white' }
                        }}
                      >
                        <ShoppingCartCheckout sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}