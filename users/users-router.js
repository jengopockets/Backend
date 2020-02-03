const router = require("express").Router();

const Users = require("./users-model");
const authenticate = require("../auth/authenticate-middleware");

router.get("/", authenticate, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.log(error);
      res.send(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: "could not find user with given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Failed to delete user" });
    });
});

module.exports = router;
