
function Order(order) {
    this.telephone = order.order.telephone;
    this.price = order.order.price;
    this.cart = order.order.cart;
};

module.exports = Order;