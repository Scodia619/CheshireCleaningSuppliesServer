const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");
const seed = require("../prisma/seed");

beforeEach(() => seed());

//PRODUCTS
describe("Get All Products", () => {
  test("200 - Gets All Products and returns the items in a list", () => {
    return request(app)
      .get("/api/products")
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(1);
        expect(products[0]).toMatchObject({
          product_id: 1,
          name: "White Roll",
          description: "A cleaning roll",
          image_url:
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRq4StzxY42Q8DL4z8H-_QotWGziier20XdM32xQgnqxBSwlU4TpVdp3kscXijwyBnn3rX_REuzsjFuGRbnjndE9mt-KFLAobQKx-O3Tt8vsMVv5wLe0CEFZRqwDkikgPr_KDT8dc0&usqp=CAc7RRvU0oLrkLqqmBpVdH30AAAAA=",
        });
      });
  });
});

//TAGS
describe("Gets All Tags", ()=>{
  test("200 - Gets all tags in db", ()=>{
    return request(app)
    .get("/api/tags")
    .expect(200)
    .then(({body: {tags}}) => {
      expect(tags).toHaveLength(1);
      tags.forEach((tag) => {
        expect(tag).toMatchObject({
          tag_id: 1,
          tag_name: "Cleaning"
        })
      })
    })
  })
})

describe("Gets a unique Tag", ()=>{
  test("200 - Gets a correct tag", ()=>{
    return request(app)
    .get("/api/tags/Cleaning")
    .expect(200)
    .then(({body: {tag}}) => {
      expect(tag).toMatchObject({
        tag_id: 1,
        tag_name: "Cleaning"
      })
    })
  }),
  test("404 - No Tag Exists", ()=> {
    return request(app)
    .get("/api/tags/banana")
    .expect(404)
    .then(({body: {message}}) => {
      expect(message).toEqual("No tag found")
    })
  }),
  test("400 - Invalid Data", ()=> {
    return request(app)
    .get("/api/tags/999")
    .expect(400)
    .then(({body: {message}}) => {
      expect(message).toEqual("Invalid Data Type for TagName")
    })
  })
})

describe("Post new tag", () => {
  test("201 - Creates new Tag", ()=> {
    return request(app)
    .post("/api/tags")
    .send({
      tag_name: "Car Supplies"
    })
    .expect(201)
    .then(({body : {tag}}) => {
      expect(tag).toMatchObject({
        tag_id: 2,
        tag_name: "Car Supplies"
      })
    })
  }),
  test("400 - Tag Name already exists", () => {
    return request(app)
    .post("/api/tags")
    .send({
      tag_name: "Cleaning"
    })
    .expect(400)
    .then(({body: {message}}) => {
      expect(message).toEqual("Tag Name already exists")
    })
  }),
  test("400 - Invalid Data Type", () => {
    return request(app)
    .post("/api/tags")
    .send({
      tag_name: 999
    })
    .expect(400)
    .then(({body: {message}}) => {
      expect(message).toEqual("Invalid Data Type for TagName")
    })
  })
})
