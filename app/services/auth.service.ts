const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default class AuthService {
  static async login(username: string, password: string, rememberMe: boolean = false) {
    const loginUrl = `${API_URL}/auth/login`;
    console.log('Attempting login to:', loginUrl);
    console.log('API_URL from env:', process.env.NEXT_PUBLIC_API_URL);
    console.log('Final API_URL:', API_URL);
    
    // Test simple fetch first
    try {
      console.log('Testing fetch...');
      const testResponse = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log('Test fetch successful, status:', testResponse.status);
      
      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const result = await testResponse.json();
      
      // Guardar token según preferencia del usuario
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', result.access_token || result.accessToken);
      if (result.user) {
        storage.setItem('user', JSON.stringify(result.user));
      }

      return result;
    } catch (fetchError) {
      console.error('Fetch error details:', fetchError);
      throw fetchError;
    }
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(localStorage.getItem('token') || sessionStorage.getItem('token'));
  }

  static getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  static getUser() {
    if (typeof window === 'undefined') return null;
    try {
      const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }
}
