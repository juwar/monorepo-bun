import { edenTreaty } from '@elysiajs/eden';
import type { App } from '@monorepo/backend';

// Create the Eden client to connect to the backend
export const api = edenTreaty<App>('http://localhost:3000');

// Helper functions for the API
export const getTodos = async () => {
  const response = await api.api.todos.get();
  
  if (response.error) {
    console.error('Error fetching todos:', response.error);
    return [];
  }
  
  return response.data;
};

export const getUsers = async () => {
  const response = await api.api.users.get();
  
  if (response.error) {
    console.error('Error fetching users:', response.error);
    return [];
  }
  
  return response.data;
};

export const createTodo = async (text: string, completed: boolean = false) => {
  const response = await api.api.todos.post({
    text,
    completed
  });
  
  if (response.error) {
    console.error('Error creating todo:', response.error);
    return null;
  }
  
  return response.data;
};
