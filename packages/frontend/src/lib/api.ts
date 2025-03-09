import { treaty } from '@elysiajs/eden'
import type { App } from '@monorepo/backend';
import {env} from '../env'

// Create the Eden client to connect to the backend
export const $api = treaty<App>(env?.VITE_API_BASE_URL|| 'http://localhost:3000');

// Helper functions for the API
export const getTodos = async () => {
  const response = await $api.api.todos.index.get()
  
  if (response.error) {
    console.error('Error fetching todos:', response.error);
    return [];
  }
  
  return response.data;
};

export const getUsers = async () => {
  const response = await $api.api.users.index.get();
  
  if (response.error) {
    console.error('Error fetching users:', response.error);
    return [];
  }
  
  return response.data;
};

export const createTodo = async (text: string, completed: boolean = false) => {
  const response = await $api.api.todos.index.post({
    text,
    completed
  });
  
  if (response.error) {
    console.error('Error creating todo:', response.error);
    return null;
  }
  
  return response.data;
};
