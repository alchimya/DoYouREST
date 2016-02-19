/**
 * Created by domenicovacchiano on 13/02/16.
 */


var express = require('express'),
    errorResponse = require('./../helpers/error-response'),
    db= require('./../database/database-driver')(),
    router = express.Router(),
    config= require ('.././config/app-config')(),
    databaseEnum=require('./../database/database-enums')();


//POST /mysql/:table/'
router.post('/:table', function (req, res,next) {


    if (!req.params.table){
        res.status(401).send(errorResponse(1000,"Invalid input data","Invalid_Input_Data"));
        return;
    }

    var query="SELECT * FROM  "  + req.params.table ;



    switch (config.database.type){
        case databaseEnum.type.MYSQL_SEQUELIZE:
            db.connection.query(query)
                .then(function(table) {
                    //console.log(table);
                    res.send(table);
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(500).send(errorResponse(1000,"Application Error","Application Error"));
                })
            break;
        case databaseEnum.type.MYSQL_DRIVER:

            db.connection.query(query, function(err, rows, fields) {
                if (err) throw err;
                res.send(rows);
            });

            /*
            //alternative syntax
            db.connection.getConnection(function(err, connection) {
                // Use the connection
                connection.query( query, function(err, rows) {
                    // And done with the connection.
                    connection.release();
                    res.send(rows);
                });

            });
            */
            break;
    }



});

module.exports = router;