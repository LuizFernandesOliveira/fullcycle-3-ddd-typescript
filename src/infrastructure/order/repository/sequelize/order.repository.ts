import Order from "../../../../domain/checkout/entity/order";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItem from "../../../../domain/checkout/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    await OrderItemModel.destroy({
      where: { order_id: entity.id },
    });
  
    const items = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id,
    }));
  
    await OrderItemModel.bulkCreate(items);
  
    await OrderModel.update(
      { customer_id: entity.customerId, total: entity.total() },
      { where: { id: entity.id } }
    );
  }
  
  async find(id: string): Promise<Order> {
    try {
      const order = await OrderModel.findByPk(id, {
        include: [{ model: OrderItemModel }],
      });
  
      const items = order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ));
  
      return new Order(order.id, order.customer_id, items);
    } catch (error) {
      throw new Error(`Order with id ${id} not found`);
    }
  }
  
  async findAll(): Promise<Order[]> {
    return await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    }).then(orders => orders.map(order => {
      const items = order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ));
      
      return new Order(order.id, order.customer_id, items);
    }));
  }
}