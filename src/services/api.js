const API_URL = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem('token');
}

export async function request(endpoint, { method = 'GET', body, headers = {} } = {}, onUnauthorized) {
  const token = getToken();
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  if (body) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_URL}${endpoint}`, config);
  if (response.status === 401 && typeof onUnauthorized === 'function') {
    onUnauthorized();
    return;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Erro na requisição');
    error.response = { status: response.status, data };
    throw error;
  }
  return data;
}

const api = {
  get: (endpoint, onUnauthorized) => request(endpoint, {}, onUnauthorized),
  post: (endpoint, body, onUnauthorized) => request(endpoint, { method: 'POST', body }, onUnauthorized),
  put: (endpoint, body, onUnauthorized) => request(endpoint, { method: 'PUT', body }, onUnauthorized),
  delete: (endpoint, onUnauthorized) => request(endpoint, { method: 'DELETE' }, onUnauthorized),
};

export default api;