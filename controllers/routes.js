var express = require('express');
var router = express.Router();
var db = require('../models');

router.get("/", function(req, res) {
    res.redirect("/burgers");
  });
  
  router.get("/burgers", function(req, res) {
    db.burger.findAll({
      attributes:["burger_name","devoured"]
    }).then(function (burger_data){
      res.render("index",{burger_data:burger_data});
    })
  });



router.put("/burgers/:id", function(req, res) {
    db.burger.update({
      devoured:true
    },{
      where:{
        id: req.params.id 
      }
    }).then(function(result) {
      // wrapper for orm.js that using MySQL update callback will return a log to console,
      // render back to index with handle
      console.log(result);
      // Send back response and let page reload from .then in Ajax
      res.sendStatus(200);
    });
  });
 

router.post("/burgers/create", function(req, res) {
    db.burger.create({
    burger_name: req.body.burger_name 
    }).then(function(result) {
      console.log(result);
      res.redirect("/");
    });
  });

module.exports = router;