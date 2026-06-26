"use strict";


const Translator = require("../components/translator.js");
const translator = new Translator();


module.exports = function (app) {
  app.route("/api/translate")
    .post((request, response) => {
      if (Object.hasOwn(request.body, "text") && Object.hasOwn(request.body, "locale")) {
        if (request.body.text.length !== 0) {
          if (request.body.locale === "american-to-british") {
            if (translator.translateAmericanToBritish(request.body.text)[0] === request.body.text) {
              response.json({
                text: request.body.text,
                translation: "Everything looks good to me!"
              });
            } else {
            response.json({
                text: request.body.text,
                translation: translator.translateAmericanToBritish(request.body.text)[1]
              });
            }
          } else if (request.body.locale === "british-to-american") {
            if (translator.translateBritishToAmerican(request.body.text)[0] === request.body.text) {
              response.json({
                text: request.body.text,
                translation: "Everything looks good to me!"
              });
            } else {
            response.json({
                text: request.body.text,
                translation: translator.translateBritishToAmerican(request.body.text)[1]
              });
            }
          } else {
            response.json({error: "Invalid value for locale field"})
          }
        } else {
          response.json({error: "No text to translate"});
        }
      } else {
        response.json({error: "Required field(s) missing"});
      }
    });
};