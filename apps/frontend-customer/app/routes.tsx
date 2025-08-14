import App from './app';
import About from './routes/about';

export const routes = [
  {
    path: '/',
    element: <App />
  },
  {
    path: '/about',
    element: <About />
  }
];

export default routes;