import mongoose, { set } from "mongoose";
import { natsWrapper } from "../../../nats-wrapper";
import {
  OrderCreatedEvent,
  OrderStatus,
  OrderCancelledEvent,
} from "@lsalmonticket/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { OrderCancelledListener } from "../order-cancelled-listener";

const setup = async () => {
  // create an instance of the listener
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const listener = new OrderCancelledListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: "concert",
    price: 69,
    userId: "asdf",
  });

  ticket.set({ orderId: orderId });
  await ticket.save();

  // create a fake data event

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, orderId, data, msg };
};

it("", async () => {});
