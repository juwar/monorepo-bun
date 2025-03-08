import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';

// Define our API types that can be imported by the frontend
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

// Create our Elysia app
const app = new Elysia()
  .use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }))
  .use(swagger())
  .get('/', () => 'Hello from Elysia Backend!')
  
  // Todos API
  .group('/api/todos', (app) => app
    .get('/', () => {
      return [
        { id: 1, text: 'Learn Elysia.js', completed: true },
        { id: 2, text: 'Build a monorepo', completed: false },
        { id: 3, text: 'Connect frontend and backend', completed: false }
      ] as Todo[];
    })
    .post('/', ({ body }: { body: { text: string; completed: boolean } }) => {
      console.log('Creating new todo:', body);
      return { id: 4, ...body } as Todo;
    }, {
      body: t.Object({
        text: t.String(),
        completed: t.Boolean()
      })
    })
  )
  
  // Users API
  .group('/api/users', (app) => app
    .get('/', () => {
      return [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ] as User[];
    })
  );

// Export the app type for Eden client
export type App = typeof app;

// Start the server
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port);

console.log(`🦊 Elysia backend is running at ${app.server?.hostname}:${app.server?.port}`);
