/**
 * Created by domenicovacchiano on 07/01/16.
 * Shows how to implement a get and post request
 */

var express = require('express'),
    errorResponse = require('./../helpers/error-response'),
    router = express.Router();

//GET /api/test'
router.get('/', function (req, res,next) {

    //INSERT HERE YOU CUSTOM OPERATIONS FOR THIS METHOD AND SEND BACK A RESPONSE
    res.status(200).send({message:"your http request has been processed"});

});

//GET /api/test/:id/'
router.get('/:id', function (req, res,next) {

    //INSERT HERE YOU CUSTOM OPERATIONS FOR THIS METHOD AND SEND BACK A RESPONSE

    if (!req.params.id){
        res.status(401).send(errorResponse(1000,"Invalid input data","Invalid_Input_Data"));
        return;
    }
    res.status(200).send({message:"your http request has been processed",id:req.params.id});

});

// POST /api/test
router.post('/', function (req, res,next) {
    //INSERT HERE YOU CUSTOM OPERATIONS FOR THIS METHOD AND SEND BACK A RESPONSE
    res.status(200).send({message:"your http request has been processed"});
});


module.exports = router;