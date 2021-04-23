'use strict'

const express = require('express');
const foodSchema = require('../models/food-schema.js')
const DataCollection = require('../models/data-collection-class.js');
const food = new DataCollection(foodSchema);

const foodRouter = express.Router();

foodRouter.get('/:id', getOneFood)
foodRouter.post(createFood)
foodRouter.put('/:id', updateFood)
foodRouter.delete('/:id', deleteFood)

const getFood = async (req, res) => {
  let getAllFood = await food.read();
  res.status(200).json(getAllFood);
}
foodRouter.get('/food',getFood)

function getOneFood(req, res) {
  const id = parseInt(req.params.id);
  let theFood = food.read(id);
  res.status(200).json(theFood);
}

function createFood(req, res) {
  let content = req.body;
  let createdFood = food.create(content);
  res.status(201).json(createdFood);
}

function updateFood(req, res) {
  let id = parseInt(req.params.id)
  let data = req.body;
  let updateFood = food.update(id,data)
  res.status(200).json(updateFood)
}

function deleteFood(req, res) {
  const id = parseInt(req.params.id);
  food.delete(id)
  res.status(200).json({msg: 'item deleted'})
}

module.exports = foodRouter;
