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
        background: '#111827',
        color: '#fff',
        iconColor: '#FB7185',
        confirmButtonColor: '#D946EF'
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
        confirmButtonColor: '#D946EF',
        cancelButtonColor: '#FB7185',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        background: '#111827',
        color: '#fff',
        iconColor: '#FB7185'
      });
  
      if (result.isConfirmed) {
        await axiosInstance.delete(`/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The product has been deleted.',
          background: '#111827',
          color: '#fff',
          iconColor: '#D946EF',
          confirmButtonColor: '#D946EF'
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to delete product. Please try again later.',
        background: '#111827',
        color: '#fff',
        iconColor: '#FB7185',
        confirmButtonColor: '#D946EF'
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
          <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
            <div className={`flex items-center bg-gray-800/70 rounded-lg overflow-hidden border transition-all duration-300 ${
              isSearchFocused ? 'border-[#D946EF] ring-2 ring-[#D946EF]/20' : 'border-gray-700'
            }`}>
              <input
                type="text"
                placeholder="Search products..."
                className="p-2 pl-4 pr-10 w-full sm:w-64 bg-transparent text-gray-200 focus:outline-none placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchTerm && (
                <button 
                  type="button"
                  className="absolute right-12 text-gray-400 hover:text-gray-200 transition-colors duration-300"
                  onClick={handleClearSearch}
                >
                  <IoClose className="w-5 h-5" />
                </button>
              )}
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] text-white p-2 rounded-r-lg hover:opacity-90 transition-opacity duration-300"
              >
                <IoSearch className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-800">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full border-4 border-gray-700 border-t-[#D946EF]"></div>
                <div className="absolute top-2 left-2 right-2 bottom-2 animate-ping rounded-full border-4 border-[#D946EF] opacity-20"></div>
              </div>
              <p className="text-gray-400 mt-4">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center">
              <div className="bg-gray-800/50 p-4 rounded-full inline-block mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-white">No products found</h3>
              <p className="mt-1 text-gray-400">
                {searchTerm ? `No results for "${searchTerm}"` : "Start by adding a product."}
              </p>
              {searchTerm && (
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D946EF] transition-colors duration-300"
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
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-800/50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-14 w-14 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 group-hover:border-[#D946EF] transition-colors duration-300 relative">
                              {product.image ? (
                                <div className="relative h-full w-full">
                                  <div className="absolute inset-0 bg-gradient-to-br from-[#D946EF]/10 to-[#FB7185]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                  <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-full w-full flex items-center justify-center text-gray-500">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{product.name}</div>
                              <div className="text-xs text-gray-500 font-mono">ID: {product._id.substring(0, 8)}...</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 max-w-xs">
                            {getTruncatedText(product.description, 60)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-[#D946EF]">${product.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.quantity > 10 
                              ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' 
                              : product.quantity > 0 
                                ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50' 
                                : 'bg-red-900/30 text-red-400 border border-red-800/50'
                          }`}>
                            {product.quantity} in stock
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEditProduct(product._id)}
                              className="text-[#D946EF] hover:text-[#FB7185] p-1.5 hover:bg-[#D946EF]/10 rounded-full transition-colors duration-300"
                              title="Edit product"
                            >
                              <IoPencil className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product._id)}
                              className="text-[#FB7185] hover:text-[#FB7185] p-1.5 hover:bg-[#FB7185]/10 rounded-full transition-colors duration-300"
                              title="Delete product"
                            >
                              <IoTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-800/50 px-4 py-3 flex items-center justify-between border-t border-gray-800 sm:px-6">
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        Showing page <span className="font-medium text-gray-300">{currentPage}</span> of{' '}
                        <span className="font-medium text-gray-300">{totalPages}</span> pages
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                            currentPage === 1 
                              ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' 
                              : 'border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-300'
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
                              <span key="ellipsis-start" className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400">
                                ...
                              </span>
                            );
                          }
                          
                          if (!showPages && pageNum === totalPages - 1 && currentPage < totalPages - 3) {
                            return (
                              <span key="ellipsis-end" className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400">
                                ...
                              </span>
                            );
                          }
                          
                          if (showPages) {
                            return (
                              <button
                                key={i}
                                onClick={() => handlePageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border transition-colors duration-300 ${
                                  currentPage === pageNum
                                    ? 'bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] text-white border-[#3B1D8F] z-10'
                                    : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white border-gray-700'
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
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                            currentPage === totalPages 
                              ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' 
                              : 'border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-300'
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
                      className={`relative inline-flex items-center px-4 py-2 border rounded-md ${
                        currentPage === 1 
                          ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' 
                          : 'border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-400">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-4 py-2 border rounded-md ${
                        currentPage === totalPages 
                          ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' 
                          : 'border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800'
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
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-3xl mx-4 overflow-hidden border border-gray-800">
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