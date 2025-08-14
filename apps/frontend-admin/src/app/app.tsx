// Import styles
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import { useMemo } from 'react';

// Import shared UI components
import { Button, Card } from '@fullstack-monorepo/ui-components';

// Import shared utilities
import { formatDate, capitalize } from '@fullstack-monorepo/utils';

// Import pages
import { Products } from './pages/products';

export function App() {
  const currentDate = useMemo(() => formatDate(new Date()), []);
  const welcomeMessage = useMemo(() => capitalize('welcome to admin dashboard'), []);

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
                  <p>This is a simple NX monorepo admin app.</p>
                  <p>Today's date: <strong>{currentDate}</strong></p>

                  <div className={styles.buttons}>
                    <Link to="/products">
                      <Button variant="primary">Manage Products</Button>
                    </Link>
                    <Button variant="secondary">View Reports</Button>
                    <Button variant="danger">System Settings</Button>
                  </div>
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