import {
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import { AppNav } from './app-nav';

type MetaFunction = () => Array<{ title?: string; [key: string]: unknown }>;
type LinksFunction = () => Array<{ rel: string; href: string; crossOrigin?: string }>;

export const meta: MetaFunction = () => [
  {
    title: 'New Nx React Router App',
  },
];

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Customer Portal</title>
        {/* Add your CSS links here */}
      </head>
      <body>
        <AppNav />
        {children}
        <ScrollRestoration />
        {/* React Router v6 doesn't use Scripts component */}
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
