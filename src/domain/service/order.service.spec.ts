import OrderItem from "../entity/order_item";
import Order from "../entity/order";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe("OrderService unit tests", () => {
  
  it("should place an order", () => {
    const customer = new Customer("1", "Luiz Fernandes");
    const orderItem1 = new OrderItem("1", "Product 1", 10, "1", 2);
    const order = OrderService.placeOrder(customer, [orderItem1]);
    
    expect(customer.rewardPoints).toBe(10);
    expect(order.total()).toBe(20);
  });
  
  it('should total of all orders', () => {
    const item1 = new OrderItem("123", "Product 1", 10, "123", 2);
    const item2 = new OrderItem("122", "Product 2", 10, "123", 1);
    const order1 = new Order("123", "123", [item1]);
    const order2 = new Order("122", "123", [item2]);
    
    const total = OrderService.total([order1, order2]);
    
    expect(total).toBe(30);
  });
  
});