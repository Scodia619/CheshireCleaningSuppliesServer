const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

describe("Posting a new order", () => {
    test("201 - Creates a new order", () => {
        const orderDetails = {
            userId: 2,
            status: "Unconfirmed",
            orderItems: [
                {
                    product_id: 25,
                    quantity: 2
                }
            ]
        };
        return request(app)
            .post("/api/order")
            .send(orderDetails)
            .expect(201)
            .then(({ body: { order } }) => {
                expect(order).toMatchObject({
                    order_id: expect.any(Number),
                    user_id: 2,
                    date: expect.any(String),
                    status: "Unconfirmed"
                });
            });
    });

    test("400 - Incorrect Data", () => {
        const orderDetails = {
            userId: "Scodia619",
            status: "Confirmed",
            orderItems: [
                {
                    product_id: 25,
                    quantity: 5
                }
            ]
        };
        return request(app)
            .post("/api/order")
            .send(orderDetails)
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Incorrect Data Type");
            });
    });

    test("404 - Not Found Error", () => {
        const orderDetails = {
            userId: 999,
            status: "Confirmed",
            orderItems: [
                {
                    product_id: 29,
                    quantity: 3
                }
            ]
        };

        return request(app)
            .post("/api/order")
            .send(orderDetails)
            .expect(404)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Data not found");
            });
    });
});
