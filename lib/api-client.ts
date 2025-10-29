/**
 * API Client for UniCart
 * Handles API calls for both web (relative paths) and mobile (full URLs)
 */

const getApiBaseUrl = (): string => {
  // Check if we're in a Capacitor mobile app
  if (typeof window !== 'undefined') {
    const capacitor = (window as any).Capacitor;
    if (capacitor && capacitor.isNativePlatform()) {
      // Mobile app - use full URL from environment variable
      return process.env.NEXT_PUBLIC_API_URL || 'https://your-app.vercel.app';
    }
  }
  
  // Web browser - use relative paths
  return '';
};

export const apiClient = {
  /**
   * Base fetch method with automatic URL handling
   */
  fetch: async (url: string, options?: RequestInit): Promise<Response> => {
    const baseUrl = getApiBaseUrl();
    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : url;
    
    // Get auth token for authenticated requests
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') 
      : null;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string> || {}),
    };
    
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        error: `HTTP ${response.status}: ${response.statusText}` 
      }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }
    
    return response;
  },
  
  /**
   * GET request
   */
  get: async <T = any>(url: string): Promise<T> => {
    const response = await apiClient.fetch(url, { method: 'GET' });
    return response.json();
  },
  
  /**
   * POST request
   */
  post: async <T = any>(url: string, data?: any): Promise<T> => {
    const response = await apiClient.fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  /**
   * PUT request
   */
  put: async <T = any>(url: string, data?: any): Promise<T> => {
    const response = await apiClient.fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  /**
   * DELETE request
   */
  delete: async <T = any>(url: string): Promise<T> => {
    const response = await apiClient.fetch(url, { method: 'DELETE' });
    return response.json();
  },
};
