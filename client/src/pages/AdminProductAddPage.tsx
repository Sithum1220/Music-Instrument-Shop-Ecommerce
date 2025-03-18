import React, { useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { FiUpload, FiDollarSign, FiBox, FiTag, FiType, FiFileText } from "react-icons/fi";

const BASE_URL = "http://localhost:4000"; 
const token = localStorage.getItem('token');

interface Product {
  name: string;
  description: string;
  price: string;
  image: File | null;
  quantity: string;
  category: string;
}

interface AddProductPopupProps {
  onClose: () => void;
  onAdd: () => void;
}

const AddProduct: React.FC<AddProductPopupProps> = ({ onClose, onAdd }) => {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    image: null, 
    quantity: "",
    category: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleChange = (field: string, value: string | File) => {
    if (field === "image") {
      const file = value as File;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: file,
      }));
      // Generate image preview URL
      setImagePreview(URL.createObjectURL(file));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [field]: value,
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleChange("image", e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);
      formData.append("category", product.category);
      formData.append("image", product.image || "");
  
      const response = await fetch(`${BASE_URL}/products/add`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      await response.json();
      Swal.fire({
        icon: "success",
        title: "Product Added!",
        text: "The product has been successfully added.",
      });
      setProduct({
        name: "",
        description: "",
        price: "",
        image: null,
        quantity: "",
        category: "",
      });
      setError(null);
      setImagePreview(null);
      onAdd();
      onClose();
    } catch (error: any) {
      console.error("Product add error:", error);
      setError("Failed to add product. Please try again.");
      await Swal.fire({
        icon: "error",
        title: "Product Addition Failed!",
        text: "Failed to add product. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-3xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Add New Product</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300"
        >
          <IoClose className="text-white size-6" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiType className="text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                value={product.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter product name"
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="text-gray-400" />
              </div>
              <input
                id="price"
                type="text"
                value={product.price}
                onChange={(e) => handleChange("price", e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBox className="text-gray-400" />
              </div>
              <input
                id="quantity"
                type="number"
                value={product.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                required
                min="1"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Quantity in stock"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiTag className="text-gray-400" />
              </div>
              <input
                id="category"
                type="text"
                value={product.category}
                onChange={(e) => handleChange("category", e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Product category"
              />
            </div>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FiFileText className="text-gray-400" />
              </div>
              <textarea
                id="description"
                value={product.description}
                onChange={(e) => handleChange("description", e.target.value)}
                required
                rows={4}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your product..."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="col-span-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
              Product Image
            </label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="h-40 w-auto object-contain mb-3" 
                    />
                    <span className="text-sm text-gray-500">
                      Click or drag to replace
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              handleChange("image", e.target.files[0]);
                            }
                          }} 
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg shadow-sm hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Product...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;