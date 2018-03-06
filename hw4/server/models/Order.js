
function Order(order) {
    console.log('order: ');
    console.log(order);
    /* Define some properties for the order */
    this.telephone = order.telephone;
    this.price = order.price;
    this.cart = order.cart;
    console.log('this');
    console.log(this);
};

module.exports = Order;