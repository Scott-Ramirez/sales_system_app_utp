import { ApiResponse, Sale, CreateSaleRequest, PaginatedResponse, PaginationParams, DashboardStats } from '@/app/types';

class SaleService {
  private static baseURL = 'http://localhost:3000/api/sales';

  static async getAll(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Sale>>> {
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
      console.error('Error fetching sales:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async getById(id: string): Promise<ApiResponse<Sale>> {
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
      console.error('Error fetching sale:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async create(sale: CreateSaleRequest): Promise<ApiResponse<Sale>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sale),
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error creating sale:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }

  static async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/dashboard-stats`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      return { success: response.ok, data };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }
}

export default SaleService;