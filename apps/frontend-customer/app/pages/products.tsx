import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '@fullstack-monorepo/ui-components';
import { getProducts } from '../../src/services/api';
import styles from '../app.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts(category || undefined, showInStockOnly || undefined);
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, showInStockOnly]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleInStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowInStockOnly(e.target.checked);
  };

  return (
    <div className={styles.productsPage}>
      <Card title="Products">
        <div className={styles.filters}>
          <div>
            <label htmlFor="category">Category: </label>
            <select 
              id="category" 
              value={category} 
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="inStock">
              <input
                id="inStock"
                type="checkbox"
                checked={showInStockOnly}
                onChange={handleInStockChange}
              />
              Show In-Stock Only
            </label>
          </div>
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <div className={styles.error}>
            <p>{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : products.length === 0 ? (
          <p>No products found matching your criteria.</p>
        ) : (
          <div className={styles.productGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <Card title={product.name}>
                  <p className={styles.price}>${product.price.toFixed(2)}</p>
                  <p>Category: {product.category}</p>
                  <p className={product.inStock ? styles.inStock : styles.outOfStock}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        )}

        <div className={styles.buttons}>
          <Link to="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}