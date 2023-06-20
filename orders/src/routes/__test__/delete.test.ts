import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import request from "supertest";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";

it("deletes the order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
  });

  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);
});

it("returns an error if one users tries to delete anothers users order", async () => {
  const ticket = Ticket.build({
    title: "concert",
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
  });

  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});

it("emits a order cancelled event", async () => {
  const ticket = Ticket.build({
    title: "concert",
    id: new mongoose.Types.ObjectId().toHexString(),
    price: 20,
  });

  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
