const db = require("../database/dbConfig.js");

module.exports = {
  addPet,
  findPet,
  findPetBy,
  findPetById,
  updatePet,
  removePet
};

function findPet() {
  return db("pets"); //.select("id", "date", "category");
}

function findPetBy(filter) {
  return db("pets").where(filter);
}

async function addPet(pet) {
  const [user_id] = await db("pets").insert(pet);

  return findPetById(user_id);
}

function findPetById(id) {
  return db("pets")
    .where({ id })
    .first();
}

function updatePet(changes, id) {
  return db("pets")
    .where({ id })
    .update(changes);
}

function removePet(id) {
  return db("pets")
    .where("id", id)
    .del();
}
