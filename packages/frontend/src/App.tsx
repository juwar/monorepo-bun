import { useState, useEffect } from 'react';
import { getTodos, getUsers, createTodo } from './lib/api';
import type { Todo, User } from '@monorepo/backend';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [todosData, usersData] = await Promise.all([
          getTodos(),
          getUsers()
        ]);
        
        setTodos(todosData);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    try {
      const newTodo = await createTodo(newTodoText);
      if (newTodo) {
        setTodos([...todos, newTodo]);
        setNewTodoText('');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className="app">
      <h1>Monorepo Demo</h1>
      <p>Frontend with Vite + Backend with Elysia.js</p>
      
      <div className="card">
        <h2>Todos</h2>
        {loading ? (
          <p>Loading todos...</p>
        ) : (
          <>
            <ul className="todo-list">
              {todos.map((todo) => (
                <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                  <span>{todo.text}</span>
                  <span className="status">{todo.completed ? '✓' : '○'}</span>
                </li>
              ))}
            </ul>
            
            <form onSubmit={handleAddTodo} className="todo-form">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a new todo"
              />
              <button type="submit">Add</button>
            </form>
          </>
        )}
      </div>
      
      <div className="card">
        <h2>Users</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <ul className="user-list">
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>
                <span className="email">{user.email}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
