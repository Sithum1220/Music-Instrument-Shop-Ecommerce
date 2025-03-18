import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoPencil, IoTrash, IoSearch, IoClose, IoRefresh } from "react-icons/io5";
import AdminProductUpdateForm from "./AdminProductUpdatePage";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
}

const AdminProductLoadPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const productsPerPage = 5;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:4000/products/get");
      const fetchedProducts: Product[] = response.data;

      const filteredProducts = applySearchFilter(fetchedProducts, searchTerm);

      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

      setProducts(productsForCurrentPage);
      setTotalPages(totalPages || 1); // Ensure at least 1 page
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Could not load products. Please check your connection.',
        confirmButtonColor: '#4F46E5'
      });
    }
  };

  // Apply search filter function
  const applySearchFilter = (products: Product[], term: string) => {
    if (!term.trim()) return products;
    
    return products.filter((product) =>
      Object.values(product).some((value) =>
        typeof value === "string" ? value.toLowerCase().includes(term.toLowerCase()) : false
      )
    );
  };

  // Fetch products on initial component mount, whenever currentPage changes, or when searchTerm changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  // Handle editing a product
  const handleEditProduct = (id: string) => {
    const productToEdit = products.find((product) => product._id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
    }
  };

  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${token}`, 
      'Content-Type': 'application/json',
    },
  });
  
  const handleDeleteProduct = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Delete Product?',
        text: 'Are you sure you want to delete this product?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#6366F1',
        cancelButtonColor: '#F43F5E',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
      });
  
      if (result.isConfirmed) {
        await axiosInstance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The product has been deleted.',
          confirmButtonColor: '#6366F1'
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete product. Please try again later.',
        confirmButtonColor: '#6366F1'
      });
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const getTruncatedText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="w-full p-4">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Product Management
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
            <div className={`flex items-center bg-white rounded-lg overflow-hidden border transition-all ${
              isSearchFocused ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'
            }`}>
              <input
                type="text"
                placeholder="Search products..."
                className="p-2 pl-4 pr-10 w-full sm:w-64 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button 
                  type="button"
                  className="absolute right-12 text-gray-500 hover:text-gray-700"
                  onClick={handleClearSearch}
                >
                  <IoClose className="w-5 h-5" />
                </button>
              )}
              <button 
                type="submit" 
                className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              >
                <IoSearch className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm ? `No results for "${searchTerm}"` : "Start by adding a product."}
              </p>
              {searchTerm && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleClearSearch}
                  >
                    <IoRefresh className="-ml-0.5 mr-2 h-4 w-4" /> Clear search
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-14 w-14 rounded bg-gray-100 overflow-hidden">
                              {product.image ? (
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-400">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">ID: {product._id.substring(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs">
                            {getTruncatedText(product.description, 60)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-600">${product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.quantity > 10 
                              ? 'bg-green-100 text-green-800' 
                              : product.quantity > 0 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {product.quantity} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEditProduct(product._id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3 p-1 hover:bg-indigo-50 rounded"
                            title="Edit product"
                          >
                            <IoPencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="text-rose-600 hover:text-rose-900 p-1 hover:bg-rose-50 rounded"
                            title="Delete product"
                          >
                            <IoTrash className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page <span className="font-medium">{currentPage}</span> of{' '}
                        <span className="font-medium">{totalPages}</span> pages
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => {
                          // Show max 5 pages with current in the middle when possible
                          const pageNum = i + 1;
                          const showPages = totalPages <= 5 || 
                                          (pageNum === 1) || 
                                          (pageNum === totalPages) ||
                                          (Math.abs(pageNum - currentPage) <= 1);
                          
                          if (!showPages && pageNum === 2 && currentPage > 4) {
                            return (
                              <span key="ellipsis-start" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                              </span>
                            );
                          }
                          
                          if (!showPages && pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                            return (
                              <span key="ellipsis-end" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                                ...
                              </span>
                            );
                          }
                          
                          if (showPages) {
                            return (
                              <button
                                key={i}
                                onClick={() => handlePageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border ${
                                  currentPage === pageNum
                                    ? 'bg-indigo-600 text-white border-indigo-600 z-10'
                                    : 'bg-white text-gray-500 hover:bg-gray-50 border-gray-300'
                                } text-sm font-medium`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                          
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages 
                              ? 'text-gray-300 cursor-not-allowed' 
                              : 'text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                  
                  {/* Mobile Pagination */}
                  <div className="flex items-center justify-between w-full sm:hidden">
                    <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === 1 
                          ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                          : 'text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === totalPages 
                          ? 'text-gray-300 bg-gray-50 cursor-not-allowed' 
                          : 'text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Render the AdminProductUpdateForm when a product is selected for editing */}
      {selectedProduct && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
            <AdminProductUpdateForm
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
              onProductUpdate={fetchProducts} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductLoadPage;