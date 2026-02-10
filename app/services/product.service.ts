import { ApiResponse, Product, CreateProductRequest, PaginatedResponse, PaginationParams } from '@/app/types';

class ProductService {
  private static baseURL = 'http://localhost:3000/api/products';

  static async getAll(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Product>>> {
    try {
      const queryString = new URLSearchParams();
      if (params?.page) queryString.append('page', params.page.toString());
      if (params?.limit) queryString.append('limit', params.limit.toString());
      if (params?.search) queryString.append('search', params.search);
      if (params?.sortBy) queryString.append('sortBy', params.sortBy);
      if (params?.sortOrder) queryString.append('sortOrder', params.sortOrder);

      const url = `${this.baseURL}${queryString.toString() ? `?${queryString}` : ''}`;
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async getById(id: string): Promise<ApiResponse<Product>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error fetching product:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async create(product: CreateProductRequest): Promise<ApiResponse<Product>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error creating product:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async update(id: string, product: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error updating product:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async delete(id: string): Promise<ApiResponse<void>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return { success: response.ok };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }
}

export default ProductService;