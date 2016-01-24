/**
 * Created by domenicovacchiano on 13/01/16.
 * Shows how to send data through Socket.IO
 */
var express = require('express'),
    errorResponse = require('./../helpers/error-response'),
    socket= require('./../helpers/socket-io'),
    router = express.Router();

// POST /api/checkin
router.post('/checkin', function (req, res,next) {

    if (!req.body.latitude |
        !req.body.longitude){
        res.status(401).send(errorResponse(1000,"Invalid input data","Invalid_Input_Data"));
        return;
    }


    socket.emitEvent("userCheckIn",{userLocation:{
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        userLocationPinRefId:"my_unique,pin_ref_id"
    }});


    res.status(200).send({message:"your http request has been processed",inputBody:req.body});
});
router.post('/checkout', function (req, res,next) {

    socket.emitEvent("userCheckOut",{userLocation:{
        userLocationPinRefId:"my_unique,pin_ref_id"
    }});

    res.status(200).send({message:"your http request has been processed"});
});


module.exports = router;