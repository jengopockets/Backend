const router = require("express").Router();

const authenticate = require("../auth/authenticate-middleware.js");

const Meals = require("./meals-model");

router.get("/", (req, res) => {
  Meals.findMeal()
    .then(meals => {
      res.json(meals);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ Message: "Failed to get meals" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Meals.findMealById(id)
    .then(meals => {
      if (meals) {
        res.json(meals);
      } else {
        res.status(404).json({ message: "Could not find meal with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to get meal" });
    });
});

router.post("/", authenticate, (req, res) => {
  const mealData = {
    name: req.body.name,
    pet_id: req.body.pet_id,
    date: req.body.date,
    category: req.body.category,
    servings: req.body.servings
  };
  console.log(req.subject);
  Meals.addMeal(mealData)
    .then(meals => {
      console.log(req.subject);
      res.status(201).json(meals);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to create new meal" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Meals.findMealById(id)
    .then(meals => {
      if (meals) {
        Meals.updateMeal(changes, id).then(updatedMeal => {
          res.json(updatedMeal);
        });
      } else {
        res.status(404).json({ message: "Could not find meal with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to update meal" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Meals.removeMeal(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ Message: "Could not find meal with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to delete meal" });
    });
});

module.exports = router;
