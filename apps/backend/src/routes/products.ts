import express, { Request, Response } from 'express';
const router = express.Router();

// Mock product data
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', inStock: true },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', inStock: true },
  { id: 3, name: 'Headphones', price: 149.99, category: 'Accessories', inStock: false },
  { id: 4, name: 'Monitor', price: 299.99, category: 'Electronics', inStock: true },
  { id: 5, name: 'Keyboard', price: 89.99, category: 'Accessories', inStock: true }
];

// Get all products
router.get('/', (req: Request, res: Response) => {
  const { category, inStock } = req.query;
  
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (inStock === 'true') {
    filteredProducts = filteredProducts.filter(product => product.inStock === true);
  } else if (inStock === 'false') {
    filteredProducts = filteredProducts.filter(product => product.inStock === false);
  }
  
  res.json(filteredProducts);
});

// Get product by ID
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find(product => product.id === id);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Create a new product
router.post('/', (req: Request, res: Response) => {
  const { name, price, category, inStock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }
  
  const newProduct: Product = {
    id: products.length + 1,
    name,
    price: parseFloat(price),
    category: category || 'General',
    inStock: inStock !== undefined ? Boolean(inStock) : true
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

export default router;