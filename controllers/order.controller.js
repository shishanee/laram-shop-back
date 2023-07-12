const Order = require("../models/Order.model");

module.exports.orderController = {
    addOrder: async (req, res) => {
        try {
            const { orderNumber, products, totalPrice, date, status } = req.body;
            const customerId = req.user.id;
            // if (!orderNumber || !products || !totalPrice || !date || !status) {
            //     return res.status(400).json({ error: "Необходимо указать все поля для создания заказа" });
            // }
            const order = new Order({
                orderNumber,
                customer: customerId,
                products,
                totalPrice,
                date,
                status,
            });
            await order.save();
            
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "Не удалось создать заказ" });
        }
    },
    
    getOrder: async (req, res) => {
        try {
            const orders = await Order.find().populate("products.product").populate('date').populate("customer");


            res.status(200).json(orders);
          } catch (error) {
            res.status(500).json({ error: "Не удалось получить список заказов" });
          }
        },

        getOrderById: async (req, res) => {
            try {
              const orderId = req.params.id;
              if (!order) {
                return res.status(404).json({ error: "Заказ не найден" });
              }
          
              res.status(200).json(order);
            } catch (error) {
              res.status(500).json({ error: "Не удалось получить заказ" });
            }
          }
                            
    
}