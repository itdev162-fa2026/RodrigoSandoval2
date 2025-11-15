const API_BASE_URL = 'http://localhost:5054';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?term=${encodeURIComponent(searchTerm)}`);

    if (!response.ok) {
      throw new Error('Failed to search products');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching products:', error);
    // Fallback to client-side filtering if search endpoint doesn't exist
    try {
      const allProducts = await getProducts();
      return allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (fallbackError) {
      console.error('Error in fallback search:', fallbackError);
      throw error;
    }
  }
};
