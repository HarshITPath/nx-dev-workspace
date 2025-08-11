// Import styles
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';

// Import shared UI components
import { Button, Card } from '@fullstack-monorepo/ui-components';

// Import shared utilities
import { formatDate, capitalize, formatCurrency } from '@fullstack-monorepo/utils';

// Import pages
import { Products } from './pages/products';

export function App() {
  const currentDate = formatDate(new Date());
  const welcomeMessage = capitalize('welcome to admin dashboard');
  const samplePrice = formatCurrency(1299.99);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Admin Dashboard</h1>
        <div className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/page-2">Settings</Link>
        </div>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Card title={welcomeMessage}>
                  <p>This is a demo of the NX monorepo with shared UI components and utilities.</p>
                  <p>Today's date: <strong>{currentDate}</strong></p>
                  <p>Sample price formatting: <strong>{samplePrice}</strong></p>
                  <div className={styles.buttons}>
                    <Link to="/products">
                      <Button variant="primary">Manage Products</Button>
                    </Link>
                    <Button variant="secondary">View Reports</Button>
                    <Button variant="danger">System Settings</Button>
                  </div>
                </Card>

                <Card title="Home Page">
                  <p>This is the home page of the admin dashboard.</p>
                  <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
                </Card>
              </>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route
            path="/page-2"
            element={
              <Card title="Settings">
                <p>Settings page content goes here.</p>
              </Card>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;