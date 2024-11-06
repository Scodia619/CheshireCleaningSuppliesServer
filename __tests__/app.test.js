const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

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
          tagId: 1,
          image_url:
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRq4StzxY42Q8DL4z8H-_QotWGziier20XdM32xQgnqxBSwlU4TpVdp3kscXijwyBnn3rX_REuzsjFuGRbnjndE9mt-KFLAobQKx-O3Tt8vsMVv5wLe0CEFZRqwDkikgPr_KDT8dc0&usqp=CAc7RRvU0oLrkLqqmBpVdH30AAAAA=",
        });
      });
  });
});

describe("Getting Products by a Tag", () => {
  test("200 - Gets products with correct tag", () => {
    return request(app)
      .get("/api/products/Cleaning")
      .expect(200)
      .then(({ body: { products } }) => {
        expect(products).toHaveLength(1);
        expect(products[0]).toMatchObject({
          product_id: 1,
          name: "White Roll",
          description: "A cleaning roll",
          tagId: 1,
          image_url:
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRq4StzxY42Q8DL4z8H-_QotWGziier20XdM32xQgnqxBSwlU4TpVdp3kscXijwyBnn3rX_REuzsjFuGRbnjndE9mt-KFLAobQKx-O3Tt8vsMVv5wLe0CEFZRqwDkikgPr_KDT8dc0&usqp=CAc7RRvU0oLrkLqqmBpVdH30AAAAA=",
        });
      })
  })
})

//TAGS
describe("Gets All Tags", () => {
  test("200 - Gets all tags in db", () => {
    return request(app)
      .get("/api/tags")
      .expect(200)
      .then(({ body: { tags } }) => {
        expect(tags).toHaveLength(2);
        tags.forEach((tag) => {
          expect(tag).toMatchObject({
            tag_id: expect.any(Number),
            tag_name: expect.any(String)
          })
        })
      })
  })
})

describe("Gets a unique Tag", () => {
  test("200 - Gets a correct tag", () => {
    return request(app)
      .get("/api/tags/Cleaning")
      .expect(200)
      .then(({ body: { tag } }) => {
        expect(tag).toMatchObject({
          tag_id: 1,
          tag_name: "Cleaning"
        })
      })
  }),
    test("404 - No Tag Exists", () => {
      return request(app)
        .get("/api/tags/banana")
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual("No tag found")
        })
    }),
    test("400 - Invalid Data", () => {
      return request(app)
        .get("/api/tags/999")
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual("Invalid Data Type for TagName")
        })
    })
})

describe("Post new tag", () => {
  test("201 - Creates new Tag", () => {
    return request(app)
      .post("/api/tags")
      .send({
        tag_name: "Janitor"
      })
      .expect(201)
      .then(({ body: { tag } }) => {
        expect(tag).toMatchObject({
          tag_id: 3,
          tag_name: "Janitor"
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
        .then(({ body: { message } }) => {
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
        .then(({ body: { message } }) => {
          expect(message).toEqual("Invalid Data Type for TagName")
        })
    })
})

//Users
describe("Creating a new user", () => {
  test("200 - Creates a new user", () => {
    var user = {
      username: "Scodia618",
      email: "billyjoe2702@gmail.com",
      phone: "07951882145",
      address: "25 Grafton Street",
      postcode: "WA10 4HQ",
      password: "password"
    }
    return request(app)
      .post("/api/user")
      .send(user)
      .expect(201)
      .then(({ body: { user } }) => {
        expect(user).toMatchObject({
          user_id: expect.any(Number),
          username: "Scodia618",
          email: "billyjoe2702@gmail.com",
          phone: "07951882145",
          address: "25 Grafton Street",
          postcode: "WA10 4HQ",
          password: expect.any(String)
        })
      })
  })
  test("400 - Incorrect Data", () => {
    var user = {
      phone: "07951882145",
      address: "25 Grafton Street",
      postcode: "WA10 4HQ",
      password: "password"
    }
    return request(app)
      .post("/api/user")
      .send(user)
      .expect(400)
      .then(({ body : { msg }}) => {
        expect(msg).toEqual("Incorrect Data Type")
      })
  })
  test("409 - Conflict Error", () => {
    var user = {
      user_id: expect.any(Number),
      username: "Scodia618",
      email: "billyjoe2702@gmail.com",
      phone: "07951882145",
      address: "25 Grafton Street",
      postcode: "WA10 4HQ",
      password: "$2b$10$diggmsDGztg4YO/yZ0DsAe9lvUobvwHBip30UehU8kPJ8wIKTzn2C"
    }
    return request(app)
      .post("/api/user")
      .send(user)
      .expect(409)
      .then(({ body: { msg }}) => {
        expect(msg).toEqual("A piece of data isnt unique")
      })
  })
})

describe.only("Logging in a user", () => {
  test("200 - Correctly logs in a user", () => {
    var user = {
      username: "Scodia619",
      password: "password"
    }

    return request(app)
    .post("/api/user/login")
    .send(user)
    .expect(200)
    .then(({body: {user}}) => {
      expect(user).toMatchObject({
        user_id: expect.any(Number),
        username: "Scodia619",
        email: "billyjoe2701@gmail.com",
        phone: "07951882145",
        address: "25 Grafton Street",
        postcode: "WA10 4HQ",
        password: expect.any(String)
      })
    })
  })

  test("400 - Incorrect Data", () => {
    var user = {
      username: "Scodia619",
    }

    return request(app)
    .post("/api/user/login")
    .send(user)
    .expect(400)
    .then(({ body : { msg }}) => {
      expect(msg).toEqual("Incorrect Data Type")
    })
  })

  test("401 - Incorrect Password", () => {
    var user = {
      username: "Scodia619",
      password: "1234!"
    }

    return request(app)
    .post("/api/user/login")
    .send(user)
    .expect(401)
    .then(({ body : { msg }}) => {
      expect(msg).toEqual("Password is incorrect")
    })
  })

  test.only("404 - User not found", () => {
    var user = {
      username: "Scodia617",
      password: "password"
    }

    return request(app)
    .post("/api/user/login")
    .send(user)
    .expect(404)
    .then(({ body : { msg }}) => {
      expect(msg).toEqual("Username does not exist")
    })
  })
})