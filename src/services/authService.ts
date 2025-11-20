// Example API service structure
// Add your API base URL and endpoints here

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.example.com';

export const authService = {
  login: async (email: string, password: string) => {
    // TODO: Implement actual API call
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },

  logout: async () => {
    // TODO: Implement logout logic
    console.log('Logout');
  },

  register: async (email: string, password: string, name: string) => {
    // TODO: Implement registration
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },
};

export default authService;
