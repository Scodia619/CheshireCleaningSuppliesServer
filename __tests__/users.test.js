const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

///Updating A User
describe("Updating a users details", ()=> {
    test("200 - Updates a users record successfully", ()=>{
        const userDetails = {
            username: "scodia619",
            email: "daved652@gmail.com",
            phone: "0192575779",
            address: "123123",
            postcode: "WA10 4HQ",
            password: "password"
        }
        return request(app)
        .patch("/api/user")
        .send(userDetails)
        .expect(200)
        .then(({body: {user}}) => {
            expect(user).toMatchObject({
                user_id: 2,
                username: "scodia619",
                email: "daved652@gmail.com",
                phone: "0192575779",
                address: "123123",
                postcode: "WA10 4HQ",
                password: expect.any(String)
            })
        })
    })
    test("400 - Incorrect Data", ()=>{
        const userDetails = {
            username: "scodia619",
            email: "daved652@gmail.com",
            phone: "0192575779",
            address: "123123",
            postcode: 999,
            password: "password"
        }
        return request(app)
        .patch("/api/user")
        .send(userDetails)
        .expect(400)
        .then(({body: {msg}}) => {
            expect(msg).toBe("Incorrect Data Type")
        })
    })
    test("404 - User not found", ()=>{
        const userDetails = {
            username: "Acodia619",
            email: "daved652@gmail.com",
            phone: "0192575779",
            address: "123123",
            postcode: "WA10 4HQ",
            password: "password"
        }
        return request(app)
        .patch("/api/user")
        .send(userDetails)
        .expect(404)
        .then(({body: {msg}}) => {
            expect(msg).toBe("Username does not exist")
        })
    })
})