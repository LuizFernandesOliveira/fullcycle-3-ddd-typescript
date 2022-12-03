import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrowError("Id is required");
  });
  
  it("should throw error when customer_id is empty", () => {
    expect(() => new Order("123", "", [])).toThrowError("Customer id is required");
  });
  
  it("should throw error when order_items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrowError("Items is required");
  });
  
  it("should calculate total", () => {
    const orderItem1 = new OrderItem("123", "Product 1", 10, "123", 2);
    const orderItem2 = new OrderItem("122", "Product 2", 10, "123", 1);
    const order = new Order("123", "123", [orderItem1, orderItem2]);
    
    expect(order.total()).toBe(30);
  });
  
  it("should throw error when quantity is not greater than 0", () => {
    expect(() => {
      const orderItem = new OrderItem("123", "Product 1", 10, "123", 0);
      const order = new Order("123", "123", [orderItem]);
    }).toThrowError("Quantity must be greater than zero");
  });
});