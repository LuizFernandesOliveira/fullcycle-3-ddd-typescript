import Customer from "./customer";
import Address from "../valueobject/address";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "Luiz Fernandes")).toThrowError("Id is required");
  });
  
  it("should throw error when name is empty", () => {
    expect(() => new Customer("123", "")).toThrowError("Name is required");
  });
  
  it("should change name", () => {
    let customer = new Customer("123", "Luiz");
    customer.changeName("Luiz Fernandes");
    expect(customer.name).toBe("Luiz Fernandes");
  });
  
  it("should activate customer", () => {
    let customer = new Customer("123", "Luiz");
    const address = new Address("Rua 1", 10, "12345-678", "São Paulo");
    customer.Address = address;
    
    customer.activate();
    
    expect(customer.isActive()).toBe(true);
  });
  
  it("should throw error when address is undefined in customer", () => {
    let customer = new Customer("123", "Luiz");
    
    expect(() => customer.activate()).toThrowError("Address is mandatory to activate a customer");
  });
  
  it("should deactivate customer", () => {
    let customer = new Customer("123", "Luiz");
    
    customer.deactivate();
    
    expect(customer.isActive()).toBe(false);
  });
  
  it("should add reward points", () => {
    const customer = new Customer("123", "Luiz");
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
  });
});