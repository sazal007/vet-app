const Order = require("../models/Order");

// Controller to create a new order
const createOrder = async (req, res) => {
  try {
    const { user, orderItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;

    // Create a new order instance
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // Save the order to the database
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
};
