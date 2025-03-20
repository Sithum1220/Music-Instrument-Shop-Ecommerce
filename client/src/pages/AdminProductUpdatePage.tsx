import React, { useState } from "react";
import { IoClose } from "react-icons/io5"; 
import { FiType, FiDollarSign, FiBox, FiTag, FiSave } from "react-icons/fi";
import axios from "axios";
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image?: string;
}

const AdminProductUpdateForm: React.FC<{
  product: Product; 
  onClose: () => void;
  onProductUpdate: () => void; 
}> = ({ product, onClose, onProductUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>({
    ...product, 
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (field: string, value: any) => {
    setUpdatedProduct({ ...updatedProduct, [field]: value });
  };
  
  const token = localStorage.getItem('token');
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      await axiosInstance.put(`/products/${product._id}`, {
        name: updatedProduct.name,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        category: updatedProduct.category,
        description: updatedProduct.description || product.description,
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Product Updated!',
        text: 'The product has been successfully updated.',
        background: '#111827',
        color: '#fff',
        iconColor: '#D946EF',
        confirmButtonColor: '#D946EF',
        timer: 2000,
        timerProgressBar: true,
      });
      
      onProductUpdate();
      onClose();
    } catch (error: any) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || 'Error updating product. Please try again.');
      
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'There was a problem updating the product.',
        background: '#111827',
        color: '#fff',
        iconColor: '#FB7185',
        confirmButtonColor: '#D946EF',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden w-full max-w-3xl border border-gray-800 text-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          {product.image && (
            <div className="relative mr-3 group">
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-10 w-10 rounded-lg object-cover border border-white/20"
              />
            </div>
          )}
          <h2 className="text-xl font-bold text-white">Update Product</h2>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
        >
          <IoClose className="text-white size-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
        {/* Error message */}
        {error && (
          <div className="bg-red-900/20 border-l-4 border-[#FB7185] p-4 rounded backdrop-blur-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#FB7185]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#FB7185]">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product ID (non-editable) */}
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-400 mb-1">
              Product ID
            </label>
            <div className="text-sm text-gray-300 bg-gray-800/70 p-3 rounded-lg font-mono border border-gray-700">
              {product._id}
            </div>
          </div>

          {/* Product Name */}
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Product Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiType className="text-[#D946EF]" />
              </div>
              <input
                id="name"
                type="text"
                value={updatedProduct.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">
              Price ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-[#D946EF]" />
              </div>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={updatedProduct.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value))}
                required
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
              Quantity
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBox className="text-[#D946EF]" />
              </div>
              <input
                id="quantity"
                type="number"
                min="0"
                value={updatedProduct.quantity}
                onChange={(e) => handleChange("quantity", parseInt(e.target.value))}
                required
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Category */}
          <div className="col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
              Category
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-[#D946EF]" />
              </div>
              <input
                id="category"
                type="text"
                value={updatedProduct.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Description (if available) */}
          {(updatedProduct.description !== undefined) && (
            <div className="col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={updatedProduct.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="block w-full px-3 py-3 bg-gray-800/70 border border-gray-700 rounded-lg focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
              />
            </div>
          )}
        </div>

        {/* Preview current product */}
        {product.image && (
          <div className="mt-8 border-t border-gray-800 pt-6">
            <h3 className="text-sm font-medium text-gray-300 mb-3">Current Product Image</h3>
            <div className="flex justify-center">
              <div className="relative group p-1 border border-gray-800 bg-gray-900/70 rounded-lg">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] rounded-lg blur opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="h-48 object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 text-center">
              Note: Image cannot be updated from this form
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 border border-gray-700 rounded-lg text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white transition-colors duration-300 focus:outline-none"
          >
            Cancel
          </button>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <button
              type="submit"
              disabled={isLoading}
              className="relative px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center z-10"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminProductUpdateForm;