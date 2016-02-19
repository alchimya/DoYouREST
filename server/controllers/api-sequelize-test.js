/**
 * Created by domenicovacchiano on 14/01/16.
 * Shows how to implement a post request, responding with data loaded from the DoYourRest database
 * by using an SQL Query and a model mapping with the Sequelize ORM
 */

var express = require('express'),
    errorResponse = require('./../helpers/error-response'),
    db= require('./../database/sequelize-driver')(),
    Sequelize= require('sequelize'),
    Customer=require('../models/customer');
    router = express.Router();

//POST /sequelize/:table/'
router.post('/query/:table', function (req, res,next) {


    if (!req.params.table){
        res.status(401).send(errorResponse(1000,"Invalid input data","Invalid_Input_Data"));
        return;
    }

    db.connection.query("SELECT * FROM  "  + req.params.table, { type: Sequelize.QueryTypes.SELECT})
        .then(function(table) {
            console.log(table);
            res.send(table);
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).send(errorResponse(1000,"Application Error","Application Error"));
        })


});
//POST /sequelize/customers'
router.post('/customers', function (req, res,next) {

    console.log("customers");

    var model=db.connection.define('customers', Customer(),{tableName: 'customers'});
    var query={where: null,attributes:["id","firstName","lastName"],order:"firstName ASC"};

    var result = model.findAll(query)
        .then(function (dao) {
            if (dao.length){
                console.log("completed");
                res.status(200).send(dao);
            }else{
                console.log("no result");
                res.status(200).send(dao);
            }
        }, function (err) {
            console.log(err);
        })



});
router.post('/customers/:id', function (req, res,next) {

    if (!req.params.id){
        res.status(401).send(errorResponse(1000,"Invalid input data","Invalid_Input_Data"));
        return;
    }

    var model=db.connection.define('customers', Customer(),{tableName: 'customers'});

    var where={
        id: req.params.id
    };
    var query={where: where,attributes:["id","firstName","lastName"],order:"firstName ASC"};

    var result = model.findAll(query)
        .then(function (dao) {
            if (dao.length){
                console.log("completed");
                res.status(200).send(dao);
            }else{
                console.log("no result");
                res.status(200).send(dao);
            }
        }, function (err) {
            console.log(err);
        })



});

module.exports = router;