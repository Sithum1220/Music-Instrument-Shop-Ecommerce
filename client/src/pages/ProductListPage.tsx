import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FiSearch, FiFilter, FiShoppingCart, FiGrid, FiList, FiX, FiPlus } from "react-icons/fi";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
  description?: string;
}

const ProductListingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = location.state || {
    cartItems: {} as { [key: string]: Product },
  };

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(8);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortCriteria, setSortCriteria] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Product[]>(
        "http://localhost:4000/products/get"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      
      // Extract categories
      const categories = Array.from(
        new Set(response.data.map((product) => product.category))
      ) as string[];
      setCategoryFilters(["All", ...categories]);
      
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error loading products",
        text: "Failed to load products. Please try again later.",
        background: "#1E1E2E",
        color: "#E2E8F0",
        iconColor: "#FB7185"
      });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Apply all filters and sorting
  useEffect(() => {
    if (products.length === 0) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply availability filter
    if (availabilityFilter === "inStock") {
      result = result.filter(product => product.quantity > 0);
    } else if (availabilityFilter === "outOfStock") {
      result = result.filter(product => product.quantity === 0);
    }
    
    // Apply sorting
    if (sortCriteria === "priceLow") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortCriteria === "priceHigh") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortCriteria === "nameAZ") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "nameZA") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortCriteria === "quantity") {
      result.sort((a, b) => b.quantity - a.quantity);
    }
    
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, categoryFilter, sortCriteria, availabilityFilter]);

  const addToCart = (product: Product) => {
    if (product.quantity === 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: `${product.name} is currently out of stock.`,
        background: "#1E1E2E",
        color: "#E2E8F0",
        iconColor: "#FB7185"
      });
      return;
    }
    
    const updatedCart = { ...cartItems };
    if (updatedCart[product._id]) {
      updatedCart[product._id].quantity++;
    } else {
      updatedCart[product._id] = { ...product, quantity: 1 };
    }
    
    navigate("/product-list", { state: { cartItems: updatedCart } });
    
    Swal.fire({
      position: "bottom-end",
      icon: "success",
      title: "Added to Cart",
      text: `${product.name} has been added to your cart.`,
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      width: "400px",
      background: "#1E1E2E",
      color: "#E2E8F0",
      iconColor: "#D946EF",
      customClass: {
        title: "text-white",
        popup: "rounded-lg border border-gray-800",
      },
    });
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "https://via.placeholder.com/150";
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };

  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAvailabilityFilter(event.target.value);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSortCriteria("all");
    setCategoryFilter("All");
    setAvailabilityFilter("all");
    setFilteredProducts([...products]);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Calculate pagination data
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Get cart count
  const cartCount = Object.values(cartItems as { [key: string]: Product }).reduce(
    (total, item) => total + item.quantity, 0
  );

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111827] text-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-[#D946EF] animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-t-2 border-b-2 border-[#FB7185] animate-spin" style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-4 rounded-full border-t-2 border-b-2 border-[#3B1D8F] animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Products</h2>
          <p className="text-gray-400">Please wait while we fetch the latest products for you</p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1 mt-2">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-[#D946EF]" 
                style={{ 
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: `${i * 0.16}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#111827] text-white">
        <div className="text-center max-w-md p-8 bg-gray-900/60 backdrop-blur-md rounded-lg shadow-lg border border-gray-800">
          <div className="text-[#FB7185] mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <div className="relative inline-block group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <button
              onClick={() => fetchProducts()}
              className="relative px-6 py-3 bg-gray-900 text-white rounded-md font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#111827] text-gray-200">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgdHJhbnNmb3JtPSJzY2FsZSgxKSI+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzgxMTdFIiBzdHJva2Utd2lkdGg9IjAuNSIgZD0iTS41LjVoMjB2MjBoLTIweiIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#D946EF] rounded-full opacity-5 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FB7185] rounded-full opacity-5 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-gray-900/70 backdrop-blur-md border-b border-gray-800 shadow-lg z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative flex items-center justify-center w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185] hidden sm:inline-block">
                ECHO NEXUS
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                state={{ cartItems }}
                className="relative p-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <div className="absolute inset-0 rounded-full bg-gray-800/0 group-hover:bg-gray-800/50 transition-colors duration-300"></div>
                <FiShoppingCart className="w-6 h-6 relative z-10" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center z-20 shadow-lg shadow-[#D946EF]/30">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <Link
                to="/cart"
                state={{ cartItems }}
                className="hidden md:flex items-center relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gray-900 text-white px-4 py-2 rounded-md font-medium z-10">
                  View Cart
                  {cartCount > 0 && (
                    <span className="ml-2 bg-white text-[#D946EF] text-xs rounded-full h-5 w-5 inline-flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4 md:mb-0 relative inline-block">
            <span className="relative z-10">Our Products</span>
            <span className="absolute -bottom-1 left-0 w-1/3 h-1 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-full"></span>
          </h1>
          
          <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search form */}
            <form 
              onSubmit={handleSearchSubmit}
              className="relative flex-grow"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </form>
            
            {/* Filter toggle button (mobile) */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="md:hidden flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            
            {/* View toggle */}
            <div className="hidden sm:flex border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setIsGridView(true)}
                className={`px-3 py-2 ${isGridView ? 'bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white' : 'bg-gray-900 text-gray-400 hover:text-white'} transition-colors duration-300`}
                title="Grid view"
              >
                <FiGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsGridView(false)}
                className={`px-3 py-2 ${!isGridView ? 'bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white' : 'bg-gray-900 text-gray-400 hover:text-white'} transition-colors duration-300`}
                title="List view"
              >
                <FiList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          {/* Filters - Desktop */}
          <aside className="hidden md:block w-64 bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 p-6 h-fit">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-3 relative inline-block">
                  Categories
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h3>
                <div className="space-y-2 mt-4">
                  <select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                  >
                    {categoryFilters.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3 relative inline-block">
                  Sort By
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h3>
                <div className="mt-4">
                  <select
                    value={sortCriteria}
                    onChange={handleSortChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                  >
                    <option value="all">Default</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="nameAZ">Name: A to Z</option>
                    <option value="nameZA">Name: Z to A</option>
                    <option value="quantity">Availability</option>
                  </select>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3 relative inline-block">
                  Availability
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185]"></span>
                </h3>
                <div className="mt-4">
                  <select
                    value={availabilityFilter}
                    onChange={handleAvailabilityChange}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                  >
                    <option value="all">All Items</option>
                    <option value="inStock">In Stock</option>
                    <option value="outOfStock">Out of Stock</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors duration-300 mt-4"
              >
                Reset Filters
              </button>
            </div>
          </aside>
          
          {/* Filters - Mobile */}
          {isFilterOpen && (
            <div className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end">
              <div className="bg-gray-900 w-full rounded-t-xl p-6 max-h-[80vh] overflow-y-auto border-t border-gray-800">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Filters</h3>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Categories</h3>
                    <div className="space-y-2">
                      <select
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                      >
                        {categoryFilters.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Sort By</h3>
                    <select
                      value={sortCriteria}
                      onChange={handleSortChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                    >
                      <option value="all">Default</option>
                      <option value="priceLow">Price: Low to High</option>
                      <option value="priceHigh">Price: High to Low</option>
                      <option value="nameAZ">Name: A to Z</option>
                      <option value="nameZA">Name: Z to A</option>
                      <option value="quantity">Availability</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Availability</h3>
                    <select
                      value={availabilityFilter}
                      onChange={handleAvailabilityChange}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                    >
                      <option value="all">All Items</option>
                      <option value="inStock">In Stock</option>
                      <option value="outOfStock">Out of Stock</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={handleResetFilters}
                      className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-md transition-colors duration-300"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white rounded-md transition-colors duration-300"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Products */}
          <div className="flex-1">
            {/* Results status */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-800">
              <div>
                <p className="text-gray-400">
                  Showing <span className="text-white font-medium">{indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, filteredProducts.length)}</span> of <span className="text-white font-medium">{filteredProducts.length}</span> products
                </p>
              </div>
              
              <div className="flex items-center space-x-2 mt-3 sm:mt-0">
                <span className="text-gray-400 text-sm">Sort by:</span>
                <select
                  value={sortCriteria}
                  onChange={handleSortChange}
                  className="text-sm bg-gray-800 border border-gray-700 rounded-md px-2 py-1 focus:ring-[#D946EF] focus:border-[#D946EF] text-white"
                >
                  <option value="all">Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="nameAZ">Name: A to Z</option>
                  <option value="nameZA">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* No products message */}
            {currentProducts.length === 0 && (
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center border border-gray-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                  <FiFilter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white rounded-md transition-colors duration-300 hover:opacity-90"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Grid View */}
            {isGridView && currentProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-[#D946EF]/20 hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-gray-700"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3B1D8F]/10 to-[#FB7185]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.quantity === 0 && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#FB7185] to-[#D946EF] text-white text-xs px-2 py-1 rounded-full z-20">
                          Out of Stock
                        </div>
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-4 flex-grow">
                      <div className="text-xs text-gray-400 mb-1">{product.category}</div>
                      <h3 className="text-sm sm:text-base font-medium text-white mb-1 line-clamp-2 group-hover:text-[#FB7185] transition-colors duration-300">{product.name}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">USD. {product.price.toLocaleString()}</p>
                        {product.quantity > 0 && (
                          <span className="text-xs text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-2 py-0.5">
                            In Stock
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <div className="px-4 pb-4">
                      <div className="relative group">
                        {product.quantity > 0 && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                        )}
                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.quantity === 0}
                          className={`relative w-full flex items-center justify-center py-2 px-4 rounded-md z-10 ${
                            product.quantity === 0
                              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                              : "bg-gray-800 text-white hover:text-white"
                          } transition-all duration-300`}
                        >
                          <FiPlus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* List View */}
            {!isGridView && currentProducts.length > 0 && (
              <div className="space-y-4">
                {currentProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-gray-900/60 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden flex hover:shadow-[#D946EF]/20 hover:shadow-xl transition-all duration-300 border border-gray-800 hover:border-gray-700"
                  >
                    {/* Product Image */}
                    <div className="w-32 sm:w-48 h-32 sm:h-48 flex-shrink-0 overflow-hidden bg-gray-800 relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3B1D8F]/10 to-[#FB7185]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={handleImageError}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div>
                        <div className="flex justify-between">
                          <div className="text-xs text-gray-400 mb-1">{product.category}</div>
                          {product.quantity === 0 ? (
                            <span className="text-xs text-[#FB7185] bg-[#FB7185]/10 border border-[#FB7185]/20 rounded-full px-2 py-0.5">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="text-xs text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-2 py-0.5">
                              In Stock
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-medium text-white mb-1 group-hover:text-[#FB7185] transition-colors duration-300">{product.name}</h3>
                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                          {product.description || "No description available"}
                        </p>
                      </div>
                      
                      <div className="mt-auto flex items-end justify-between">
                        <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">USD. {product.price.toLocaleString()}</p>
                        
                        <div className="relative group">
                          {product.quantity > 0 && (
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
                          )}
                          <button
                            onClick={() => addToCart(product)}
                            disabled={product.quantity === 0}
                            className={`relative flex items-center py-2 px-4 rounded-md z-10 ${
                              product.quantity === 0
                                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                : "bg-gray-800 text-white hover:text-white"
                            } transition-all duration-300`}
                          >
                            <FiPlus className="w-4 h-4 mr-1" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-2 py-2 rounded-md ${
                      currentPage === 1
                        ? "text-gray-600 cursor-not-allowed"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    } transition-colors duration-300`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => {
                    // Show limited page numbers with ellipsis
                    const pageNum = i + 1;
                    
                    // Always show current page, first and last page, and one page before and after current
                    const showPageNumber = pageNum === 1 || 
                                          pageNum === totalPages || 
                                          Math.abs(currentPage - pageNum) <= 1;
                                          
                    // Show ellipsis instead of sequential numbers
                    if (!showPageNumber) {
                      if (pageNum === 2 && currentPage > 3) {
                        return (
                          <span key={`ellipsis-1`} className="px-4 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      
                      if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key={`ellipsis-2`} className="px-4 py-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      
                      return null;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => paginate(pageNum)}
                        className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-[#D946EF] to-[#FB7185] text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-2 py-2 rounded-md ${
                      currentPage === totalPages
                        ? "text-gray-600 cursor-not-allowed"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    } transition-colors duration-300`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-800 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="relative flex items-center justify-center w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-[#D946EF] to-[#FB7185] rounded-md opacity-60 blur-sm"></div>
                <div className="absolute inset-0 bg-gray-900 rounded-md transform -translate-x-0.5 -translate-y-0.5"></div>
                <span className="relative text-white font-bold">EN</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D946EF] to-[#FB7185]">
                ECHO NEXUS
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ECHO NEXUS. All rights reserved.
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Home
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/product-list" className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Products
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/cart" state={{ cartItems }} className="text-gray-400 hover:text-[#D946EF] transition-colors duration-300 relative group">
                Cart
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-[#D946EF] to-[#FB7185] group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      
     
    </div>
  );
};

export default ProductListingPage;