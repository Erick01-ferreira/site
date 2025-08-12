const API_BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  return handleResponse(response);
};

export const createUser = async (user: any) => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return handleResponse(response);
};

export const deleteUser = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export default {
  getUsers,
  createUser,
  deleteUser,
};