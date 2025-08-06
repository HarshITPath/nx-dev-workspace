// Import styles
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';

// Import shared UI components
import { Button, Card } from '@fullstack-monorepo/ui-components';

// Import pages
import { Products } from './pages/products';

export function App() {
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
                <Card title="Welcome to Admin Dashboard">
                  <p>This is a demo of the NX monorepo with shared UI components.</p>
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
                <p>This is the settings page of the admin dashboard.</p>
                <Button variant="secondary" onClick={() => window.history.back()}>Go Back</Button>
              </Card>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
