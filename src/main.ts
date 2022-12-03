import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/valueobject/address";
import OrderItem from "./domain/checkout/entity/order_item";
import Order from "./domain/checkout/entity/order";

let customer = new Customer("1", "Luiz Fernandes");
const address = new Address("Rua 1", 10, "12345-678", "São Paulo");
customer.Address = address;
customer.activate();

const item1 = new OrderItem("1", "Product 1", 10, "1", 2);
const item2 = new OrderItem("2", "Product 2", 20, "1", 1);
const order = new Order("1", "2", [item1, item2]);
