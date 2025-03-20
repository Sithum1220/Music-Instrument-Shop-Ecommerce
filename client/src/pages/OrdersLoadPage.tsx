import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { FiCheckCircle, FiClock, FiSearch, FiFilter, FiRefreshCw } from 'react-icons/fi';

interface Order {
  _id: string;
  orderId: string;
  name: string;
  address: string;
  contactNumber: string;
  totalAmount: number;
  status: string;
  orderDate: string;
  orderDoneDate: string | null;
}

const OrderLoadPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...orders];
    
    // Apply search
    if (searchTerm) {
      result = result.filter(order => 
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.contactNumber.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status.toLowerCase() === statusFilter);
    }
    
    // Apply sorting (newest/oldest)
    result.sort((a, b) => {
      const dateA = new Date(a.orderDate).getTime();
      const dateB = new Date(b.orderDate).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
    
    setFilteredOrders(result);
    setTotalPages(Math.ceil(result.length / ordersPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [orders, searchTerm, statusFilter, sortOrder, ordersPerPage]);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const response = await axios.get('/orders/get', {
        baseURL: 'http://localhost:4000',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders);
      setTotalPages(Math.ceil(response.data.orders.length / ordersPerPage));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const currentDate = new Date().toISOString();

      await axios.put(`/orders/put/${orderId}`, { status: 'Done', orderDoneDate: currentDate }, {
        baseURL: 'http://localhost:4000',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update orders state
      const updatedOrders = orders.map(order => {
        if (order._id === orderId) {
          return { ...order, status: 'Done', orderDoneDate: currentDate };
        }
        return order;
      });

      setOrders(updatedOrders);

      Swal.fire({
        icon: 'success',
        title: 'Order Completed',
        text: `Order status updated successfully.`,
        background: '#111827',
        color: '#fff',
        iconColor: '#D946EF',
        confirmButtonColor: '#D946EF'
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update order status. Please try again later.',
        background: '#111827',
        color: '#fff',
        iconColor: '#FB7185',
        confirmButtonColor: '#D946EF'
      });
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setSortOrder('desc');
  };

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin rounded-full border-4 border-gray-700 border-t-[#D946EF]"></div>
            <div className="absolute top-2 left-2 right-2 bottom-2 animate-ping rounded-full border-4 border-[#D946EF] opacity-20"></div>
          </div>
          <p className="text-gray-400 mt-4">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-full min-h-[400px] p-4">
        <div className="text-center max-w-md bg-gray-900/70 border border-gray-800 backdrop-blur-sm p-8 rounded-lg shadow-lg">
          <div className="bg-[#FB7185]/10 p-6 rounded-full inline-block mb-4">
            <svg className="w-16 h-16 mx-auto text-[#FB7185]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{error}</h2>
          <div className="relative inline-block group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <button
              onClick={fetchOrders}
              className="relative px-6 py-2.5 bg-gray-900 text-white rounded-md z-10 flex items-center justify-center"
            >
              <FiRefreshCw className="mr-2" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Filters and search */}
      <div className="bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg border border-gray-800 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#D946EF]" />
            </div>
            <input
              type="text"
              placeholder="Search by name or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-white placeholder-gray-500 transition-colors duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-gray-300 text-sm appearance-none pr-8 relative"
              style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23D946EF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`}}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="done">Completed</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-3 py-2 bg-gray-800/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D946EF] focus:border-[#D946EF] text-gray-300 text-sm appearance-none pr-8 relative"
              style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23D946EF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1.5em 1.5em`}}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>

            <button
              onClick={handleReset}
              className="px-3 py-2 text-sm border border-gray-700 bg-gray-800/50 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-colors duration-300 inline-flex items-center"
            >
              <FiFilter className="mr-1" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Order count */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          Showing {indexOfFirstOrder + 1} - {Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} orders
        </div>
      </div>

      {/* Empty state */}
      {currentOrders.length === 0 ? (
        <div className="bg-gray-900/70 backdrop-blur-sm p-8 rounded-lg shadow-lg text-center border border-gray-800">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/70 rounded-full mb-4">
            <FiFilter className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
          <div className="relative inline-block group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] via-[#D946EF] to-[#FB7185] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <button
              onClick={handleReset}
              className="relative px-6 py-2.5 bg-gray-900 text-white rounded-md z-10"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Orders table */}
          <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {currentOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-800/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{order.name}</div>
                        <div className="text-sm text-gray-400">{order.contactNumber}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{order.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-[#D946EF]">${order.totalAmount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`
                          px-2 py-1 text-xs rounded-full font-medium flex items-center w-fit
                          ${order.status === 'Pending' 
                            ? 'bg-amber-900/30 text-amber-400 border border-amber-800/50' 
                            : 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50'}
                        `}>
                          {order.status === 'Pending' ? (
                            <FiClock className="inline-block mr-1.5" />
                          ) : (
                            <FiCheckCircle className="inline-block mr-1.5" />
                          )}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-white">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        {order.orderDoneDate && (
                          <div className="text-xs text-gray-500">
                            Completed: {new Date(order.orderDoneDate).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {order.status === 'Pending' ? (
                          <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                            <button
                              onClick={() => handleUpdateStatus(order._id)}
                              className="relative inline-flex items-center px-3 py-1.5 bg-gray-900 text-white rounded-md z-10 transition-colors duration-300"
                            >
                              <FiCheckCircle className="mr-1.5" />
                              Mark Complete
                            </button>
                          </div>
                        ) : (
                          <button
                            disabled
                            className="inline-flex items-center px-3 py-1.5 bg-gray-800/30 text-gray-500 rounded-md cursor-not-allowed border border-gray-700"
                          >
                            <FiCheckCircle className="mr-1.5" />
                            Completed
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
                
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNumber = idx + 1;
                  // Show limited page numbers with ellipsis for better UX
                  if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === pageNumber
                            ? 'z-10 bg-gradient-to-r from-[#3B1D8F] to-[#D946EF] border-[#3B1D8F] text-white'
                            : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white'
                        } transition-colors duration-300`}
                      >
                        {pageNumber}
                      </button>
                    );
                  } else if (
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <span
                        key={idx}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-700 bg-gray-900 text-sm font-medium text-gray-400"
                      >
                        ...
                      </span>
                    );
                  } else {
                    return null;
                  }
                })}
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                    currentPage === totalPages 
                      ? 'border-gray-700 bg-gray-800 text-gray-600 cursor-not-allowed' 
                      : 'border-gray-700 bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-300'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderLoadPage;