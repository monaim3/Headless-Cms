"use client"
import axios from 'axios';
import { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://mukul.imaginebuilds.io/wp-json/wc/v3/products', {
          auth: {
            username:'ck_df96f804e388325a2ee39bd17c4e25d2d64bb46f', 
            password: 'cs_0eb536a922c988d5f98171c5c467fede4b40edec', 
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='mb-24'>
      <h1 className='text-4xl font-bold text-center mb-8'>Our Products</h1>
      <div className='flex justify-between px-5 pt-12'>
        {products.map((product) => (
          <div
            key={product.id}
            className=''
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              width: '300px',
              textAlign:"center",
              background:"#fff",
            }}
          >
            <img
              src={product.images[0]?.src}
              alt={product.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h2 className='mt-4'>{product.name}</h2>
            <p dangerouslySetInnerHTML={{ __html: product.description }} />
            <p><strong>Price:</strong> ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
