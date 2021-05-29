const express = require("express");
const bodyParser = require("body-parser");
// initialize express
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const ingredients = [
  {
    id: "232kAk",
    text: "Eggs",
  },
  {
    id: "dkP345",
    text: "Milk",
  },
  {
    id: "dkcuu7",
    text: "BeyCoon",
  },
  {
    id: "73hdy",
    text: "Frog Legs",
  },
];

app.get("/ingredients", function (request, response) {
  response.send(ingredients);
});

app.post("/ingredients", function (request, response) {
  const ingredient = request.body;
  if (!ingredient || ingredient.text === "") {
    response.status(500).send({ error: "Your ingredient must have a text" });
  } else {
    ingredients.push(ingredient);
    response.status(200).send(ingredients);
  }
});

app.put("/ingredients/:ingredientId", function (request, response) {
  const ingredientId = request.params.ingredientId;
  const newText = request.body.text;

  if (!newText || newText === "") {
    response.status(500).send({ error: "You must provide ingredient text" });
  } else {
    let objectFound = false;
    for (const [index, ingredient] of ingredients.entries()) {
      if (ingredient.id === ingredientId) {
        ingredients[index].text = newText;
        objectFound = true;
        break;
      }
    }

    if (!objectFound) {
      response.status(500).send({ error: "Ingredient not found" });
    }

    response.send(ingredients);
  }
});

app.listen(3000, function () {
  console.log("Fist API running on port 3000!");
});
