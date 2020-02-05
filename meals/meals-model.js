const db = require("../database/dbConfig.js");

module.exports = {
  addMeal,
  findMeal,
  findMealBy,
  findMealById,
  updateMeal,
  removeMeal
};

function findMeal() {
  return db("meals"); //.select("id", "date", "category");
}

function findMealBy(filter) {
  return db("meals").where(filter);
}

async function addMeal(meal) {
  const [user_id] = await db("meals").insert(meal);

  return findMealById(user_id);
}

function findMealById(id) {
  return db("meals")
    .where({ id })
    .first();
}

function updateMeal(changes, id) {
  return db("meals")
    .where({ id })
    .update(changes);
}

function removeMeal(id) {
  return db("meals")
    .where("id", id)
    .del();
}
