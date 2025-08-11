// Import styles
import styles from './app.module.css';

// Import React Router components
import { Routes, Route, Link } from 'react-router-dom';

// Import shared UI components
import { Button, Card } from '@fullstack-monorepo/ui-components';

// Import shared utilities
import { formatDate, capitalize, truncate } from '@fullstack-monorepo/utils';

// Import pages
import { Products } from './pages/products';

export function App() {
  const currentDate = formatDate(new Date());
  const title = capitalize('customer portal');
  const description = truncate(
    'This is a demo of the NX monorepo with shared UI components and utilities. This application uses the same UI components and utility functions as the Admin portal, demonstrating excellent code sharing in a monorepo architecture.',
    120
  );

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>{title}</h1>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </header>
      
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={
            <Card title={`Welcome to ${title}`}>
              <p>{description}</p>
              <p>Today's date: <strong>{currentDate}</strong></p>
              
              <div className={styles.buttons}>
                <Button variant="primary" onClick={() => alert('Primary action clicked!')}>Get Started</Button>
                <Link to="/products">
                  <Button variant="secondary">View Products</Button>
                </Link>
              </div>
            </Card>
          } />
          <Route path="/products" element={<Products />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;