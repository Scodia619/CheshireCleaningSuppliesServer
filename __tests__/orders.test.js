const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

////POSTING ORDERS
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

///GETTING ALL ORDERS
describe("Gets all orders in the DB", () => {
    test("200 - Gets all the orders", () => {
        return request(app)
            .get("/api/order")
            .expect(200)
            .then(({ body: { orders } }) => {
                orders.forEach((order) => {
                    expect(order).toMatchObject({
                        order_id: expect.any(Number),
                        user_id: expect.any(Number),
                        date: expect.any(String),
                        status: expect.any(String),
                        orderItems: expect.any(Array)
                    })
                })
            })
    })
})

///GETTING ORDERS BY USER
describe("Gets all orders a user has placed", () => {
    test("200 - Gets all orders for a user", () => { 
        return request(app)
            .get("/api/order/2")
            .expect(200)
            .then(({ body: { orders } }) => {
                orders.forEach((order) => {
                    expect(order).toMatchObject({
                        order_id: expect.any(Number),
                        user_id: expect.any(Number),
                        date: expect.any(String),
                        status: expect.any(String),
                        orderItems: expect.any(Array)
                    })
                })
            })
    })
    test("400 - Incorrect Data type for userId", () => { 
        return request(app)
            .get("/api/order/banana")
            .expect(400)
            .then(({ body: { msg } }) => {
                expect(msg).toBe("Incorrect Data Type")
            })
    })
    test("404 - User not found", () => { 
        return request(app)
            .get("/api/order/999")
            .expect(404)
            .then(({ body: { msg }}) => {
                expect(msg).toBe("Data not found")
            })
    })
})

describe("Updating an order status", ()=> {
    test("200 - Order status changed to Confirmed", ()=>{
        return request(app)
            .patch("/api/order/update/1?orderStatus=Confirmed")
            .expect(200)
            .then(({body: {updatedOrder}}) => {
                expect(updatedOrder.order_id).toEqual(1)
                expect(updatedOrder.status).toEqual("Confirmed")
            })
    })
    test("200 - Order status changed to Cancelled", ()=>{
        return request(app)
            .patch("/api/order/update/1?orderStatus=Cancelled")
            .expect(200)
            .then(({body: {updatedOrder}}) => {
                expect(updatedOrder.order_id).toEqual(1)
                expect(updatedOrder.status).toEqual("Cancelled")
            })
    })
    test("400 - Incorrect data for OrderId", ()=>{
        return request(app)
            .patch("/api/order/update/banana?orderStatus=Confirmed")
            .expect(400)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Incorrect Data Type")
            })
    })
    test("400 - Incorrect data for OrderId", ()=>{
        return request(app)
            .patch("/api/order/update/banana?orderStatus=Unconfirmed")
            .expect(400)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Incorrect Data Type")
            })
    })
    test("404 - Order not found", ()=> {
        return request(app)
            .patch("/api/order/update/9999?orderStatus=Confirmed")
            .expect(404)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Data not found")
            })
    })
})

describe("Updating a payment status", () => {
    test("200 - Payment status updated successfully", ()=>{
        return request(app)
            .patch("/api/order/update/27/payment")
            .expect(200)
            .then(({body: {updatedOrder}}) => {
                expect(updatedOrder.order_id).toEqual(27)
                expect(updatedOrder.paid).toEqual(true)
            })
    })
    test("400 - Incorrect Data", ()=>{
        return request(app)
            .patch("/api/order/update/banana/payment")
            .expect(400)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Incorrect Data Type")
            })
    })
    test("404 - Order not found", ()=>{
        return request(app)
            .patch("/api/order/update/999/payment")
            .expect(404)
            .then(({body: {msg}}) => {
                expect(msg).toBe("Data not found")
            })
    })
})