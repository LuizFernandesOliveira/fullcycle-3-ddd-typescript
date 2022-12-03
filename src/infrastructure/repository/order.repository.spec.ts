import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/customer/valueobject/address";
import Customer from "../../domain/customer/entity/customer";
import ProductRepository from "./product.repository";
import Product from "../../domain/product/entity/product";
import OrderItem from "../../domain/checkout/entity/order_item";
import Order from "../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";
import OrderModel from "../db/sequelize/model/order.model";

const createCustomer = async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("123", "Customer 1");
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address);
  await customerRepository.create(customer);
  return customer;
}

const createProduct = async () => {
  const productRepository = new ProductRepository();
  const product = new Product("123", "Product 1", 10);
  await productRepository.create(product);
  return product;
}


describe("Order repository test", () => {
  let sequelize: Sequelize;
  
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    
    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });
  
  afterEach(async () => {
    await sequelize.close();
  });
  
  it("should create a new order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();
    
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
    
    const order = new Order("123", customer.id, [orderItem]);
    
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    });
  });
  
  it("should update an existing order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();
  
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
  
    const order = new Order("123", customer.id, [orderItem]);
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    
    const orderItemUpdate = new OrderItem(
      orderItem.id,
      product.name,
      product.price,
      product.id,
      3
    );
    
    const orderUpdate = new Order(order.id, customer.id, [orderItemUpdate]);
    await orderRepository.update(orderUpdate);
    
    const orderModel = await OrderModel.findOne({
      where: { id: orderUpdate.id },
      include: ["items"],
    });
    
    expect(orderModel.toJSON()).toStrictEqual({
      id: orderUpdate.id,
      customer_id: customer.id,
      total: orderUpdate.total(),
      items: [
        {
          id: orderItemUpdate.id,
          name: orderItemUpdate.name,
          price: orderItemUpdate.price,
          quantity: orderItemUpdate.quantity,
          order_id: orderUpdate.id,
          product_id: product.id,
        },
      ],
    });
  });
  
  it("should find an existing order", async () => {
    const customer = await createCustomer();
    const product = await createProduct();
  
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
  
    const order = new Order("123", customer.id, [orderItem]);
    
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    
    const orderFound = await orderRepository.find(order.id);
    
    expect(orderFound).toStrictEqual(order);
  });
  
  it("should throw an error when trying to find a non-existing order", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find("123")).rejects.toThrowError();
  });
  
  it("should find all orders", async () => {
    const orderRepository = new OrderRepository();
    const customer = await createCustomer();
    const product = await createProduct();
  
    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );
  
    const order = new Order("1", customer.id, [orderItem]);
    await orderRepository.create(order);
  
    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      2
    );
  
    const order2 = new Order("2", customer.id, [orderItem2]);
    await orderRepository.create(order2);
    
    const ordersFound = await orderRepository.findAll();
    
    expect(ordersFound).toStrictEqual([order, order2]);
  });
});