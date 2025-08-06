// Import styles
import styles from './app.module.css';

// Import React Router components
import { Routes, Route, Link } from 'react-router-dom';

// Import shared UI components
import { Button, Card } from '@fullstack-monorepo/ui-components';

// Import pages
import { Products } from './pages/products';

export function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Customer Portal</h1>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
      </header>
      
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={
            <Card title="Welcome to Customer Portal">
              <p>This is a demo of the NX monorepo with shared UI components.</p>
              <p>This application uses the same UI components as the Admin portal, demonstrating code sharing in a monorepo.</p>
              
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
