import Customer from "./entity/customer";
import Address from "./entity/address";
import OrderItem from "./entity/order_item";
import Order from "./entity/order";

let customer = new Customer("1", "Luiz Fernandes");
const address = new Address("Rua 1", 10, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Product 1", 10);
const item2 = new OrderItem("2", "Product 2", 20);
const order = new Order("1", customer._id, [item1, item2]);
