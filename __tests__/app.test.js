const app = require("../app");
const request = require("supertest");
const { expect } = require("@jest/globals");

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
