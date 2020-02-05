const router = require("express").Router();

const authenticate = require("../auth/authenticate-middleware.js");

const Pets = require("./pets-model");

router.get("/", (req, res) => {
  Pets.findPet()
    .then(pets => {
      res.json(pets);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ Message: "Failed to get pets" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Pets.findPetById(id)
    .then(pets => {
      if (pets) {
        res.json(pets);
      } else {
        res.status(404).json({ message: "Could not find pet with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to get pet" });
    });
});

router.post("/", authenticate, (req, res) => {
  const petData = {
    name: req.body.name,
    user_id: req.subject,
    status: req.body.status
  };
  console.log(req.subject);
  Pets.addPet(petData)
    .then(pets => {
      console.log(req.subject);
      res.status(201).json(pets);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to create new pet" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Pets.findPetById(id)
    .then(pets => {
      if (pets) {
        Pets.updatePet(changes, id).then(updatedPet => {
          res.json(updatedPet);
        });
      } else {
        res.status(404).json({ message: "Could not find pet with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to update pet" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Pets.removePet(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ Message: "Could not find pet with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to delete pet" });
    });
});

module.exports = router;
