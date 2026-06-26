const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");


chai.use(chaiHttp);


let Translator = require("../components/translator.js");
const translator = new Translator();


suite("Functional Tests", () => {
    test("Translation with text and locale fields: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "Mangoes are my favorite fruit.",
                locale: "american-to-british"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.text, "Mangoes are my favorite fruit.");
                assert.strictEqual(response.body.translation, "Mangoes are my <span class=\"highlight\">favourite</span> fruit.");
            });
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "Mangoes are my favourite fruit.",
                locale: "british-to-american"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.text, "Mangoes are my favourite fruit.");
                assert.strictEqual(response.body.translation, "Mangoes are my <span class=\"highlight\">favorite</span> fruit.");
            });
    });

    test("Translation with text and invalid locale field: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "Mangoes are my favorite fruit.",
                locale: "blah"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.error, "Invalid value for locale field");
            });
    });

    test("Translation with missing text field: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                locale: "american-to-british"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.error, "Required field(s) missing");
            });
    });

    test("Translation with missing locale field: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "Mangoes are my favorite fruit.",
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.error, "Required field(s) missing");
            });
    });

    test("Translation with empty text: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "",
                locale: "american-to-british"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.error, "No text to translate");
            });
    });

    test("Translation with text that needs no translation: POST request to /api/translate", function() {
        chai
            .request(server)
            .keepOpen()
            .post("/api/translate")
            .send({
                text: "Mangoes are my favourite fruit.",
                locale: "american-to-british"
            })
            .end(function (error, response) {
                assert.strictEqual(response.status, 200);
                assert.strictEqual(response.type, "application/json");
                assert.strictEqual(response.body.text, "Mangoes are my favourite fruit.");
                assert.strictEqual(response.body.translation, "Everything looks good to me!");
            });
    });
});