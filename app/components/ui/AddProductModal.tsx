'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import {
  Dialog,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  InputAdornment,
  Card,
  IconButton,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import {
  Close,
  Save,
  ArrowBack,
  QrCode,
  CloudUpload,
  AddPhotoAlternate,
  Description,
  Inventory,
  Image as ImageIcon,
} from '@mui/icons-material';

interface Category {
  id: number;
  name: string;
}

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
  onProductCreated: () => void;
}

export default function AddProductModal({
  open,
  onClose,
  onProductCreated,
}: AddProductModalProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    barcode: '',
    category_id: '',
    brand: '',
    model: '',
    cost_price: '',
    sale_price: '',
    stock: '',
    min_stock: '',
    max_stock: '',
    unit: 'unit',
    weight: '',
    color: '',
    size: '',
    location: '',
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    if (open) {
      fetchCategories();
      // Reset form when modal opens
      setFormData({
        name: '',
        description: '',
        barcode: '',
        category_id: '',
        brand: '',
        model: '',
        cost_price: '',
        sale_price: '',
        stock: '',
        min_stock: '',
        max_stock: '',
        unit: 'unit',
        weight: '',
        color: '',
        size: '',
        location: '',
        is_featured: false,
        is_active: true,
      });
      setImages([]);
      setActiveTab(0);
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Swal.fire({
        title: 'Campo requerido',
        text: 'El nombre del producto es obligatorio',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return false;
    }



    if (!formData.sale_price || parseFloat(formData.sale_price) <= 0) {
      Swal.fire({
        title: 'Precio inválido',
        text: 'El precio de venta debe ser mayor a 0',
        icon: 'warning',
        confirmButtonText: 'Entendido',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const productData = {
        name: formData.name,
        description: formData.description || undefined,
        barcode: formData.barcode || undefined,
        category_id: parseInt(formData.category_id),
        brand: formData.brand || undefined,
        model: formData.model || undefined,
        cost_price: parseFloat(formData.cost_price) || 0,
        sale_price: parseFloat(formData.sale_price),
        stock: parseInt(formData.stock) || 0,
        min_stock: parseInt(formData.min_stock) || 0,
        max_stock: parseInt(formData.max_stock) || 100,
        unit: formData.unit,
        weight: parseFloat(formData.weight) || undefined,
        color: formData.color || undefined,
        size: formData.size || undefined,
        location: formData.location || undefined,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        await Swal.fire({
          title: '¡Producto Creado!',
          text: 'El producto ha sido añadido exitosamente al inventario',
          icon: 'success',
          confirmButtonText: 'Excelente',
        });
        onProductCreated();
        onClose();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear producto');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      await Swal.fire({
        title: 'Error',
        text: error instanceof Error ? error.message : 'Error al crear el producto',
        icon: 'error',
        confirmButtonText: 'Entendido',
      });
    }
  };

  const tabs = [
    'Información Básica',
    'Precios y Stock',
    'Detalles Adicionales'
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '95vh',
          backgroundColor: '#f6f7f7',
        },
      }}
    >
      <Box sx={{ p: 0, backgroundColor: '#f6f7f7', minHeight: '90vh' }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            p: 4,
            backgroundColor: 'white',
            borderBottom: '1px solid #dee3e1',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={onClose}
              sx={{
                width: 40,
                height: 40,
                border: '1px solid #dee3e1',
                backgroundColor: 'white',
                color: '#6c7f76',
                '&:hover': { backgroundColor: '#f1f3f2' },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#131615', mb: 0.5 }}>
                Crear Nuevo Producto
              </Typography>
              <Typography variant="body2" sx={{ color: '#6c7f76' }}>
                Complete los detalles para añadir un producto al inventario.
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                px: 3,
                py: 1,
                backgroundColor: 'white',
                border: '1px solid #dee3e1',
                color: '#131615',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#f1f3f2' },
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 3,
                py: 1,
                backgroundColor: '#2e6b50',
                fontWeight: 700,
                boxShadow: '0px 8px 20px rgba(46, 107, 80, 0.2)',
                '&:hover': { backgroundColor: '#2e6b50', opacity: 0.9 },
              }}
              startIcon={<Save />}
            >
              Guardar Producto
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Box
          sx={{
            display: 'flex',
            borderBottom: '1px solid #dee3e1',
            backgroundColor: 'white',
            px: 4,
            overflowX: 'auto',
          }}
        >
          {tabs.map((tab, index) => (
            <Button
              key={index}
              onClick={() => handleTabChange(index)}
              sx={{
                px: 3,
                py: 1.5,
                fontWeight: activeTab === index ? 700 : 500,
                color: activeTab === index ? '#2e6b50' : '#6c7f76',
                borderBottom: activeTab === index ? '2px solid #2e6b50' : '2px solid transparent',
                borderRadius: 0,
                textTransform: 'none',
                minWidth: 'auto',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: '#2e6b50',
                  backgroundColor: 'transparent',
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 4,
              maxWidth: '1200px',
              mx: 'auto',
            }}
          >
            {/* Left Column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Tab Content */}
              {activeTab === 0 && (
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: 'white',
                    border: '1px solid #dee3e1',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: '#131615', display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Description sx={{ color: '#2e6b50' }} />
                    Información General
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Nombre del Producto *
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Ej: Aceite de Oliva Extra Virgen 500ml"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Descripción
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Describa las características del producto..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>

                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Código de Barras
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.barcode}
                        onChange={(e) => handleInputChange('barcode', e.target.value)}
                        placeholder="789012345678"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <QrCode sx={{ color: '#6c7f76' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Categoría
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={formData.category_id}
                          onChange={(e) => handleInputChange('category_id', e.target.value)}
                          displayEmpty
                          sx={{
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          }}
                        >
                          <MenuItem value="">Seleccionar categoría</MenuItem>
                          {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id.toString()}>
                              {category.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Marca
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                        placeholder="Ej: Nature Pro"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              )}

              {activeTab === 1 && (
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: 'white',
                    border: '1px solid #dee3e1',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: '#131615', display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    <Inventory sx={{ color: '#2e6b50' }} />
                    Gestión de Stock y Precios
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Precio de Venta ($) *
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={formData.sale_price}
                        onChange={(e) => handleInputChange('sale_price', e.target.value)}
                        placeholder="0.00"
                        inputProps={{ step: '0.01', min: '0' }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Stock Mínimo
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={formData.min_stock}
                        onChange={(e) => handleInputChange('min_stock', e.target.value)}
                        placeholder="5"
                        inputProps={{ min: '0' }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Stock Máximo
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={formData.max_stock}
                        onChange={(e) => handleInputChange('max_stock', e.target.value)}
                        placeholder="100"
                        inputProps={{ min: '0' }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Unidad de Medida
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={formData.unit}
                          onChange={(e) => handleInputChange('unit', e.target.value)}
                          sx={{
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          }}
                        >
                          <MenuItem value="unit">Unidad (ud)</MenuItem>
                          <MenuItem value="kg">Kilogramo (kg)</MenuItem>
                          <MenuItem value="g">Gramo (g)</MenuItem>
                          <MenuItem value="l">Litro (l)</MenuItem>
                          <MenuItem value="ml">Mililitro (ml)</MenuItem>
                          <MenuItem value="box">Caja</MenuItem>
                          <MenuItem value="pack">Paquete</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Ubicación Almacén
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Pasillo A - Estante 4"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              )}

              {activeTab === 2 && (
                <Card
                  sx={{
                    p: 3,
                    backgroundColor: 'white',
                    border: '1px solid #dee3e1',
                    borderRadius: 3,
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, mb: 3, color: '#131615', display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    Detalles Adicionales
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Modelo
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        placeholder="Ej: Premium V2"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Color
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.color}
                        onChange={(e) => handleInputChange('color', e.target.value)}
                        placeholder="Ej: Azul marino"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Tamaño
                      </Typography>
                      <TextField
                        fullWidth
                        value={formData.size}
                        onChange={(e) => handleInputChange('size', e.target.value)}
                        placeholder="Ej: Grande, 42, XL"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#131615' }}>
                        Peso (kg)
                      </Typography>
                      <TextField
                        fullWidth
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="0.0"
                        inputProps={{ step: '0.01', min: '0' }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f8faf9',
                            border: '1px solid #dee3e1',
                            borderRadius: 2,
                            '& fieldset': { border: 'none' },
                            '&:hover': { borderColor: '#2e6b50' },
                            '&.Mui-focused': { borderColor: '#2e6b50', boxShadow: '0 0 0 2px rgba(46, 107, 80, 0.1)' },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              )}
            </Box>

            {/* Right Column */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Imágenes del Producto */}
              <Card
                sx={{
                  p: 2,
                  backgroundColor: 'white',
                  border: '1px solid #dee3e1',
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, mb: 1.5, color: '#131615', display: 'flex', alignItems: 'center', gap: 0.5 }}
                >
                  <ImageIcon sx={{ color: '#2e6b50', fontSize: 14 }} />
                  Imágenes
                </Typography>
                
                {/* Upload Area */}
                <Box
                  component="label"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px dashed #dee3e1',
                    borderRadius: 1.5,
                    p: 2.5,
                    backgroundColor: '#f8faf9',
                    cursor: 'pointer',
                    mb: 2,
                    minHeight: '100px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: '#2e6b50',
                      backgroundColor: '#f1f3f2',
                    },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <CloudUpload 
                    sx={{ 
                      fontSize: 28, 
                      color: '#6c7f76', 
                      mb: 0.8,
                    }} 
                  />
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#131615', fontSize: '0.75rem', textAlign: 'center' }}>
                    Subir imágenes
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#6c7f76', fontSize: '0.68rem', textAlign: 'center' }}>
                    JPG, PNG, WEBP
                  </Typography>
                </Box>

                {/* Images List */}
                {images.length > 0 && (
                  <Box sx={{ space: 1 }}>
                    <Typography variant="caption" sx={{ color: '#6c7f76', fontSize: '0.7rem', mb: 1.5, display: 'block' }}>
                      {images.length} imagen{images.length !== 1 ? 'es' : ''} seleccionada{images.length !== 1 ? 's' : ''}
                    </Typography>
                    
                    <Stack spacing={1.2}>
                      {images.map((image, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.2,
                            p: 1.2,
                            backgroundColor: '#f8faf9',
                            borderRadius: 1.2,
                            border: '1px solid #dee3e1',
                          }}
                        >
                          {/* Image Preview */}
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: 0.8,
                              overflow: 'hidden',
                              flexShrink: 0,
                              border: '1px solid #dee3e1',
                            }}
                          >
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </Box>
                          
                          {/* Image Info */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '0.72rem', 
                                fontWeight: 600, 
                                color: '#131615',
                                display: 'block',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              Imagen {index + 1}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                fontSize: '0.65rem', 
                                color: '#6c7f76',
                                display: 'block'
                              }}
                            >
                              {(image.size / 1024).toFixed(1)} KB
                            </Typography>
                          </Box>
                          
                          {/* Delete Button */}
                          <IconButton
                            size="small"
                            onClick={() => removeImage(index)}
                            sx={{
                              width: 24,
                              height: 24,
                              color: '#6c7f76',
                              '&:hover': {
                                backgroundColor: '#ef4444',
                                color: 'white',
                              },
                            }}
                          >
                            <Close sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Empty State */}
                {images.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 1.5 }}>
                    <Typography variant="caption" sx={{ color: '#9ca3af', fontSize: '0.65rem' }}>
                      Ninguna imagen seleccionada
                    </Typography>
                  </Box>
                )}
              </Card>

              {/* Estado y Visibilidad */}
              <Card
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  border: '1px solid #dee3e1',
                  borderRadius: 3,
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#131615' }}>
                  Estado y Visibilidad
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      p: 1.5,
                      backgroundColor: '#f8faf9',
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#131615' }}>
                        Producto Destacado
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6c7f76' }}>
                        Mostrar en página principal
                      </Typography>
                    </Box>
                    <Switch
                      checked={formData.is_featured}
                      onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'white',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#2e6b50',
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
                      p: 1.5,
                      backgroundColor: '#f8faf9',
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#131615' }}>
                        Disponible para Venta
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#6c7f76' }}>
                        Activar en el catálogo POS
                      </Typography>
                    </Box>
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) => handleInputChange('is_active', e.target.checked)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: 'white',
                          '& + .MuiSwitch-track': {
                            backgroundColor: '#2e6b50',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>

          {/* Footer Actions */}
          <Box
            sx={{
              mt: 4,
              pt: 4,
              borderTop: '1px solid #dee3e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: '#6c7f76', fontWeight: 500, mr: 'auto' }}>
              Los campos marcados con (*) son obligatorios.
            </Typography>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: 'white',
                border: '1px solid #dee3e1',
                color: '#131615',
                fontWeight: 600,
                '&:hover': { backgroundColor: '#f1f3f2' },
              }}
            >
              Descartar Cambios
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                px: 5,
                py: 1.5,
                backgroundColor: '#2e6b50',
                fontWeight: 700,
                boxShadow: '0px 12px 24px rgba(46, 107, 80, 0.2)',
                '&:hover': { backgroundColor: '#2e6b50', opacity: 0.95 },
              }}
            >
              Publicar Producto
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
