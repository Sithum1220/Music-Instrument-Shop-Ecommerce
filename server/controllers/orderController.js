// const Order = require('../models/orderModel');
// const Product = require('../models/productModel');
// const mongoose = require('mongoose');

// // POST /api/orders/placeOrder
// exports.placeOrder = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { name, address, contactNumber, cartItems, totalAmount } = req.body;

//     // Create new order
//     const order = new Order({
//       orderId: generateOrderId(),
//       name,
//       address,
//       contactNumber,
//       totalAmount,
//     });

//     // Save order to database
//     await order.save({ session });

//     // Update product quantities in a transactional manner
//     for (const item of cartItems) {
//       const product = await Product.findById(item._id).session(session);
//       if (!product) {
//         throw new Error(`Product with ID ${item._id} not found`);
//       }
//       product.quantity -= item.quantity;
//       await product.save({ session });
//     }

//     await session.commitTransaction();
//     session.endSession();

//     res.status(201).json({ message: 'Order placed successfully', orderId: order.orderId });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error('Error placing order:', error);
//     res.status(500).json({ error: 'Failed to place order' });
//   }
// };

// // Example function to generate unique order ID
// function generateOrderId() {
//   return Math.random().toString(36).substr(2, 9); // Example: Generate a random alphanumeric string
// }

// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 }); // Sort by createdAt descending (newest first)
//     res.status(200).json({ orders });
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: 'Failed to fetch orders' });
//   }
// };
//  exports. updatestatus =async (req, res) => {
//   const { status } = req.body;

//   try {
//     const updatedOrder = await Order.findByIdAndUpdate(
//       req.params.orderId,
//       { status },
//       { new: true } // To return the updated document
//     );

//     res.json({ order: updatedOrder });
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: 'Failed to update order status' });
//   }
//  };
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const mongoose = require('mongoose');

// POST /api/orders/placeOrder
exports.placeOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, address, contactNumber, cartItems, totalAmount } = req.body;

    // Create new order
    const order = new Order({
      orderId: generateOrderId(),
      name,
      address,
      contactNumber,
      totalAmount,
      orderDate: new Date(),
    });

    // Save order to database
    await order.save({ session });

    // Update product quantities in a transactional manner
    for (const item of cartItems) {
      const product = await Product.findById(item._id).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item._id} not found`);
      }
      product.quantity -= item.quantity;
      await product.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Order placed successfully', orderId: order.orderId });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};

// Example function to generate unique order ID
function generateOrderId() {
  return Math.random().toString(36).substr(2, 9); // Example: Generate a random alphanumeric string
}

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // Sort by createdAt descending (newest first)
    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
exports.updatestatus = async (req, res) => {
  const { status, orderDoneDate } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status, orderDoneDate },
      { new: true } // To return the updated document
    );

    res.json({ order: updatedOrder });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
