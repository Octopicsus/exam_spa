const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  CATEGORIES: '/data/categories.json',
  ICONS: '/data/iconsCategories.json',
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  USERS: `${API_BASE_URL}/users`,
  TRANSACTIONS: `${API_BASE_URL}/transactions`,
};

export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    createdAt?: string;
  };
}

export interface RegisterData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const authAPI = {
  register: async (data: RegisterData): Promise<AuthResponse> => {
    console.log('Sending registration request:', { email: data.email, password: '***' });
    
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Server response:', response.status, response.statusText);

    if (!response.ok) {
      const error = await response.json();
      console.error('Registration error:', error);
      throw new Error(error.message || 'Registration failed');
    }

    const result = await response.json();
    console.log('Successful registration:', { token: result.token ? 'received' : 'missing', user: result.user });
    return result;
  },

  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  verify: async (token: string) => {
    console.log('API: Verifying token...', { tokenExists: !!token });
    const response = await fetch(API_ENDPOINTS.AUTH.VERIFY, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log('API: Verify response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('API: Verify error:', errorData);
      throw new Error('Token verification failed');
    }

    const result = await response.json();
    console.log('API: Verify success:', result);
    return result;
  },

  logout: async (refreshToken: string) => {
    console.log('API: Logging out...');
    const response = await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    console.log('API: Logout response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log('API: Logout error:', errorData);
      throw new Error('Logout failed');
    }

    const result = await response.json();
    console.log('API: Logout success:', result);
    return result;
  },

  getUsers: async (token: string) => {
    const response = await fetch(API_ENDPOINTS.USERS, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },
}; 

export interface Transaction {
  _id?: string;
  id?: number;
  userId?: string;
  userEmail?: string;
  type: string;
  title: string;
  description: string;
  amount: number;
  originalAmount: number;
  originalCurrency: string;
  date: string;
  time: string;
  img: string;
  color: string;
  createdAt?: string;
  updatedAt?: string;
}

export const transactionsAPI = {
  // Получить все транзакции
  getTransactions: async (token: string) => {
    const response = await fetch(API_ENDPOINTS.TRANSACTIONS, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return response.json();
  },

  // Создать новую транзакцию
  createTransaction: async (token: string, transaction: Omit<Transaction, '_id' | 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const response = await fetch(API_ENDPOINTS.TRANSACTIONS, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create transaction');
    }

    return response.json();
  },

  // Обновить транзакцию
  updateTransaction: async (token: string, transactionId: string, updateData: Partial<Transaction>) => {
    const response = await fetch(`${API_ENDPOINTS.TRANSACTIONS}/${transactionId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update transaction');
    }

    return response.json();
  },

  // Удалить транзакцию
  deleteTransaction: async (token: string, transactionId: string) => {
    const response = await fetch(`${API_ENDPOINTS.TRANSACTIONS}/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete transaction');
    }

    return response.json();
  },
};