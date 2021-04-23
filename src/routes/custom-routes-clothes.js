'use strict'

const express = require('express');
const clothesSchema = require('../models/clothes-schema.js');
const DataCollection = require('../models/data-collection-class.js');
const clothes = new DataCollection(clothesSchema);
const clothesRouter = express.Router();

clothesRouter.get('/clothes', getClothes)
clothesRouter.get('/clothes/:id', getOneClothes)
clothesRouter.post('/clothes', createClothes)
clothesRouter.put('/clothes/:id', updateClothes)
clothesRouter.delete('/clothes/:id', deleteClothes)

function getClothes(req, res) {
  let getAllClothes = clothes.read();
  res.status(200).json(getAllClothes);
}

function getOneClothes(req, res) {
  const id = parseInt(req.params.id);
  let theClothes = clothes.read(id);
  res.status(200).json(theClothes);
}

function createClothes(req, res) {
  let content = req.body;
  let createdClothes = clothes.create(content);
  res.status(201).json(createdClothes);
}

function updateClothes(req, res) {
  let id = parseInt(req.params.id)
  let data = req.body;
  let updateClothes = clothes.update(id,data)
  res.status(200).json(updateClothes)
}

function deleteClothes(req, res) {
  const id = parseInt(req.params.id);
  clothes.delete(id)
  res.status(200).json({msg: 'item deleted'})
}

module.exports = clothesRouter;
