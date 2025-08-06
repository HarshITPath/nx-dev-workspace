import { useState, useEffect } from 'react';
import { getProducts, createProduct } from '../../services/api';
import { Card, Button } from '@fullstack-monorepo/ui-components';
import styles from '../app.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface ProductFormData {
  name: string;
  price: string;
  category: string;
  inStock: boolean;
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: '',
    category: 'Electronics',
    inStock: true
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.name || !formData.price) {
        setError('Name and price are required');
        return;
      }
      
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        inStock: formData.inStock
      };
      
      await createProduct(productData);
      
      // Reset form and fetch updated products
      setFormData({
        name: '',
        price: '',
        category: 'Electronics',
        inStock: true
      });
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', err);
    }
  };

  return (
    <div className={styles.productsPage}>
      <Card title="Product Management">
        <div className={styles.adminControls}>
          <Button 
            variant="primary" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add New Product'}
          </Button>
        </div>

        {showForm && (
          <div className={styles.formContainer}>
            <h3>Add New Product</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Product Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="price">Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="category">Category:</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Uncategorized">Uncategorized</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="inStock">
                  <input
                    type="checkbox"
                    id="inStock"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                  />
                  In Stock
                </label>
              </div>
              
              <button type="submit" className={styles.submitButton}>
                <Button variant="primary">Add Product</Button>
              </button>
            </form>
          </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <h3>Product List</h3>
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className={styles.productTable}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>{product.category}</td>
                    <td className={product.inStock ? styles.inStock : styles.outOfStock}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}