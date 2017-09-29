"use strict";

const express = require('express');
const router  = express.Router();

const chooseCategories = require("../getCategory");

module.exports = (knex) => {

  router.get("/items", (req, res) => {
    knex
      .select("*")
      .from("items")
      .then((results) => {
        res.json(results);
    });
  });

// ADD ITEMS
  router.post("/items/add", (req, res) => {
    const item = req.body.item;

    chooseCategories(item).then(result => {
      console.log(result);
      console.log(typeof result);
      knex.insert({content: item, user_id: '1', category: result, status: true}).into('items')
    .then(res.redirect('/'));
    });

  });

///////////////////////// DELETE ITEMS //////////////////////////
  router.post("/items/delete", (req, res) => {
    let itemToDelete = req.body.itemToDelete;
    knex('items')
    .where('content', itemToDelete).del()
    .then(function(count){
      res.send({result: 'true'});
    });
    // res.redirect('/');
  });

///////////////////////// MOVE ITEMS ////////////////////////
  router.put("/items/move", (req, res) => {
    let itemToMove = req.body.itemToMove;
    let moveToCategory = req.body.moveToCategory;
    knex('items')
    .where('content', itemToMove)
    .update('category', moveToCategory)
    .then(function(){
      res.send({data: 'true'});
    });
  });

  return router;
};
